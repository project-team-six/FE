import axios, { Axios } from "axios";
import { User } from "../types/signIn";

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