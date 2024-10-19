import { z } from "zod";

export const createSalesAgreementItemSchema = z.object({
  body: z.object({
    particulars: z.string().min(1, {
      message: 'Particulars is required'
    }),
    quantity: z.number().refine(value => value > 0, {
      message: 'Invalid quantity'
    }),
    unitPrice: z.number().refine(value => value > 0, {
      message: 'Invalid unit price'
    }),
    total: z.number().refine(value => value > 0, {
      message: 'Invalid total'
    }),
  })
});

export const updateSalesAgreementItemSchema = z.object({
  body: z.object({
    particulars: z.string().min(1, {
      message: 'Particulars is required'
    }),
    quantity: z.number().refine(value => value > 0, {
      message: 'Invalid quantity'
    }),
    unitPrice: z.number().refine(value => value > 0, {
      message: 'Invalid unit price'
    }),
    total: z.number().refine(value => value > 0, {
      message: 'Invalid total'
    }),
  })
});
