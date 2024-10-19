import { ISalesAgreement } from "./sales-agreement.interface";

export interface ISalesAgreementItem {
  id: string;
  salesAgreementId: string;
  particulars: string;
  currency: Currency;
  quantity: number;
  unitPrice: number;
  total: number;
  salesAgreement?: ISalesAgreement;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddSalesAgreementItem {
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

export enum Currency {
  USD = 'USD',
  PHP = 'PHP'
}
