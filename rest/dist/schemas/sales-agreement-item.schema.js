"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSalesAgreementItemSchema = exports.createSalesAgreementItemSchema = void 0;
const zod_1 = require("zod");
exports.createSalesAgreementItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        particulars: zod_1.z.string().min(1, {
            message: 'Particulars is required'
        }),
        quantity: zod_1.z.number().refine(value => value > 0, {
            message: 'Invalid quantity'
        }),
        unitPrice: zod_1.z.number().refine(value => value > 0, {
            message: 'Invalid unit price'
        }),
        total: zod_1.z.number().refine(value => value > 0, {
            message: 'Invalid total'
        }),
    })
});
exports.updateSalesAgreementItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        particulars: zod_1.z.string().min(1, {
            message: 'Particulars is required'
        }),
        quantity: zod_1.z.number().refine(value => value > 0, {
            message: 'Invalid quantity'
        }),
        unitPrice: zod_1.z.number().refine(value => value > 0, {
            message: 'Invalid unit price'
        }),
        total: zod_1.z.number().refine(value => value > 0, {
            message: 'Invalid total'
        }),
    })
});