"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPurchaseRequestsSchema = exports.updatePurchaseRequestSchema = exports.createPurchaseRequestSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createPurchaseRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        supplierId: zod_1.z.string().min(1, {
            message: 'Supplier id is required'
        }),
        serialNumber: zod_1.z.string().min(1, {
            message: 'Serial number is required'
        }),
        type: zod_1.z.enum([
            client_1.PurchaseRequestOrderType.VISA,
            client_1.PurchaseRequestOrderType.SHIPPING,
            client_1.PurchaseRequestOrderType.ACCOMMODATION,
            client_1.PurchaseRequestOrderType.TRANSPORTATION_RENTAL,
            client_1.PurchaseRequestOrderType.INTERNATIONAL_AIRLINE_TICKETING,
            client_1.PurchaseRequestOrderType.DOMESTIC_AIRLINE_TICKETING,
        ]),
        paymentType: zod_1.z.enum([
            client_1.PaymentType.CASH,
            client_1.PaymentType.CHECK,
        ]),
        disbursementType: zod_1.z.string().min(1, {
            message: 'Disbursement type is required'
        }),
        classification: zod_1.z.string().min(1, {
            message: 'Classification is required'
        }),
        classificationType: zod_1.z.string().min(1, {
            message: 'Classification type is required'
        }),
        other: zod_1.z.string().optional(),
        nos: zod_1.z.string().min(1, {
            message: 'NOS is required'
        }),
    })
});
exports.updatePurchaseRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        supplierId: zod_1.z.string().min(1, {
            message: 'Supplier id is required'
        }),
        serialNumber: zod_1.z.string().min(1, {
            message: 'Serial number is required'
        }),
        type: zod_1.z.enum([
            client_1.PurchaseRequestOrderType.VISA,
            client_1.PurchaseRequestOrderType.SHIPPING,
            client_1.PurchaseRequestOrderType.ACCOMMODATION,
            client_1.PurchaseRequestOrderType.TRANSPORTATION_RENTAL,
            client_1.PurchaseRequestOrderType.INTERNATIONAL_AIRLINE_TICKETING,
            client_1.PurchaseRequestOrderType.DOMESTIC_AIRLINE_TICKETING,
        ]),
        paymentType: zod_1.z.enum([
            client_1.PaymentType.CASH,
            client_1.PaymentType.CHECK,
        ]),
        disbursementType: zod_1.z.string().min(1, {
            message: 'Disbursement type is required'
        }),
        classification: zod_1.z.string().min(1, {
            message: 'Classification is required'
        }),
        classificationType: zod_1.z.string().min(1, {
            message: 'Classification type is required'
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
            client_1.PurchaseRequestOrderType.VISA,
            client_1.PurchaseRequestOrderType.SHIPPING,
            client_1.PurchaseRequestOrderType.ACCOMMODATION,
            client_1.PurchaseRequestOrderType.TRANSPORTATION_RENTAL,
            client_1.PurchaseRequestOrderType.INTERNATIONAL_AIRLINE_TICKETING,
            client_1.PurchaseRequestOrderType.DOMESTIC_AIRLINE_TICKETING,
        ]).optional(),
        paymentType: zod_1.z.enum([
            client_1.PaymentType.CASH,
            client_1.PaymentType.CHECK,
        ]).optional(),
    })
});
