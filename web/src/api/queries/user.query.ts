import { AxiosError } from "axios";
import api from "../../utils/api.util";
import { IUser } from "../../interfaces/user.interface";

export const getAllUsers = async (): Promise<IUser[]> => {
	try {
		const response = await api.get('/api/v1/users');
		return response.data.users;
	} catch (error) {
		let message;
		if (error instanceof AxiosError) {
			message = error.response?.data.message;
		}
		throw new Error(message || 'Something went wrong')
	}
}
