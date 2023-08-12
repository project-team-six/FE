import axios, { Axios } from "axios";

const instance: Axios = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use((config) => {
    const accessToken =
        document.cookie &&
        document.cookie
            .split(";")
            .filter((cookies) => cookies.includes("accessToken"))[0]
            ?.split("=")[1];
    if (accessToken) config.headers.Authorization = accessToken;
    return config;
});

export const getListFeed = async (postId: number) => {
    const res = await instance.get(`/post/${postId}`);
    return res.data.data;
};
