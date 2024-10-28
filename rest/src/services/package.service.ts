import prisma from "../utils/db.utils";
import { ICreatePackage, IFindPackages, IUpdatePackage } from "../interfaces/package.interface";
import { generateSerialNumber } from "../utils/generate-number";

export async function createPackage({officeBranch, ...data}: ICreatePackage) {
  const latestPackage = await prisma.package.findFirst({
    where: {
      officeBranch
    },
    orderBy: {
      sequenceNumber: 'desc'
    }
  });

  const packageNumber = generateSerialNumber({
    prefix: 'P',
    uniqueNumber: latestPackage ? latestPackage.sequenceNumber + 1 : 1,
    postfix: officeBranch.slice(0, 3)
  });

  return await prisma.package.create({
    data: {packageNumber, officeBranch, ...data}
  });
}

export async function updatePackage({id, ...data}: IUpdatePackage) {
  return await prisma.package.update({
    where: {id},
    data
  });
}

export async function deletePackage(id: string) {
  return await prisma.package.delete({
    where: {id},
  });
}

export async function findPackages(params: IFindPackages) {
  const { skip, take, search, branch } = params;
  let searchFilter = {};

  if (search) {
    searchFilter = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { packageNumber: { contains: search, mode: "insensitive" } }
      ],
    }
  }

  const findPackages = prisma.package.findMany({
    where: {
      ...searchFilter,
      officeBranch: branch
    },
    include: {
      creator: true,
      approver: true,
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: skip || 0,
    take: take || 10,
  });

  const countPackages = prisma.package.count({
    where: {
      ...searchFilter,
      officeBranch: branch
    },
  });

  const [packages, total] = await prisma.$transaction([findPackages, countPackages]);

  return { packages, total }
}

export const findPackageById = async(id: string) => {
  return await prisma.package.findUnique({
    where: {id},
    include: {
      accomodation: true,
      airfare: true,
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
          userType: true,
          signature: true
        }
      },
      approver: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatar: true,
          userType: true,
          signature: true
        }
      },
    }
  });
}
