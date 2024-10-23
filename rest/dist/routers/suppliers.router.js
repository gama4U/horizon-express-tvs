"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
const supplier_schema_1 = require("../schemas/supplier.schema");
const supplier_service_1 = require("../services/supplier.service");
const supplierRouter = express_1.default.Router();
supplierRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created = yield (0, supplier_service_1.createSupplier)(req.body);
        if (!created)
            throw new Error('Failed to create supplier');
        return res.status(200).json(created);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
supplierRouter.get('/', (0, validate_middleware_1.validate)(supplier_schema_1.getSuppliersSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, take, search, category, branch } = req.query;
        const filters = {
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            search: search ? String(search) : undefined,
            category: category ? String(category) : undefined,
            branch: branch ? String(branch) : undefined,
        };
        const clients = yield (0, supplier_service_1.fetchSuppliers)(filters);
        if (!clients) {
            throw new Error('Failed to get suppliers');
        }
        return res.status(200).json(clients);
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
supplierRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield (0, supplier_service_1.updateSupplier)(id, req.body);
        if (!updated)
            throw new Error('Failed to update supplier');
        return res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
supplierRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield (0, supplier_service_1.deleteSupplier)(id);
        if (!deleted) {
            throw new Error('Failed to delete supplier');
        }
        return res.status(200).json({
            message: 'Supplier deleted successfully'
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
exports.default = supplierRouter;
