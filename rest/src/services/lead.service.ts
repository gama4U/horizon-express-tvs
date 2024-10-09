import { Prisma } from "@prisma/client";
import prisma from "../../prisma/db";
import { ICreateLead, IUpdateLead } from "../interfaces/lead.interface";

export async function createLead(data: ICreateLead) {
  return await prisma.lead.create({
    data
  })
}

export async function updateLead(id: string, data: IUpdateLead) {
  return await prisma.lead.update({
    where: {
      id: id
    },
    data
  })
}

export async function deleteLead(id: string) {
  return await prisma.lead.delete({
    where: {
      id: id
    }
  })
}

export interface IFindLeads {
  skip?: number;
  take?: number;
  search?: string;
}

export async function fetchLeads({ skip, take, search }: IFindLeads) {
  let whereInput: Prisma.LeadWhereInput = {};

  if (search) {
    whereInput = {
      OR: [
        { firstName: { contains: search, mode: "insensitive" } },
        { middleName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ],
    }
  }


  const leads = prisma.lead.findMany({
    where: {
      ...whereInput,
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

  const countLeads = prisma.lead.count({
    where: {
      ...whereInput
    },
  });

  const [leadsData, total] = await prisma.$transaction([
    leads,
    countLeads
  ]);

  return { leadsData, total };
}
