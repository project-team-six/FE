import { instance } from "./instance";
import { locationType } from "../types/feedType";
import { User, findEmailType, findPwType } from "../types/userType";

export const signUp = async (newUserInfo: FormData) => {
	const response = await instance.post("/auth/signup", newUserInfo, {
		headers: { "Context-Type": "multipart/form-data" },
	});
	return response;
};

export const signIn = async (user: User) => {
	const response = await instance.post("/auth/login", user);
	return response;
};

export const signOut = async () => {
	const response = await instance.post("/auth/logout");
	return response;
};

// 지역 설정
export const setUserLocation = async (userLocation: locationType) => {
	const response = await instance.put("/auth/location", userLocation);
	return response;
};

export const getMyPage = async (userId: Number) => {
	const response = await instance.get(`/auth/mypage/${userId}`);
	return response.data;
};

export const putMyPageEdit = async (userId: Number, nickname: string, phoneNumber: string) => {
	const data = { nickname, phoneNumber };
	const response = await instance.put(`/auth/mypage/${userId}`, data);
	return response;
};

export const putMyPagePasswordEdit = async (userId: Number, password: string) => {
	const data = { password };
	const response = await instance.put(`/auth/mypagePassword/${userId}`, data);
	return response;
};

export const putMyPageEditImage = async (userId: Number, formData: FormData) => {
	const response = await instance.put(`/auth/mypageImage/${userId}`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response;
};

export const postPopularity = async (receiverUserId: number) => {
	const response = await instance.post(`/popularity/${receiverUserId}`);
	return response;
};

export const findUserEmail = async (user: findEmailType) => {
	const response = await instance.post("/auth/findemail", user);
	return response;
};

export const findPassword = async (user: findPwType) => {
	const response = await instance.post("/auth/findpassword", user);
	return response;
};
