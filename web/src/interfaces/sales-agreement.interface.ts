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
  supplierPoNumber: string;
  documents: string[];
}
