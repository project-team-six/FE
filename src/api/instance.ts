import axios, { AxiosInstance } from "axios";
import { useDispatch } from "react-redux";
import { setDecodeToken } from "../redux/modules/user";
import { deleteToken } from "../utils/deleteToken";

export const instance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(async (config) => {
	const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
	const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

	if (accessToken && refreshToken) {
		config.headers.Authorization = accessToken;
		config.headers.RefreshToken = refreshToken;
	}
	if (accessToken === undefined) {
		// accessToken이 undefined 뜰때 토큰 삭제
		deleteToken("accessToken");
		// 쿠키에서도 삭제
		document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

			deleteToken("accessToken"); // 기존 토큰 삭제
			document.cookie = `accessToken=${newToken}; path=/;`;

			const dispatch = useDispatch();
			config.headers.Authorization = newToken;
			dispatch(setDecodeToken(newToken));

			// 실패했던 기존 request 재시도
			return instance(config);
		}

		return Promise.reject(error);
	}
);
