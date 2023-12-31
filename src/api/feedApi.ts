import { commentDeleteType, commentEditType, commentPostType } from "../types/feedType";
import { instance } from "./instance";

// 게시물 전체 조회
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

// 게시물
export const fetchFeed = async (postId: number) => {
	// 게시물 상세 조회
	const response = await instance.get(`/post/${postId}`);
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

export const deleteFeed = async (postId: number) => {
	// 게시물 삭제
	const response = await instance.delete(`/post/${postId}`);
	return response;
}

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
	// 댓글 수정
	const response = await instance.put(`post/${payload.postId}/comment/${payload.commentId}`, payload.commentContent);
	return response;
};

export const deleteComment = async (payload: commentDeleteType) => {
	// 댓글 삭제
	const response = await instance.delete(`post/${payload.postId}/comment/${payload.commentId}`);
	return response;
};

// 게시물 찜하기
export const postPin = async (postId: number) => {
	const response = await instance.post(`/post/${postId}/pin`);
	return response;
};

//게시물 신고
export const postReport = async (postId: number, data:FormData) => {
	const response = await instance.post(`post/report/${postId}`, data, {
		headers: { "Context-Type": "multipart/form-data" },
	})
	return response;
}
//댓글 신고
export const commentReport = async (postId:number, commentId:number, data:FormData) => {
	const response = await instance.post(`post/${postId}/comment/report/${commentId}`, data, {
		headers: { "Context-Type": "multipart/form-data" },
	});
	return response;
}