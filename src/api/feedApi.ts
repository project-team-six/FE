import axios, {Axios} from 'axios';

const instance: Axios = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use((config) => {
	const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
	accessToken && (config.headers.Authorization = accessToken);
	return config;
});

export const postFeed = async (newFeed: FormData) => {
	const response = await instance.post("/post", newFeed, {
        headers: { "Context-Type": "multipart/form-data" },
    });
    return response;
};

export const editFeed = async (newFeed: FormData) => {
	// const response = await instance.post(`/post/${postId}`, newFeed, {
    //     headers: { "Context-Type": "multipart/form-data" },
    // });
    // return response;
}