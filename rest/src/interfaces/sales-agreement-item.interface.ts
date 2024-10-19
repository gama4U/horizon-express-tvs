import { Currency } from "@prisma/client";

export interface ICreateSalesAgreementItem {
  salesAgreementId: string;
  particulars: string;
  currency: Currency;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface IUpdateSalesAgreementItem {
  salesAgreementItemId: string;
  particulars: string;
  currency: Currency;
  quantity: number;
  unitPrice: number;
  total: number;
}
