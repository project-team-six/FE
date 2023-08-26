import { commentDeleteType, commentEditType, commentPostType } from "../types/feedType";
import { instance } from "./instance";

// 게시물
export const fetchFeed = async (postId: number) => {
	// 게시물 상세 조회
	const response = await instance.get(`/post/${postId}`);
	console.log(response)
	return response.data.data;
};

export const deadlineFeed = async (postId: number) => {
	// 게시물 수정
	const response = await instance.post(`/post/${postId}`);
	return response.data.data;
};

export const postFeed = async (newFeed: FormData) => {
	// 게시물 등록
	const response = await instance.post("/post", newFeed, {
		headers: { "Context-Type": "multipart/form-data" },
	});
	return response;
};

export const editFeed = async (postId: number, newFeed: FormData) => {
	// 게시물 수정
	const response = await instance.put(`/post/${postId}`, newFeed, {
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

// 댓글
export const postComment = async (payload: commentPostType) => {
	// 댓글 등록
	const response = await instance.post(`/post/${payload.postId}/comment`, payload.commentContent);
	return response;
};

export const fetchComments = async (postId: number) => {
	// 댓글 전체 조회
	const response = await instance.get(`/post/${postId}/comment`);
	return response.data.data;
};

export const editComment = async (payload: commentEditType) => {
	const response = await instance.put(`post/${payload.postId}/comment/${payload.commentId}`, payload.commentContent);
	return response;
};

export const deleteComment = async (payload: commentDeleteType) => {
	const response = await instance.delete(`post/${payload.postId}/comment/${payload.commentId}`);
	return response;
};

export const postPin = async (postId: number) => {
	const response = await instance.post(`/post/${postId}/pin`);
	return response;
};
