import { PaymentType, PurchaseRequestOrderType } from "@prisma/client";

export interface ICreatePurchaseRequest {
  creatorId: string;
  supplierId: string;
  serialNumber: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
  disbursementType: string;
  classification: string;
  classificationType: string;
  nos: string;
  other?: string;
}

export interface IUpdatePurchaseRequest {
  id: string;
  supplierId: string;
  serialNumber: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
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
  type?: PurchaseRequestOrderType;
  paymentType?: PaymentType;
}

export interface IUpdatePurchaseRequestApprover {
  id: string;
  approverId: string;
}
