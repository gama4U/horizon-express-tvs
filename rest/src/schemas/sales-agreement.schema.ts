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
