import axios, { Axios } from "axios";
import { locationType } from "../types/feedType";

const instance: Axios = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use((config) => {
	const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
	accessToken && (config.headers.Authorization = accessToken);
	return config;
});

export const setUserLocation = async (userLocation: locationType) => {
	const response = await instance.put("/auth/location", userLocation);
	return response;
};

export const postFeed = async (newFeed: FormData) => {
	const response = await instance.post("/post", newFeed, {
		headers: { "Context-Type": "multipart/form-data" },
	});
	return response;
};

export const editFeed = async (postId: number, newFeed: FormData) => {
	const response = await instance.post(`/post/${postId}`, newFeed, {
		headers: { "Context-Type": "multipart/form-data" },
	});
	return response;
};

export const fetchFeed = async (
	location: string,
	category: string,
	title: string,
	username: string,
	status: string,
	page: Number
) => {
	const response = await instance.get(
		`/post?location=${location}&category=${category}&title=${title}&username=${username}&status=${status}&page=${page}`
	);
	return response;
};
