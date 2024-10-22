import { z } from "zod";

export const createPurchaseRequestSchema = z.object({
  body: z.object({
    supplierId: z.string().min(1, {
      message: 'Supplier id is required'
    }),
    salesAgreementId: z.string().min(1, {
      message: 'Sales agreement id is required'
    }),
    disbursementType: z.string().min(1, {
      message: 'Disbursement type is required'
    }),
    classification: z.string().min(1, {
      message: 'Classification is required'
    }),
    classificationType: z.string().min(1, {
      message: 'Classification type is required'
    }),
    other: z.string().optional(),
  })
});

export const updatePurchaseRequestSchema = z.object({
  body: z.object({
    supplierId: z.string().min(1, {
      message: 'Supplier id is required'
    }),
    salesAgreementId: z.string().min(1, {
      message: 'Sales agreement id is required'
    }),
    disbursementType: z.string().min(1, {
      message: 'Disbursement type is required'
    }),
    classification: z.string().min(1, {
      message: 'Classification is required'
    }),
    classificationType: z.string().min(1, {
      message: 'Classification type is required'
    }),
    other: z.string().optional(),
  })
});


export const findPurchaseRequestsSchema = z.object({
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
