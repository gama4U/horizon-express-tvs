import { AxiosError } from "axios";
import { IAddAccommodation } from "../../interfaces/accommodation.interface";
import api from "../../utils/api.util";

export async function addAccommodation(data: IAddAccommodation) {
  try {
    const response = await api.post('/api/v4/accommodations', data);
    return response.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong')
  }
}
