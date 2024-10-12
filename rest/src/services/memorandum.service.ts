import { Prisma } from "@prisma/client";
import prisma from "../../prisma/db";
import { getNextMemorandumNumber } from "../utils/generateNumber";

export interface ICreateMemorandum {
  to: string
  re: string
  addressee: string
  contents: string
}

export async function createMemorandum(data: ICreateMemorandum) {
  const lastMemo = await prisma.memorandum.findFirst({
    orderBy: { memorandumNumber: 'desc' },
  });

  const nextMemoNumber = getNextMemorandumNumber(lastMemo?.memorandumNumber || null);

  return await prisma.memorandum.create({
    data: {
      ...data,
      memorandumNumber: nextMemoNumber,
    },
  });
}
export async function deleteMemorandum(id: string) {
  return await prisma.memorandum.delete({
    where: {
      id
    }
  })
}
export interface IUpdateMemorandum {
  id: string
  to: string
  re: string
  addressee: string
  contents: string
}
export async function updateMemorandum({ id, ...data }: IUpdateMemorandum) {
  return await prisma.memorandum.update({
    where: {
      id
    },
    data
  })
}

export interface IFindMemorandums {
  skip?: number;
  take?: number;
  search?: string;
}

export async function fetchMemorandums({ skip, take, search }: IFindMemorandums) {
  let whereInput: Prisma.MemorandumWhereInput = {};

  if (search) {
    whereInput = {
      OR: [
        { addressee: { contains: search, mode: "insensitive" } },
      ],
    }
  }

  const leads = prisma.memorandum.findMany({
    where: {
      ...whereInput,
    },
    skip: skip ?? 0,
    take: take ?? 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const countMemorandums = prisma.memorandum.count({
    where: {
      ...whereInput
    },
  });

  const [memorandumData, total] = await prisma.$transaction([
    leads,
    countMemorandums
  ]);

  return { memorandumData, total };
}
export async function findMemorandumById(id: string) {
  return await prisma.memorandum.findUnique({
    where: { id },
  });
}
