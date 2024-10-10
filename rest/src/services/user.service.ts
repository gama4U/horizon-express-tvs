import { Prisma, User } from "@prisma/client";
import prisma from "../../prisma/db";
import { IFindUsers, IUpdateUser, IUpdateUserAvatar, IUpdateUserPassword } from "../interfaces/user.interface";

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

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id
    },
  })
}

export async function findUsers(params: IFindUsers) {
  const { skip, take, search, type} = params;
  let searchFilter = {};

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
    ...(type && { userType: type }),
  }
  
  const findUsers = prisma.user.findMany({
    where,
    include: {
      _count: true
    },
    skip: skip || 0,
    take: take || 10,
  });

  const countUsers = prisma.user.count({
    where,
  });

  const [users, total] = await prisma.$transaction([findUsers, countUsers]);

  const sanitizedUsers = users.map(({password, ...user}) => user);

  return { users: sanitizedUsers, total }
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
  });
}

export async function updateUserAvatar({id, avatar}: IUpdateUserAvatar) {
  return await prisma.user.update({
    where: {id},
    data: {
      avatar
    }
  });
}

export async function updateUserPassword({id, password}: IUpdateUserPassword) {
  return await prisma.user.update({
    where: {id},
    data: {
      password
    }
  });
}
