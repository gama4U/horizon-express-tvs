import { OfficeBranch, Prisma } from "@prisma/client";
import prisma from "../utils/db.utils";
import { ICreateSupplier, IUpdateSupplier } from "../interfaces/supplier.interface";

export async function createSupplier(data: ICreateSupplier) {
  return await prisma.supplier.create({
    data
  })
}

export async function updateSupplier(id: string, data: IUpdateSupplier) {
  return await prisma.supplier.update({
    where: {
      id: id
    },
    data
  })
}

export async function deleteSupplier(id: string) {
  return await prisma.supplier.delete({
    where: {
      id: id
    }
  })
}


export interface IFindSupplier {
  skip?: number;
  take?: number;
  search?: string;
  category?: string;
  branch?: string;
  isApproved?: boolean;
}

export async function fetchSuppliers({ skip, take, search, category, branch, isApproved }: IFindSupplier) {
  let whereInput: Prisma.SupplierWhereInput = {};

  if (search) {
    const searchParts = search.split(/\s+/);
    whereInput = {
      AND: searchParts.map((part) => ({
        OR: [
          { name: { contains: part, mode: "insensitive" } },
          { address: { contains: part, mode: "insensitive" } },
          { emailAddress: { contains: part, mode: "insensitive" } },
          { category: { contains: part, mode: "insensitive" } },
        ],
      })),
    };
  }

  if (category) {
    whereInput.category = category;
  }

  if (isApproved === true) {
    whereInput.approverId = { not: null };
  }

  const suppliers = prisma.supplier.findMany({
    where: {
      ...whereInput,
      officeBranch: branch as OfficeBranch,
    },
    include: {
      purchaseOrders: true,
      _count: {
        select: {
          purchaseOrders: true,
        },
      },
      approver: true,
      creator: true,
    },
    skip: skip ?? 0,
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const countSuppliers = prisma.supplier.count({
    where: {
      ...whereInput,
      officeBranch: branch as OfficeBranch,
    },
  });

  const [suppliersData, total] = await prisma.$transaction([suppliers, countSuppliers]);

  return { suppliersData, total };
}


export const findSupplierById = async (id: string) => {
  return await prisma.supplier.findFirst({
    where: { id }
  })
}
interface IUpdateSupplierApprover {
  id: string,
  approverId: string
}

export async function updateSupplierApprover({ id, approverId }: IUpdateSupplierApprover) {
  return await prisma.supplier.update({
    where: { id },
    data: { approverId }
  });
}
