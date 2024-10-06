import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { ICreatedTransaction } from "../../interfaces/transaction.interface";
import { TravelVoucherType } from "../../interfaces/travel.interface";

export async function createTransaction(): Promise<ICreatedTransaction> {
  try {
    const response = await api.post('/api/v1/transactions');
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}
export interface ICreateAirline {
  name: string;
  code: string;
  etd: Date;
  eta: Date;
  origin: string;
  destination: string;
}
export interface ICreateShipping {
  name: string;
  voyageNumber: string;
  origin: string;
  destination: string;
  dateOfTravel: Date;
}

export interface ICreateTravelVoucher {
  transactionId: string;
  type: TravelVoucherType;
  airline?: ICreateAirline;
  shipping?: ICreateShipping
}

export async function createTravelVoucher(payload: ICreateTravelVoucher) {
  try {
    const response = await api.post('/api/v1/travel-vouchers/', payload)
    return response.data
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}
export enum AccommodationType {
  HOTEL = 'HOTEL',
  RESORT = 'RESORT',
  AIRBNB = 'AIRBNB',
  OTHERS = 'OTHERS',
}

export interface ICreateAccommodationVoucher {
  transactionId: string;
  name: string;
  type: AccommodationType;
  checkinDate: Date;
  checkoutDate: Date;
  hotelConfirmationNumber: string;
  remarks?: string;
}

export async function createAccommodationVoucher(payload: ICreateAccommodationVoucher) {
  try {
    const response = await api.post('/api/v1/accommodation-vouchers/', payload)
    return response.data
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}


export interface IUpdateAirline {
  id: string;
  name: string;
  code: string;
  etd: Date;
  eta: Date;
  origin: string;
  destination: string;
}
export interface IUpdateShipping {
  id: string;
  name: string;
  voyageNumber: string;
  origin: string;
  destination: string;
  dateOfTravel: Date;
}

export interface IUpdateTravelVoucher {
  id: string;
  type: TravelVoucherType;
  airline?: IUpdateAirline;
  shipping?: IUpdateShipping
}

export async function updateTravelVoucher(payload: IUpdateTravelVoucher) {
  try {
    const response = await api.put(`/api/v1/travel-vouchers/${payload.id}`, payload)
    return response.data
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}
export interface IUpdateAccommodationVoucher {
  id: string;
  name: string;
  type: AccommodationType;
  checkinDate: Date;
  checkoutDate: Date;
  hotelConfirmationNumber: string;
  remarks?: string;
}
export async function updateAccommodationVoucher(payload: IUpdateAccommodationVoucher) {
  try {
    const response = await api.put(`/api/v1/accommodation-vouchers/${payload.id}`, payload)
    return response.data
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}


