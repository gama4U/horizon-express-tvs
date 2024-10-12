import { AxiosError } from "axios";
import api from "../../utils/api.util";

interface IFetchMemorandums {
  skip?: number;
  take?: number;
  search?: string;
}

export interface IMemorandum {
  id: string
  memorandumNumber: string
  to: string
  re: string
  addressee: string
  contents: string
}

interface IMemorandums {
  memorandumData: IMemorandum[]
  total: number
}

export async function fetchMemorandums({ ...params }: IFetchMemorandums): Promise<IMemorandums> {
  try {
    const response = await api.get('/api/v1/memorandums', {
      params: {
        ...params,
      }
    });
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}

export async function fetchMemorandum(id: string): Promise<IMemorandum> {
  try {
    const response = await api.get(`/api/v1/memorandums/${id}`);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}


