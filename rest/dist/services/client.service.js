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
exports.createClient = createClient;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;
exports.fetchClients = fetchClients;
const db_utils_1 = __importDefault(require("../utils/db.utils"));
function createClient(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_utils_1.default.client.create({
            data
        });
    });
}
function updateClient(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_utils_1.default.client.update({
            where: {
                id: id
            },
            data
        });
    });
}
function deleteClient(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_utils_1.default.client.delete({
            where: {
                id: id
            }
        });
    });
}
function fetchClients(_a) {
    return __awaiter(this, arguments, void 0, function* ({ skip, take, search }) {
        let whereInput = {};
        if (search) {
            const searchParts = search.split(/\s+/);
            whereInput = {
                AND: searchParts.map((part) => ({
                    OR: [
                        { firstName: { contains: part, mode: "insensitive" } },
                        { middleName: { contains: part, mode: "insensitive" } },
                        { lastName: { contains: part, mode: "insensitive" } },
                        { email: { contains: part, mode: "insensitive" } }
                    ],
                })),
            };
        }
        const client = db_utils_1.default.client.findMany({
            where: Object.assign({}, whereInput),
            include: {
                transactions: true,
                _count: {
                    select: {
                        transactions: true
                    }
                }
            },
            skip: skip !== null && skip !== void 0 ? skip : 0,
            take: take !== null && take !== void 0 ? take : 10,
            orderBy: {
                createdAt: 'desc'
            }
        });
        const countClients = db_utils_1.default.client.count({
            where: Object.assign({}, whereInput),
        });
        const [clientsData, total] = yield db_utils_1.default.$transaction([
            client,
            countClients
        ]);
        return { clientsData, total };
    });
}
