import axios, { AxiosInstance } from "axios";
import { deleteToken } from "../utils/deleteToken";
import { getToken } from "../utils/getToken";
import { setDecodeToken } from "../redux/modules/user";

export const instance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(async (config) => {
	const accessToken = getToken("accessToken");
	if (accessToken) {
		config.headers.Authorization = accessToken;
	} else {
		deleteToken("accessToken"); //accessToken 값 undefined 뜰때 쿠키에서 삭제
	}

	const refreshToken = getToken("refreshToken");
	if (refreshToken) config.headers.RefreshToken = refreshToken;

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
				sessionStorage.setItem("accessToken", newToken); // 세션에 토큰 저장
				setDecodeToken(newToken); // 리덕스에 토큰 정보 저장
				config.headers.Authorization = newToken;

				// 실패했던 기존 request 재시도
				return instance(config);
			}
		}

		return Promise.reject(error);
	}
);
