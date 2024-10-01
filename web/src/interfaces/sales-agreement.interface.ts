export interface ISalesAgreement {
  id: string;
  salesAgreementNumber: string;
  supplierPoNumber: string;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSalesAgreement {
  salesAgreementNumber: string;
  suppliersPoNumber: string;
  documents: string[];
}
