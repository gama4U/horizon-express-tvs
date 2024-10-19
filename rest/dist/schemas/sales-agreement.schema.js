"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesAgreementsSchema = exports.updateSalesAgreementSchema = exports.createSalesAgreementSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.createSalesAgreementSchema = zod_1.z.object({
    body: zod_1.z.object({
        clientName: zod_1.z.string().min(1, {
            message: 'Client name is required'
        }),
        serialNumber: zod_1.z.string().min(1, {
            message: 'Serial number is required'
        }),
        typeOfClient: zod_1.z.enum([
            client_1.ClientType.WALK_IN,
            client_1.ClientType.CORPORATE,
            client_1.ClientType.GOVERNMENT,
        ]),
        currency: zod_1.z.enum([client_1.Currency.PHP, client_1.Currency.USD]),
        department: zod_1.z.string().optional()
    })
});
exports.updateSalesAgreementSchema = zod_1.z.object({
    body: zod_1.z.object({
        clientName: zod_1.z.string().min(1, {
            message: 'Client name is required'
        }),
        serialNumber: zod_1.z.string().min(1, {
            message: 'Serial number is required'
        }),
        typeOfClient: zod_1.z.enum([
            client_1.ClientType.WALK_IN,
            client_1.ClientType.CORPORATE,
            client_1.ClientType.GOVERNMENT,
        ]),
    })
});
exports.getSalesAgreementsSchema = zod_1.z.object({
    query: zod_1.z.object({
        skip: zod_1.z.string().refine(skip => !isNaN(Number(skip)), {
            message: 'Invalid skip value'
        }).optional(),
        take: zod_1.z.string().refine(skip => !isNaN(Number(skip)), {
            message: 'Invalid take value'
        }).optional(),
        search: zod_1.z.string().optional(),
        typeOfClient: zod_1.z.enum([
            client_1.ClientType.WALK_IN,
            client_1.ClientType.CORPORATE,
            client_1.ClientType.GOVERNMENT,
        ]).optional(),
    })
});
