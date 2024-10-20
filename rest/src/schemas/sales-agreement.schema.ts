import { Currency } from "@prisma/client";
import { z } from "zod";

export const createSalesAgreementSchema = z.object({
  body: z.object({
    clientId: z.string().min(1, {
      message: 'Client id is required'
    }),
    serialNumber: z.string().min(1, {
      message: 'Serial number is required'
    }),
    currency: z.enum([Currency.PHP, Currency.USD]),
    serviceFee: z.number().optional()
  })
});

export const updateSalesAgreementSchema = z.object({
  body: z.object({
    clientId: z.string().min(1, {
      message: 'Client id is required'
    }),
    serialNumber: z.string().min(1, {
      message: 'Serial number is required'
    }),
    currency: z.enum([Currency.PHP, Currency.USD]),
    serviceFee: z.number().optional()
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
  })
});
