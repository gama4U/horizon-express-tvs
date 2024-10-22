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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchaseRequest = createPurchaseRequest;
exports.updatePurchaseRequest = updatePurchaseRequest;
exports.findPurchaseRequests = findPurchaseRequests;
exports.findPurchaseRequestById = findPurchaseRequestById;
exports.deletePurchaseRequestById = deletePurchaseRequestById;
exports.fetchPurchaseRequestSummary = fetchPurchaseRequestSummary;
exports.updatePurchaseRequestOrderApprover = updatePurchaseRequestOrderApprover;
const moment_1 = __importDefault(require("moment"));
const db_utils_1 = __importDefault(require("../utils/db.utils"));
function createPurchaseRequest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_utils_1.default.purchaseRequestOrder.create({
            data
        });
    });
}
function updatePurchaseRequest(_a) {
    return __awaiter(this, void 0, void 0, function* () {
        var { id } = _a, data = __rest(_a, ["id"]);
        return db_utils_1.default.purchaseRequestOrder.update({
            where: {
                id
            },
            data
        });
    });
}
function findPurchaseRequests(_a) {
    return __awaiter(this, arguments, void 0, function* ({ skip, take, search }) {
        let whereInput = {};
        if (search) {
            whereInput = {
                OR: [
                    {
                        supplier: {
                            name: { contains: search, mode: "insensitive" },
                            address: { contains: search, mode: "insensitive" },
                            contact: { contains: search, mode: "insensitive" },
                        }
                    },
                    { serialNumber: { contains: search, mode: "insensitive" } },
                ],
            };
        }
        const findPurchaseRequests = db_utils_1.default.purchaseRequestOrder.findMany({
            where: Object.assign({}, whereInput),
            include: {
                creator: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        avatar: true,
                        userType: true
                    }
                },
                supplier: true,
                _count: {
                    select: {
                        purchaseOrderItems: true
                    }
                }
            },
            skip: skip !== null && skip !== void 0 ? skip : 0,
            take: take !== null && take !== void 0 ? take : 10,
            orderBy: {
                createdAt: 'desc'
            }
        });
        const countPurchaseRequests = db_utils_1.default.purchaseRequestOrder.count({
            where: Object.assign({}, whereInput),
        });
        const [purchaseRequests, total] = yield db_utils_1.default.$transaction([
            findPurchaseRequests,
            countPurchaseRequests
        ]);
        return { purchaseRequests, total };
    });
}
function findPurchaseRequestById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_utils_1.default.purchaseRequestOrder.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        userType: true,
                        signature: true
                    }
                },
                salesAgreement: true,
                transaction: true,
                purchaseOrderItems: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                approver: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        userType: true,
                        signature: true
                    }
                },
                supplier: true,
                _count: {
                    select: {
                        purchaseOrderItems: true
                    }
                }
            }
        });
    });
}
function deletePurchaseRequestById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_utils_1.default.purchaseRequestOrder.delete({
            where: {
                id
            }
        });
    });
}
function fetchPurchaseRequestSummary() {
    return __awaiter(this, void 0, void 0, function* () {
        const oneWeekAgo = (0, moment_1.default)().subtract(7, 'days').startOf('day').toDate();
        const [total, since7days] = yield Promise.all([
            db_utils_1.default.purchaseRequestOrder.count(),
            db_utils_1.default.purchaseRequestOrder.count({
                where: {
                    createdAt: {
                        gte: oneWeekAgo,
                    },
                },
            }),
        ]);
        const rate = total > 0 ? (since7days / total) * 100 : 0;
        return {
            total, since7days, rate
        };
    });
}
function updatePurchaseRequestOrderApprover(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, approverId }) {
        return yield db_utils_1.default.purchaseRequestOrder.update({
            where: { id },
            data: { approverId }
        });
    });
}
