import { instance } from "./instance";
import { useQueryClient } from "react-query";

export const fetchAlert = async () => {
	const response = await instance.get(`/notification/all`);
	return response.data;
};

export const deleteAlert = async (notificationId: number) => {
	const response = await instance.delete(`/notification/${notificationId}`);
	return response;
};
