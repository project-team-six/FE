import axios, { AxiosInstance } from "axios";
import { deleteToken } from "../utils/deleteToken";
import { getToken } from "../utils/getToken";
import { saveToken } from "../utils/saveToken";

export const instance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(async (config) => {
	const accessToken = getToken("accessToken");
	const refreshToken = getToken("refreshToken");

	if (accessToken && refreshToken) {
		config.headers.Authorization = accessToken;
		config.headers.RefreshToken = refreshToken;
	} else if (!accessToken) {
		deleteToken("accessToken"); //accessToken 값 undefined 뜰때 쿠키에서 삭제
	}

	return config;
});

// 토큰 갱신
instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const { response } = error; // 디스트럭처링을 통해 response를 가져옵니다.

		if (!response) {
			// response가 없을 경우에 대한 예외 처리
			return Promise.reject(error);
		}

		const { status, headers } = response;

		if (status === 401) {
			const config = { ...error.config };
			const newToken = headers.authorization;
			if (newToken) {
				deleteToken("accessToken"); // 기존 토큰 삭제
				saveToken("accessToken", newToken); // 세션에 accessToken 저장
				
				config.headers.Authorization = newToken;

				// 실패했던 기존 request 재시도
				return instance(config);
			}
		}

		return Promise.reject(error);
	}
);
