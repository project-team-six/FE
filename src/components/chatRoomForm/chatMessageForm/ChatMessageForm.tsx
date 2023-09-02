import { useQuery } from "react-query";
import useRoomQuery from "../../../hooks/useRoomQuery";
import { fetchChatRoomMsg } from "../../../api/chatApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/config/configStore";
import { chatRoomMessageType } from "../../../types/chatType";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";
import * as S from "./style";
import { profileImg } from "../../../asstes/asstes";
import { useEffect } from "react";

const ChatMessageForm = ({ selectChat }: { selectChat: string }) => {
	const roomInfo = useRoomQuery(selectChat);

    // 이전 채팅 메시지 조회
	const { data: messages, refetch } = useQuery(["messages"], () => fetchChatRoomMsg(selectChat));
    useEffect(() => {
        const timer = setInterval(() => {
            refetch();
        }, 2000); // 3초마다 실행

        return () => {
            clearInterval(timer);
        };
    }, []);

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