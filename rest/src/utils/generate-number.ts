import { OfficeBranch } from "@prisma/client";
import dayjs from "dayjs";

export function getNextMemorandumNumber(lastMemoNumber: string | null): string {
  if (lastMemoNumber) {
    return (parseInt(lastMemoNumber) + 1).toString().padStart(3, '0');
  } else {
    return '001';
  }
}
export function getNextDtsNumber(lastDtsNumber: string | null): string {
  if (lastDtsNumber) {
    return (parseInt(lastDtsNumber) + 1).toString().padStart(3, '0');
  } else {
    return '001';
  }
}

export function getNextTransactionNumber(lastTransactionNumber: string | null, branch: OfficeBranch) {
  const today = dayjs().format('MMDDYYYY');
  let newTransactionNumber = '001';

  if (lastTransactionNumber) {
    const numericPart = lastTransactionNumber.slice(1, 4); // Extract the 001 part from T001

    if (numericPart) {
      newTransactionNumber = (parseInt(numericPart) + 1).toString().padStart(3, '0');
    }
  }

  const branchCode = branch === OfficeBranch.CALBAYOG ? 'CLB' : 'CEB';
  return `T${newTransactionNumber}-${today}-${branchCode}`;
}

interface GenerateSerialNumberParams {
  uniqueNumber: number;
  prefix: string;
  postfix: string;
}
export function generateSerialNumber({uniqueNumber, prefix, postfix}: GenerateSerialNumberParams) {
  console.log({uniqueNumber, prefix, postfix})
  const today = dayjs().format('MMDDYYYY');
  const paddedNumber = String(uniqueNumber).toString().padStart(3, '0');
  return `${prefix}${paddedNumber}-${today}-${postfix}`
}
