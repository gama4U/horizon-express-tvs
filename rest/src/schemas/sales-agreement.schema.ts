import { ClientType, Currency } from "@prisma/client";
import { z } from "zod";

export const createSalesAgreementSchema = z.object({
  body: z.object({
    clientName: z.string().min(1, {
      message: 'Client name is required'
    }),
    serialNumber: z.string().min(1, {
      message: 'Serial number is required'
    }),
    typeOfClient: z.enum([
      ClientType.WALK_IN,
      ClientType.CORPORATE,
      ClientType.GOVERNMENT,
    ]),
    currency: z.enum([Currency.PHP, Currency.USD]),
    department: z.string().optional()
  })
});

export const updateSalesAgreementSchema = z.object({
  body: z.object({
    clientName: z.string().min(1, {
      message: 'Client name is required'
    }),
    serialNumber: z.string().min(1, {
      message: 'Serial number is required'
    }),
    typeOfClient: z.enum([
      ClientType.WALK_IN,
      ClientType.CORPORATE,
      ClientType.GOVERNMENT,
    ]),
  })
});


export const getSalesAgreementsSchema = z.object({
  query: z.object({
    skip: z.string().refine(skip => !isNaN(Number(skip)), {
      message: 'Invalid skip value'
    }).optional(),
    take: z.string().refine(skip => !isNaN(Number(skip)), {
      message: 'Invalid take value'
    }).optional(),
    search: z.string().optional(),
    typeOfClient: z.enum([
      ClientType.WALK_IN,
      ClientType.CORPORATE,
      ClientType.GOVERNMENT,
    ]).optional(),
  })
});
