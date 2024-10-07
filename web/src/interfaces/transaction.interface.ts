import { IAccommodationVoucher } from "./accommodation.interface";
import { IPurchaseRequestOrder } from "./purchase-request.interface";
import { ISalesAgreement } from "./sales-agreement.interface";
import { ITourVoucher } from "./tour.interface";
import { ITransportVoucher } from "./transport.interface";
import { ITravelVoucher } from "./travel.interface";
import { IUser } from "./user.interface";

export interface ICreatedTransaction {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
}

export interface IHorizonOnlyFields {
  creator: IUser;
  salesAgreement: ISalesAgreement
}

export interface ITransaction {
  id: string;
  lead: IUser;
  travelVoucher?: ITravelVoucher[]
  accommodationVoucher?: IAccommodationVoucher[]
  tourVoucher?: ITourVoucher[]
  transportVoucher?: ITransportVoucher[]
  salesAgreement?: ISalesAgreement
  salesAgreementId?: string
  purchaseOrderId?: string
  purchaseOrder?: IPurchaseRequestOrder
  createdAt?: Date
  updatedAt?: Date
}

export interface IFetchTransaction {
  id?: string;
}

