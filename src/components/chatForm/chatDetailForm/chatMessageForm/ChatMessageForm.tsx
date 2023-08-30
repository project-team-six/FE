import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchChatRoomMsg } from "../../../../api/chatApi";
import { chatRoomMessageType, chatRoomType } from "../../../../types/chatType";
import { formatRelativeTime } from "../../../../utils/formatRelativeTime";
import { RootState } from "../../../../redux/config/configStore";
import * as S from "./style";
import { profileImg } from "../../../../asstes/asstes";

const ChatMessageForm = ({roomId, roomData, isRequestSend}: {roomId: string, roomData: chatRoomType, isRequestSend: boolean}) => {
    // 이전 채팅 메시지 조회
    const { data: messages } = useQuery(["messages", isRequestSend], ()=>fetchChatRoomMsg(roomId)); 

    // 로그인된 계정 정보
    const nickname: string = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.nickname;
	});

    return (
        <ul>
            {roomData && messages && messages.map((m: chatRoomMessageType) => {
                const profile = m.profileImageUrl === null ? profileImg : m.profileImageUrl; // 발신자 프로필 이미지 URL
                const isEnter = m.type === "ENTER" || m.type === "QUIT"; // 메시지 종류: 알림
                const time = formatRelativeTime(m.createdAt); // 메시지 생성 일시
                const isSend = m.sender === nickname; // 메시지 종류: 발신/수신
                
                return (
                    <div>
                        {!isEnter? 
                        <div>
                            {isSend?
                            <S.Li>
                                <S.SendBox>
                                    <S.MessageBox padding="10px 7px 10px 10px" $backgroundColor="2BB673" borderRadius="15px 0 15px 15px">
                                        <S.Span fontSize={13} fontWeight="400" color="616161">{m.message}</S.Span>
                                    </S.MessageBox>
                                </S.SendBox>
                            </S.Li>
                            :<S.Li>
                                <S.ProfileImg src={profile} alt="profile"/>
                                <div>
                                    <S.Span fontSize={14} fontWeight="700">{m.sender}</S.Span>
                                    <S.ReceiveBox>
                                        <S.MessageBox padding="10px 7px 10px 10px" $backgroundColor="F1F1F1" borderRadius="0 15px 15px 15px">
                                            <S.Span fontSize={13} fontWeight="400" color="616161">{m.message}</S.Span>
                                        </S.MessageBox>
                                        <S.TimeBox>
                                            <S.Span fontSize={9} fontWeight="400" color="959595">{time}</S.Span>
                                        </S.TimeBox>
                                    </S.ReceiveBox>
                                </div>
                            </S.Li>}
                        </div>
                        :<S.NotificationLi>
                            <S.Span fontSize={11} fontWeight="400" color="8B8B8B">{m.createdAt.split("T")[0]}</S.Span>
                            <S.Span fontSize={11} fontWeight="400" color="8B8B8B">{m.message}</S.Span>
                        </S.NotificationLi>}
                    </div>
                )
            })}
        </ul>
    )
}

export default ChatMessageForm;