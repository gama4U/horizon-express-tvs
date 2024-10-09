import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { ITransaction } from "@/interfaces/transaction.interface";

export interface ICreateLead {
  firstName: string
  middleName: string
  lastName: string
  email: string
  contactNumber: string
  documents?: string[]
}
export interface IUpdateLead {
  id: string
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  contactNumber?: string
  documents?: string[]
}

export interface ILead {
  id: string
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  contactNumber?: string
  documents?: string[]
  transactions?: ITransaction[]
}
export async function createLead(data: ICreateLead): Promise<ILead> {
  try {
    const response = await api.post('/api/v1/leads', data);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}

export async function updateLead({ id, ...data }: IUpdateLead) {
  try {
    const response = await api.put(`/api/v1/leads/${id}`, data);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}

export async function deletePurchaseRequestItem(id: string) {
  try {
    const response = await api.delete(`/api/v1/leads/${id}`);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}
