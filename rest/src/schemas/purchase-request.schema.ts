import { PaymentType, PurchaseRequestOrderType } from "@prisma/client";
import { z } from "zod";

export const createPurchaseRequestSchema = z.object({
  body: z.object({
    supplierId: z.string().min(1, {
      message: 'Supplier id is required'
    }),
    serialNumber: z.string().min(1, {
      message: 'Serial number is required'
    }),
    type: z.enum([
      PurchaseRequestOrderType.VISA,
      PurchaseRequestOrderType.SHIPPING,
      PurchaseRequestOrderType.ACCOMMODATION,
      PurchaseRequestOrderType.TRANSPORTATION_RENTAL,
      PurchaseRequestOrderType.INTERNATIONAL_AIRLINE_TICKETING,
      PurchaseRequestOrderType.DOMESTIC_AIRLINE_TICKETING,
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
    supplierId: z.string().min(1, {
      message: 'Supplier id is required'
    }),
    serialNumber: z.string().min(1, {
      message: 'Serial number is required'
    }),
    type: z.enum([
      PurchaseRequestOrderType.VISA,
      PurchaseRequestOrderType.SHIPPING,
      PurchaseRequestOrderType.ACCOMMODATION,
      PurchaseRequestOrderType.TRANSPORTATION_RENTAL,
      PurchaseRequestOrderType.INTERNATIONAL_AIRLINE_TICKETING,
      PurchaseRequestOrderType.DOMESTIC_AIRLINE_TICKETING,
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
      PurchaseRequestOrderType.VISA,
      PurchaseRequestOrderType.SHIPPING,
      PurchaseRequestOrderType.ACCOMMODATION,
      PurchaseRequestOrderType.TRANSPORTATION_RENTAL,
      PurchaseRequestOrderType.INTERNATIONAL_AIRLINE_TICKETING,
      PurchaseRequestOrderType.DOMESTIC_AIRLINE_TICKETING,
    ]).optional(),
    paymentType: z.enum([
      PaymentType.CASH,
      PaymentType.CHECK,
    ]).optional(),
  })
});
