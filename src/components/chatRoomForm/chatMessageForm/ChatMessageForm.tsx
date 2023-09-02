import { useQuery } from "react-query";
import useRoomQuery from "../../../hooks/useRoomQuery";
import { fetchChatRoomMsg } from "../../../api/chatApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/config/configStore";
import { chatRoomMessageType } from "../../../types/chatType";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";
import * as S from "./style";
import { profileImg } from "../../../asstes/asstes";

const ChatMessageForm = ({selectChat}: {selectChat: string}) => {
    const roomInfo = useRoomQuery(selectChat);

    // 이전 채팅 메시지 조회
	const { data: messages } = useQuery(["messages"], () => fetchChatRoomMsg(selectChat));

	// 로그인된 계정 정보
	const nickname: string = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.nickname;
	});

    return (
        <S.MainContentWrapper>
            {roomInfo && messages &&
            <S.Ul>
                {messages.map((msg: chatRoomMessageType, index: number) => {
                    const profile = msg.profileImageUrl === "nonImage" ? profileImg : msg.profileImageUrl; // 발신자 프로필 이미지 URL
					const isImage = msg.type === "IMAGE"; // 이미지
					const time = formatRelativeTime(msg.createdAt); // 메시지 생성 일시
					const isSend = msg.sender === nickname; // 메시지 종류: 발신/수신

                    return (
                        <S.Li key={index}>
                            {isSend? 
                            <S.SendBox> 
                                {/* 발신 */}
                                <S.SpanBox $backgroundColor="2BB673" borderRadius="15px 0 15px 15px">
                                    {isImage?
                                    <S.Img src={msg.imageUrl} alt="imageUrl"/>
                                    :<S.Span fontSize={13} fontWeight="500" color="FFFFFF">{msg.message}</S.Span>
                                    }
                                </S.SpanBox>
                            </S.SendBox> 
                            :<S.ReceiveBox>
                                {/* 수신 */}
                                <S.ProfileImg src={profile} alt="profile"/>
                                <S.ReceiveContentBox>
                                    <span>{msg.sender}</span>
                                    <S.MsgInfoBox>
                                        <S.SpanBox $backgroundColor="F1F1F1" borderRadius="0 15px 15px 15px">
                                            {isImage ?
                                            <S.Img src={msg.imageUrl} alt="imageUrl"/>
                                            :<S.Span fontSize={13} fontWeight="500" color="616161">{msg.message}</S.Span>}
                                        </S.SpanBox>
                                        <S.TimeBox><S.Span fontSize={9} fontWeight="400">{time}</S.Span></S.TimeBox>
                                    </S.MsgInfoBox>
                                </S.ReceiveContentBox>
                            </S.ReceiveBox>}
                        </S.Li>
                    )
                })}
            </S.Ul>}
        </S.MainContentWrapper>
    )
}

export default ChatMessageForm;
