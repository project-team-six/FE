import { useQuery } from "react-query";
import { fetchChatMessages, fetchChatRoom } from "../../api/chatApi";
import { useEffect, useRef } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import ChatRoomInputForm from "./chatRoomInputForm/ChatRoomInputForm";
import { chatRoomMessageType } from "../../types/chatType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import * as S from "./style";

const ChatRoomForm = ({roomId}: {roomId: string}) => {
    // 상세 조회
    const { data: room } = useQuery(["room"], () => fetchChatRoom(roomId));
    const roomName = room?.data.name; // 채팅방 이름

    // 내용 조회
    const { data: messageList, isLoading, isError } = useQuery(["messageList"], () => fetchChatMessages(roomId));
    const username = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.nickname;
	});

    // 연결
    const client = useRef<CompatClient>();
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1'); // 사용자 토큰

    // SockJS 연결 생성
    const socket = new SockJS("https://soubun2.shop/ws-stomp");
    useEffect(() => {
        // Stomp 클라이언트 생성 및 연결
        const stompClient = Stomp.over(socket);
        stompClient.connect(
            {
                Authorization: accessToken,
            },
            () => {
                client.current = stompClient;
                client.current.subscribe(
                    `/sub/chat/room/${roomId}`,
                    () => {},
                    {
                        Authorization: accessToken,
                        simpDestination: roomId,
                    }
                );
            }
        );

        return () => {
            if (client.current) client.current.disconnect(); // 컴포넌트가 언마운트되면 연결 종료
        };
    }, [roomId]);

    if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

    return (
        <div>
            <section>
                <span>{roomName}</span>
            </section>
            <section>
                <ul>
                    {messageList?.data.map((m: chatRoomMessageType) => {
                        return (
                            <S.MessageBox>
                                <S.MessageDiv textAlign={username===m.sender ? "right" : "left"}>
                                    <div>종류 : {username===m.sender ? "발신" : "수신"}</div>
                                    <div>내용 : {m.message}</div>
                                    <div>작성자 : {m.sender}</div>
                                    <br />
                                </S.MessageDiv>
                            </S.MessageBox>
                        )
                    })}
                </ul>
            </section>
            <section>
                <ChatRoomInputForm client={client} token={accessToken} roomId={roomId}/>
            </section>
        </div>
    )
}

export default ChatRoomForm;