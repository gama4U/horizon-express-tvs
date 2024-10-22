
export interface ICreatePurchaseRequest {
  creatorId: string;
  supplierId: string;
  salesAgreementId: string;
  disbursementType: string;
  classification: string;
  classificationType: string;
  nos: string;
  other?: string;
}

export interface IUpdatePurchaseRequest {
  id: string;
  supplierId: string;
  salesAgreementId: string;
  disbursementType: string;
  classification: string;
  classificationType: string;
  nos: string;
  other?: string;
}

export interface IFindPurchaseRequests {
  skip?: number;
  take?: number;
  search?: string;
}

export interface IUpdatePurchaseRequestApprover {
  id: string;
  approverId: string;
}
