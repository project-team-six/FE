import { useQuery, useQueryClient } from "react-query";
import { deleteChatRoom, fetchMyChatRoom } from "../../../api/chatApi";
import { chatRoomType } from "../../../types/chatType";
import * as S from "./style";
import { chatDelete, profileImg } from "../../../asstes/asstes";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";

const ChatListForm = ({setSelectChat}: {setSelectChat: (value: string) => void}) => {
    const { data: myRooms, isLoading, isError } = useQuery(["myRooms"], fetchMyChatRoom);

    // 채팅방 삭제
	const queryClient = useQueryClient();
	const handleClickDeleteBtn = (roomId: string) => {
		deleteChatRoom(roomId).then(() => {
			queryClient.invalidateQueries(["myRooms"]);
		});
	}; 

    if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

    return (
        <ul>
            {myRooms && (myRooms.data.map((room: chatRoomType) => {
                const profile = room.titleImageUrl !== "nonImage" ? room.titleImageUrl : profileImg
                
                const time = formatRelativeTime(room.lastMessageTime);
                return (
                    <S.Li key={room.roomId}>
                        <S.ChatButton onClick={() => setSelectChat(room.roomId)}>
                            <S.ProfileImg src={profile} alt="profile"/>
                            <S.ChatDiv>
                                <S.ChatSpanDiv>
                                    <S.SpanDiv><S.Span fontSize="1" fontWeight="700">{room.name}</S.Span></S.SpanDiv>
                                    <S.Span fontSize="0.5" fontWeight="400" color="B1B1B1">{time}</S.Span>
                                </S.ChatSpanDiv>
                                <S.Span fontSize="1" fontWeight="500" color="7C7C7C">{room.lastMessage}</S.Span>
                            </S.ChatDiv>
                        </S.ChatButton>
                        <S.ChatDeleteButton onClick={() => handleClickDeleteBtn(room.roomId)}>
                            <img src={chatDelete} alt="chatDelete"/>
                        </S.ChatDeleteButton>
                    </S.Li>
                )
            }))}
        </ul>
    );
}

export default ChatListForm
