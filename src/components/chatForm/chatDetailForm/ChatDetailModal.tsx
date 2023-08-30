import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchChatRoom } from "../../../api/chatApi";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import * as S from "./style";
import { chatBack, chatClose, chatPhotoAdd, chatSend } from "../../../asstes/asstes";
import ChatMessageForm from "./chatMessageForm/ChatMessageForm";

const ChatDetailModal = ({roomId, isFeed, modalState, modalHandle, preModalState, setPreModalState}: {roomId: string, isFeed: boolean, modalState: boolean, modalHandle: (value: boolean) => void, preModalState?: boolean, setPreModalState?: (value: boolean) => void}) => {
    // 채팅방 정보
    const { data: room, isLoading, isError } = useQuery(["room"], ()=>fetchChatRoom(roomId)); 

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

    // 메시지 입력
    const [inputValue, setInputValue] = useState<string>("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value) };

    // 메시지 전송
    const queryClient = useQueryClient();
    const [isRequestSend, setIsRequestSend] = useState<boolean>(false);
    const handleSendMsg = () => {
        if (client.current && inputValue.trim() !== "") {
            client.current!.send('/pub/chat/message', {Authorization: accessToken}, JSON.stringify({type:"TALK" ,roomId: roomId, message: inputValue}));
            setIsRequestSend(true);
            queryClient.invalidateQueries(["messages", isRequestSend]);
            setInputValue("");
        }
    };

    // enter 눌렀을 때 관리 (입력된 내용이 있으면 댓글 등록)
	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault(); 
			handleSendMsg();
		}
	};

    // 모달 닫기
    const handleClickClose = () => {
        setInputValue("");
        if (setPreModalState) setPreModalState(!preModalState)
        else modalHandle(!modalState);
    };

    if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

    const roomData = room?.data;
    return (
        <div>
            {modalState && room && 
                <S.ModalLayout>
                    <S.ChatLayout>
                        <S.HeaderSection>
                            {isFeed ? <button></button> : <S.Button onClick={()=> modalHandle(!modalState)}><img src={chatBack} alt="back"/></S.Button>}
                            <S.HeaderSpanDiv>
                                <S.Span fontSize={16} fontWeight="700">{roomData?.name}</S.Span>
                                <br />
                                <S.Span fontSize={11} fontWeight="400" color="A9A9A9">{roomData?.participants[1]}</S.Span>
                            </S.HeaderSpanDiv>
                            <S.Button onClick={() => handleClickClose()}><img src={chatClose} alt="close"/></S.Button>
                        </S.HeaderSection>
                        <S.ContentSection>
                            <ChatMessageForm roomId={roomId} roomData={roomData} isRequestSend={isRequestSend}/>
                        </S.ContentSection>
                        <S.InputSection>
                            <S.InputButton><img src={chatPhotoAdd} alt="photoAdd"/></S.InputButton>
                            <S.Input type="text" value={inputValue} onChange={handleChange} placeholder="메시지를 입력하세요." onKeyPress={handleKeyPress}/>
                            <S.InputButton onClick={() => handleSendMsg()}><img src={chatSend} alt="send"/></S.InputButton>
                        </S.InputSection>
                    </S.ChatLayout>
                </S.ModalLayout>
            }
        </div>
    )
}

export default ChatDetailModal;