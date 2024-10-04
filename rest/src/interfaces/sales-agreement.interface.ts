export interface ICreateSalesAgreement {
  salesAgreementNumber: string;
  suppliersPoNumber: string;
  documents: string[];
}

export interface IFindSalesAgreements {
  skip?: number;
  take?: number;
  search?: string;
}
