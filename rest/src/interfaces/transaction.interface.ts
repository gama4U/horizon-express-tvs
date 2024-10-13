
export interface ITransaction {
  id: string;
  userId: string;
  lead: any;
  travelVoucher?: any;
  accommodationVoucher?: any;
  tourVoucher?: any;
  transportVoucher?: any;
  salesAgreement?: any;
  purchaseOrder?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUpdateTransactionApprover {
  id: string;
  approverId: string;
}
