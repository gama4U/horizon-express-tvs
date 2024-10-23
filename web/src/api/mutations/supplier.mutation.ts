import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { OfficeBranch } from "@/interfaces/user.interface";
import { IPurchaseRequestOrder } from "@/interfaces/purchase-request.interface";

export interface ISupplier {
  id: string
  name: string
  address: string
  contact: string
  category: string;
  officeBranch: OfficeBranch
  purchaseOrders: IPurchaseRequestOrder[]
}

export interface ICreateSupplier {
  name: string;
  address?: string;
  contact?: string;
  emailAddress?: string;
  category: string;
  notes?: string;
  officeBranch: OfficeBranch;
}

export interface IUpdateSupplier {
  id: string
  name?: string
  address?: string
  contact?: string
  emailAddress?: string;
  notes?: string | null;
  officeBranch?: OfficeBranch
}

export async function createSupplier(data: ICreateSupplier): Promise<ISupplier> {
  try {
    const response = await api.post('/api/v1/suppliers', data);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}

export async function updateSupplier({ id, ...data }: IUpdateSupplier) {
  try {
    const response = await api.put(`/api/v1/suppliers/${id}`, data);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}

export async function deleteSupplier(id: string) {
  try {
    const response = await api.delete(`/api/v1/suppliers/${id}`);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}


