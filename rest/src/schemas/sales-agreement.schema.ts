import { z } from "zod";

export const createSalesAgreementSchema = z.object({
  body: z.object({
    salesAgreementNumber: z.string().min(1, {
      message: 'Sales agreement number is required'
    }),
    suppliersPoNumber: z.string().min(1, {
      message: 'Supplier PO number is required'
    }),
    documents: z.array(z.string()).refine(value => value.length > 0, {
      message: 'At least one document is required'
    })
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
