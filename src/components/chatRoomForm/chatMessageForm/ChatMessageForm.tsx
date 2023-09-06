import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import useRoomQuery from "../../../hooks/useRoomQuery";
import { RootState } from "../../../redux/config/configStore";
import { chatRoomMessageType } from "../../../types/chatType";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";
import { fetchChatRoomMsg } from "../../../api/chatApi";
import * as S from "./style";
import { profileImg } from "../../../asstes/asstes";

const ChatMessageForm = ({ selectChat, msgList, setMsgList }: { selectChat: string, msgList: chatRoomMessageType, setMsgList:(value: chatRoomMessageType)=>void}) => {
	const roomInfo = useRoomQuery(selectChat);

	// 로그인된 계정 정보
	const nickname: string = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.nickname;
	});

    const { data: messageList } = useQuery(["messages"], () => fetchChatRoomMsg(selectChat), {
        enabled: true,
    });
    const [messages, setMmessages] = useState<chatRoomMessageType[]>([]);
    useEffect(()=>{
        setMmessages(messages.reverse());
        setMmessages(messageList);
    }, [messageList]);
    
    useEffect(()=>{
        if (msgList) {
            const temps: chatRoomMessageType[] = [...messages];
            temps.push(msgList);
            setMmessages(temps);
        }
    }, [msgList]);
    
    return (
        <S.MainContentWrapper>
            {roomInfo && messages &&
            <S.Ul>
                {messages.map((msg: chatRoomMessageType, index: number) => {
                    const profile = msg.profileImageUrl === "nonImage" ? profileImg : msg.profileImageUrl; // 발신자 프로필 이미지 URL
                    const isImage = msg.type === "IMAGE"; // 이미지
                    const isENTER = msg.type === "ENTER" // 알림 (입장/퇴장)
                    const time = formatRelativeTime(msg.createdAt); // 메시지 생성 일시
                    const isSend = msg.sender === nickname; // 메시지 종류: 발신/수신

                    return (
                        <S.Li key={index}>
                            {isENTER?
                            <S.EnterBox>
                                <S.Span fontSize={11} fontWeight="400" color="8B8B8B">{time}</S.Span>
                                <S.Span fontSize={11} fontWeight="400" color="8B8B8B">{msg.message}</S.Span>
                            </S.EnterBox>
                            :<div>
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
                            </div>}
                        </S.Li>
                    )
                })}
            </S.Ul>}
        </S.MainContentWrapper>
    )
}

export default ChatMessageForm;