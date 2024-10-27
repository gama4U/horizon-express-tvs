import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { IClient, TypeOfClient } from "../mutations/client.mutation";

interface IFetchClients {
  skip?: number;
  take?: number;
  search?: string;
  branch?: string | null,
  typeOfClient?: TypeOfClient | string,
}

interface IClients {
  clientsData: IClient[]
  total: number
}
export async function fetchClients({ ...params }: IFetchClients): Promise<IClients> {
  try {
    const response = await api.get('/api/v1/clients', {
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


