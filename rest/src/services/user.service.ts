import { Prisma, User } from "@prisma/client";
import prisma from "../../prisma/db";
import { IGetUsers, IUpdateUser } from "../interfaces/user.interface";

export async function createUser(data: User) {
  return await prisma.user.create({ data });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email
    }
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id
    },
  })
}

export async function getUsers(params: IGetUsers) {
  const { skip, take, search, userType} = params;
  let searchFilter = {};
  let includes: Prisma.UserInclude = {};

  if(search) {
    const searchParts = search.split(/\s+/);
    searchFilter = {
      AND: searchParts.map((part) => ({
        OR: [
          { firstName: { contains: part, mode: "insensitive" } },
          { lastName: { contains: part, mode: "insensitive" } },
          { email: { contains: part, mode: "insensitive"}}
        ],
      })),
    }
  }

  const where: Prisma.UserWhereInput = {
    ...searchFilter,
    ...(userType && { userType }),
  }
  
  return await prisma.$transaction(async(transaction) => {
    const users = await transaction.user.findMany({
      where,
      include: {
        ...includes
      },
      skip: skip || 0,
      take: take || 10,
    });
    const total = await transaction.user.count({
      where,
    });
    const sanitizedUsers = users.map(({password, ...user}) => user);
    return { users: sanitizedUsers, total }
  })
}

export async function updateUser(params: IUpdateUser) {
  const { id, ...data } = params;
  return await  prisma.user.update({
    where: {
      id: params.id
    },
    data: {...data}
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: {
      id
    }
  })
}
