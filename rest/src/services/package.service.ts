import prisma from "../utils/db.utils";
import { IFindPackages } from "../interfaces/package.interface";

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
