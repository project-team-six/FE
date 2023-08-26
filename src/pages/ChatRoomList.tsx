import { fetchMyChatRoom, addChatRoom } from "../api/chatApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { pushNotification } from "../utils/notification";
import { chatRoomType } from "../types/chatType";
import { useNavigate } from "react-router";

const ChatRoomList = () => {
    const navigate = useNavigate();

    // 전체 조회
    const { data: myRooms, isLoading, isError } = useQuery(["myRooms"], fetchMyChatRoom);
    
    const queryClient = useQueryClient();
	const commentAddMutation = useMutation(addChatRoom, {
		onSuccess: (res) => {
			queryClient.invalidateQueries(["myRooms"]);
		},
		onError: () => {
			pushNotification("채팅 실패", "error");
		},
	});

    if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

    return (
        <div>
            <button onClick={() => commentAddMutation.mutate()}>추가하기</button>
            <ul>
                {myRooms.map((room: chatRoomType) => {
                    return (
                    <li>
                        <span>{room.name}</span>
                        <button onClick={() => {navigate(`/chatroom/${room.roomId}`)}}>입장하기</button>
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default ChatRoomList;