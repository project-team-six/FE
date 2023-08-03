import axios, {Axios} from 'axios';

const instance: Axios = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

export const signUp = async (newUserInfo: FormData) => {
	const response = await instance.post("/auth/signup", newUserInfo, {
		headers: { "Context-Type": "multipart/form-data" },
	});
	return response;
};