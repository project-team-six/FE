import axios, { Axios, AxiosError } from "axios";
import { User } from "../types/signIn";
import { findIdType, findPwType } from "../types/findUser";

const instance: Axios = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

export const signUp = async (newUserInfo: FormData) => {
	const response = await instance.post("/auth/signup", newUserInfo, {
		headers: { "Context-Type": "multipart/form-data" },
	});
	return response;
};

export const signIn = async (user: User) => {
	const response = await instance.post(`/auth/login`, user, {
		headers: { "Content-Type": "application/json" },
	});
	return response;
};

export const findID = async (user: findIdType) => {
	const response = await instance.post("/auth/findemail", user);
	return response;
};

export const findPassword = async (user: findPwType) => {
	const response = await instance.post("/auth/findpassword", user);
	return response;
};