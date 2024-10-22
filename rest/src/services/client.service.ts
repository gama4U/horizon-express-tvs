import { OfficeBranch, Prisma } from "@prisma/client";
import prisma from "../utils/db.utils";
import { ICreateClient, IUpdateClient } from "../interfaces/client.interface";

export async function createClient(data: ICreateClient) {
  return await prisma.client.create({
    data
  })
}

export async function updateClient(id: string, data: IUpdateClient) {
  return await prisma.client.update({
    where: {
      id: id
    },
    data
  })
}

export async function deleteClient(id: string) {
  return await prisma.client.delete({
    where: {
      id: id
    }
  })
}

export interface IFindClient {
  skip?: number;
  take?: number;
  search?: string;
  branch?: string;
}

export async function fetchClients({ skip, take, search, branch }: IFindClient) {
  let whereInput: Prisma.ClientWhereInput = {};

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

  const client = prisma.client.findMany({
    where: {
      ...whereInput,
      officeBranch: branch as OfficeBranch
    },
    include: {
      transactions: true,
      _count: {
        select: {
          transactions: true
        }
      }
    },
    skip: skip ?? 0,
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const countClients = prisma.client.count({
    where: {
      ...whereInput,
      officeBranch: branch as OfficeBranch
    },
  });

  const [clientsData, total] = await prisma.$transaction([
    client,
    countClients
  ]);

  return { clientsData, total };
}

export const findClientById = async(id: string) => {
  return await prisma.client.findUnique({
    where: {id}
  })
}
