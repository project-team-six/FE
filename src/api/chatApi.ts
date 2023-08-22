import { instance } from "./instance";

// 채팅방
export const fetchChatRooms = async () => { // 전체 조회
	const response = await instance.get("/chat/rooms");
	return response.data;
};

export const addChatRoom = async () => { // 생성
    const response = await instance.post("/chat/room", {name: "chat?"});
	return response;
};

export const enterChatRoom = async (roomId: string) => { // 입장
    const response = await instance.get(`/chat/room/enterA/${roomId}`);
	return response;
};
