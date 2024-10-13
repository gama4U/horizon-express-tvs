"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPurchaseRequestsSchema = exports.updatePurchaseRequestSchema = exports.createPurchaseRequestSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createPurchaseRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        suppliersName: zod_1.z.string().min(1, {
            message: 'Supplier name is required'
        }),
        serialNumber: zod_1.z.string().min(1, {
            message: 'Serial number is required'
        }),
        type: zod_1.z.enum([
            client_1.PurchaseRequestOrderType.HOTEL,
            client_1.PurchaseRequestOrderType.INTERNATIONAL_PACKAGE,
            client_1.PurchaseRequestOrderType.LOCAL_PACKAGE,
            client_1.PurchaseRequestOrderType.TICKET,
            client_1.PurchaseRequestOrderType.VISA,
        ]),
        paymentType: zod_1.z.enum([
            client_1.PaymentType.CASH,
            client_1.PaymentType.CHECK,
        ]),
        expenses: zod_1.z.string().min(1, {
            message: 'Expense is required'
        }),
        other: zod_1.z.string().optional(),
        nos: zod_1.z.string().min(1, {
            message: 'NOS is required'
        }),
    })
});
exports.updatePurchaseRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        suppliersName: zod_1.z.string().min(1, {
            message: 'Supplier name is required'
        }),
        serialNumber: zod_1.z.string().min(1, {
            message: 'Serial number is required'
        }),
        type: zod_1.z.enum([
            client_1.PurchaseRequestOrderType.HOTEL,
            client_1.PurchaseRequestOrderType.INTERNATIONAL_PACKAGE,
            client_1.PurchaseRequestOrderType.LOCAL_PACKAGE,
            client_1.PurchaseRequestOrderType.TICKET,
            client_1.PurchaseRequestOrderType.VISA,
        ]),
        paymentType: zod_1.z.enum([
            client_1.PaymentType.CASH,
            client_1.PaymentType.CHECK,
        ]),
        expenses: zod_1.z.string().min(1, {
            message: 'Expense is required'
        }),
        other: zod_1.z.string().optional(),
        nos: zod_1.z.string().min(1, {
            message: 'NOS is required'
        }),
    })
});
exports.findPurchaseRequestsSchema = zod_1.z.object({
    query: zod_1.z.object({
        skip: zod_1.z.string().refine(skip => !isNaN(Number(skip)), {
            message: 'Invalid skip value'
        }).optional(),
        take: zod_1.z.string().refine(skip => !isNaN(Number(skip)), {
            message: 'Invalid take value'
        }).optional(),
        search: zod_1.z.string().optional(),
        type: zod_1.z.enum([
            client_1.PurchaseRequestOrderType.HOTEL,
            client_1.PurchaseRequestOrderType.INTERNATIONAL_PACKAGE,
            client_1.PurchaseRequestOrderType.LOCAL_PACKAGE,
            client_1.PurchaseRequestOrderType.TICKET,
            client_1.PurchaseRequestOrderType.VISA,
        ]).optional(),
        paymentType: zod_1.z.enum([
            client_1.PaymentType.CASH,
            client_1.PaymentType.CHECK,
        ]).optional(),
    })
});
