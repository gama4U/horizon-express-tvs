"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextMemorandumNumber = getNextMemorandumNumber;
function getNextMemorandumNumber(lastMemoNumber) {
    if (lastMemoNumber) {
        return (parseInt(lastMemoNumber) + 1).toString().padStart(3, '0');
    }
    else {
        return '001';
    }
}
