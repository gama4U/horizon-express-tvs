import { ClientType } from "@prisma/client";

export interface ICreateSalesAgreement {
  creatorId: string;
  typeOfClient: ClientType;
  clientName: string;
  preparedBy?: string;
  approvedBy?: string;
  serialNumber: string;
}

export interface IFindSalesAgreements {
  skip?: number;
  take?: number;
  search?: string;
}
