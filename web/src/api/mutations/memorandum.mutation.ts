import { AxiosError } from "axios";
import api from "../../utils/api.util";

export interface ICreateMemorandum {
  to: string
  re: string
  addressee: string
  contents: string
  creatorId: string
}

export interface IUpdateMemorandum {
  id: string
  to: string
  re: string
  addressee: string
  contents: string
}

export async function createMemorandum(data: ICreateMemorandum) {
  try {
    const response = await api.post('/api/v1/memorandums', data);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}

export async function updateMemorandum(data: IUpdateMemorandum) {
  try {
    const response = await api.put(`/api/v1/memorandums/${data.id}`, data);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || "Something went wrong");
  }
}

export async function deleteMemorandum(id: string) {
  try {
    const response = await api.delete(`/api/v1/memorandums/${id}`);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong')
  }
}

