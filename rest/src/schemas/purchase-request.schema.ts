import { ClientType, PaymentType, PurchaseRequestOrderType } from "@prisma/client";
import { z } from "zod";

export const createPurchaseRequestSchema = z.object({
  body: z.object({
    suppliersName: z.string().min(1, {
      message: 'Supplier name is required'
    }),
    serialNumber: z.string().min(1, {
      message: 'Serial number is required'
    }),
    type: z.enum([
      PurchaseRequestOrderType.HOTEL,
      PurchaseRequestOrderType.INTERNATIONAL_PACKAGE,
      PurchaseRequestOrderType.LOCAL_PACKAGE,
      PurchaseRequestOrderType.TICKET,
      PurchaseRequestOrderType.VISA,
    ]),
    paymentType: z.enum([
      PaymentType.CASH,
      PaymentType.CHECK,
    ]),
    expenses: z.string().min(1, {
      message: 'Expense is required'
    }),
    other: z.string().optional(),
    nos: z.string().min(1, {
      message: 'NOS is required'
    }),
  })
});

export const updatePurchaseRequestSchema = z.object({
  body: z.object({
    suppliersName: z.string().min(1, {
      message: 'Supplier name is required'
    }),
    serialNumber: z.string().min(1, {
      message: 'Serial number is required'
    }),
    type: z.enum([
      PurchaseRequestOrderType.HOTEL,
      PurchaseRequestOrderType.INTERNATIONAL_PACKAGE,
      PurchaseRequestOrderType.LOCAL_PACKAGE,
      PurchaseRequestOrderType.TICKET,
      PurchaseRequestOrderType.VISA,
    ]),
    paymentType: z.enum([
      PaymentType.CASH,
      PaymentType.CHECK,
    ]),
    expenses: z.string().min(1, {
      message: 'Expense is required'
    }),
    other: z.string().optional(),
    nos: z.string().min(1, {
      message: 'NOS is required'
    }),
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
    type: z.enum([
      PurchaseRequestOrderType.HOTEL,
      PurchaseRequestOrderType.INTERNATIONAL_PACKAGE,
      PurchaseRequestOrderType.LOCAL_PACKAGE,
      PurchaseRequestOrderType.TICKET,
      PurchaseRequestOrderType.VISA,
    ]).optional(),
    paymentType: z.enum([
      PaymentType.CASH,
      PaymentType.CHECK,
    ]).optional(),
  })
});
