import { Prisma } from "@prisma/client";
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
}

export async function fetchSuppliers({ skip, take, search }: IFindSupplier) {
  let whereInput: Prisma.SupplierWhereInput = {};

  if (search) {
    const searchParts = search.split(/\s+/);
    whereInput = {
      AND: searchParts.map((part) => ({
        OR: [
          { name: { contains: part, mode: "insensitive" } },
        ],
      })),
    }
  }

  const suppliers = prisma.supplier.findMany({
    where: {
      ...whereInput,
    },
    include: {
      purchaseOrders: true,
      _count: {
        select: {
          purchaseOrders: true
        }
      }
    },
    skip: skip ?? 0,
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const countSuppliers = prisma.supplier.count({
    where: {
      ...whereInput
    },
  });

  const [suppliersData, total] = await prisma.$transaction([
    suppliers,
    countSuppliers
  ]);

  return { suppliersData, total };
}
