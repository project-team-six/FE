import { instance } from "./instance";

export const fetchAlert = async () => {
	const response = await instance.get(`/notification/all`);
	return response.data;
};

export const allDeleteAlert = async () => {
	const response = await instance.delete(`/notification/allDelete`);
	return response;
};
