import { PaymentType, PurchaseRequestOrderType } from "@prisma/client";

export interface ICreatePurchaseRequest {
  creatorId: string;
  supplierId: string;
  serialNumber: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
  expenses: string;
  nos: string;
  other?: string;
}

export interface IUpdatePurchaseRequest {
  id: string;
  suppliersName: string;
  serialNumber: string;
  type: PurchaseRequestOrderType;
  paymentType: PaymentType;
  expenses: string;
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
