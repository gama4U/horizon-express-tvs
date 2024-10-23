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
exports.findSupplierById = void 0;
exports.createSupplier = createSupplier;
exports.updateSupplier = updateSupplier;
exports.deleteSupplier = deleteSupplier;
exports.fetchSuppliers = fetchSuppliers;
const db_utils_1 = __importDefault(require("../utils/db.utils"));
function createSupplier(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_utils_1.default.supplier.create({
            data
        });
    });
}
function updateSupplier(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_utils_1.default.supplier.update({
            where: {
                id: id
            },
            data
        });
    });
}
function deleteSupplier(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_utils_1.default.supplier.delete({
            where: {
                id: id
            }
        });
    });
}
function fetchSuppliers(_a) {
    return __awaiter(this, arguments, void 0, function* ({ skip, take, search, category, branch }) {
        let whereInput = {};
        if (search) {
            const searchParts = search.split(/\s+/);
            whereInput = {
                AND: searchParts.map((part) => ({
                    OR: [
                        { name: { contains: part, mode: "insensitive" } },
                        { address: { contains: part, mode: "insensitive" } },
                        { emailAddress: { contains: part, mode: "insensitive" } },
                        { category: { contains: part, mode: "insensitive" } },
                    ],
                })),
            };
        }
        if (category) {
            whereInput = Object.assign(Object.assign({}, whereInput), { category });
        }
        const suppliers = db_utils_1.default.supplier.findMany({
            where: Object.assign(Object.assign({}, whereInput), { officeBranch: branch }),
            include: {
                purchaseOrders: true,
                _count: {
                    select: {
                        purchaseOrders: true
                    }
                }
            },
            skip: skip !== null && skip !== void 0 ? skip : 0,
            take: take !== null && take !== void 0 ? take : 10,
            orderBy: {
                createdAt: 'desc'
            }
        });
        const countSuppliers = db_utils_1.default.supplier.count({
            where: Object.assign(Object.assign({}, whereInput), { officeBranch: branch }),
        });
        const [suppliersData, total] = yield db_utils_1.default.$transaction([
            suppliers,
            countSuppliers
        ]);
        return { suppliersData, total };
    });
}
const findSupplierById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_utils_1.default.supplier.findFirst({
        where: { id }
    });
});
exports.findSupplierById = findSupplierById;
