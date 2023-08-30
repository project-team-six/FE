import { instance } from "./instance";

// 채팅방
// 내 채팅방 조회
export const fetchMyChatRoom = async () => {
	const response = await instance.get("/chat/rooms/user");
	return response;
};

// 채팅 요청
export const enterChatRoom = async (roomId: string) => {
	const response = await instance.post(`/chat/room/post/${roomId}`);
	return response;
};

// 채팅 정보 조회
export const fetchChatRoom = async (roomId: string) => {
	const response = await instance.get(`/chat/room/${roomId}`);
	return response;
};

// 채팅 메시지 조회
export const fetchChatRoomMsg = async (roomId: string) => {
	const response = await instance.get(`/chat/${roomId}`);
	return response.data.content.reverse();
};

export const deleteChatRoom = async (roomId: string) => {
	const response = await instance.delete(`/chat/room/post/${roomId}`);
	return response;
};