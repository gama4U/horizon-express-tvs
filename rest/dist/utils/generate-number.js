"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextMemorandumNumber = getNextMemorandumNumber;
exports.getNextDtsNumber = getNextDtsNumber;
exports.getNextTransactionNumber = getNextTransactionNumber;
exports.generateSerialNumber = generateSerialNumber;
const client_1 = require("@prisma/client");
const dayjs_1 = __importDefault(require("dayjs"));
function getNextMemorandumNumber(lastMemoNumber) {
    if (lastMemoNumber) {
        return (parseInt(lastMemoNumber) + 1).toString().padStart(3, '0');
    }
    else {
        return '001';
    }
}
function getNextDtsNumber(lastDtsNumber) {
    if (lastDtsNumber) {
        return (parseInt(lastDtsNumber) + 1).toString().padStart(3, '0');
    }
    else {
        return '001';
    }
}
function getNextTransactionNumber(lastTransactionNumber, branch) {
    const today = (0, dayjs_1.default)().format('MMDDYYYY');
    let newTransactionNumber = '001';
    if (lastTransactionNumber) {
        const numericPart = lastTransactionNumber.slice(1, 4); // Extract the 001 part from T001
        if (numericPart) {
            newTransactionNumber = (parseInt(numericPart) + 1).toString().padStart(3, '0');
        }
    }
    const branchCode = branch === client_1.OfficeBranch.CALBAYOG ? 'CLB' : 'CEB';
    return `T${newTransactionNumber}-${today}-${branchCode}`;
}
function generateSerialNumber({ uniqueNumber, prefix, postfix }) {
    console.log({ uniqueNumber, prefix, postfix });
    const today = (0, dayjs_1.default)().format('MMDDYYYY');
    const paddedNumber = String(uniqueNumber).toString().padStart(3, '0');
    return `${prefix}${paddedNumber}-${today}-${postfix}`;
}
