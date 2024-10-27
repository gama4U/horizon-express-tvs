import { ICreatePackage, IUpdatePackage } from "@/interfaces/package.interface";
import api from "@/utils/api.util";
import { AxiosError } from "axios";

export async function createPackage(data: ICreatePackage) {
  try {
    const response = await api.post('/api/v1/packages', data);
    return response.data;
  } catch(error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong')
  }
}

export async function updatePackage({id, ...data}: IUpdatePackage) {
  try {
    const response = await api.put(`/api/v1/packages/${id}`, data);
    return response.data;
  } catch(error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong')
  }
}

export async function deletePackage(id: string) {
  try {
    const response = await api.delete(`/api/v1/packages/${id}`);
    return response.data;
  } catch(error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong')
  }
}
