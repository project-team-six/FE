import axios, { Axios } from "axios";
import { locationType } from "../types/feedType";

const instance: Axios = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

// 리프레시 토큰 재발급 로직 추가
const refreshAccessToken = async () => {
	const refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)newAccessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
	if (refreshToken) {
		try {
			const response = await instance.post("/auth/refresh", { refreshToken });
			const newAccessToken = response.data.accessToken;

			// 새로 발급받은 액세스 토큰을 쿠키나 로컬 스토리지에 저장
			// 이 부분은 실제로 액세스 토큰을 저장하는 방식에 따라 달라질 수 있습니다.
			// 예를 들어, 쿠키를 사용한다면 document.cookie를 활용할 수 있습니다.

			return newAccessToken;
		} catch (error) {
			// 리프레시 토큰이 만료되거나 에러가 발생한 경우,
			// 로그아웃 처리 등을 할 수 있습니다.
			console.error("Error refreshing access token:", error);
			// 로그아웃 등의 처리를 추가하고, 해당 함수에서 null이나 에러를 반환하는 등의 처리를 합니다.
			return null;
		}
	} else {
		// 리프레시 토큰이 없는 경우에도 마찬가지로 적절한 처리를 합니다.
		// 예를 들어, 로그인 페이지로 리디렉션하거나, 에러 처리 등이 있을 수 있습니다.
		console.error("Refresh token not found.");
		return null;
	}
};

instance.interceptors.request.use(async (config) => {
	const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
	if (accessToken) {
		config.headers.Authorization = accessToken;
	} else {
		// 액세스 토큰이 없는 경우, 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급 시도
		const newAccessToken = await refreshAccessToken();
		if (newAccessToken) {
			config.headers.Authorization = newAccessToken;
		}
	}
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

export const fetchFeedList = async (
	location: string,
	category: string,
	status: string,
	titleOrContent: string,
	page: number
) => {
	const response = await instance.get(
		`/post?location=${location}&category=${category}&status=${status}&titleOrContent=${titleOrContent}&page=${page}`
	);
	return response.data.data;
};
