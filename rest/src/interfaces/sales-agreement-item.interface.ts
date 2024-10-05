export interface ICreateSalesAgreementItem {
  salesAgreementId: string;
  particulars: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface IUpdateSalesAgreementItem {
  salesAgreementItemId: string;
  particulars: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
