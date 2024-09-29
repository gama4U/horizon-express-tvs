import { AxiosError } from "axios";
import { ISignUp } from "../../interfaces/auth.interface";
import { IUserCredential, IUserSession } from "../../interfaces/user.interface";
import api from "../../utils/api.util";

export async function signUp(data: ISignUp) {
  try {
    const response = await api.post('/auth/signup', data);
    return response.data;
  } catch(error) {
    let message;
    if(error instanceof AxiosError) {
      message = error.response?.data?.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}

export async function signIn(data: IUserCredential): Promise<IUserSession> {
  try {
    const response = await api.post('/auth/sign-in', data);
    return response.data;
  } catch(error) {
    let message;
    if(error instanceof AxiosError) {
      message = error.response?.data.message;
    }
    throw new Error(message || 'Something went wrong');
  }
}
