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
const lead_service_1 = require("../services/lead.service");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const lead_schema_1 = require("../schemas/lead.schema");
const leadRouter = express_1.default.Router();
leadRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created = yield (0, lead_service_1.createLead)(req.body);
        if (!created)
            throw new Error('Failed to create lead');
        return res.status(200).json(created);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
leadRouter.get('/', (0, validate_middleware_1.validate)(lead_schema_1.getLeadsSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, take, search } = req.query;
        const filters = {
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
            search: search ? String(search) : undefined,
        };
        const leads = yield (0, lead_service_1.fetchLeads)(filters);
        if (!leads) {
            throw new Error('Failed to get leads');
        }
        return res.status(200).json(leads);
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
leadRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updated = yield (0, lead_service_1.updateLead)(id, req.body);
        if (!updated)
            throw new Error('Failed to update lead');
        return res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
leadRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield (0, lead_service_1.deleteLead)(id);
        if (!deleted) {
            throw new Error('Failed to delete lead');
        }
        return res.status(200).json({
            message: 'Lead deleted successfully'
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
exports.default = leadRouter;
