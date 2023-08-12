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

export const getCommentList = async (postId: number) => {
    const res = await instance.get(`/post/${postId}/comment`);
    return res.data.data;
};

export const postComment = async (postId: number) => {
    const req = await instance.post(`/post/${postId}/comment`);
    return req;
}

export const putComment = async (postId: number, commentId:number) => {
    const req = await instance.put(`/post/${postId}/comment/${commentId}`);
    return req;
}

export const deleteComment = async (postId: number, commentId:number) => {
    const req = await instance.delete(`/post/${postId}/comment/${commentId}`);
    return req;
}