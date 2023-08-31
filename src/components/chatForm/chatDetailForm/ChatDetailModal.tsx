import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addPhotoChatRoom, fetchChatRoom } from "../../../api/chatApi";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import * as S from "./style";
import { chatBack, chatClose, chatPhotoAdd, chatSend, trashIcon } from "../../../asstes/asstes";
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

    // 메시지: 텍스트
    const [inputValue, setInputValue] = useState<string>("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value) };

    // 메시지: 사진
    const [images, setImages] = useState<File | undefined>(undefined); // 이미지
    const [preview, setPreview] = useState<string | undefined>(undefined); // 썸네일
    const changeImages = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        setImages(file);
        // 썸네일
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                if (event.target) setPreview(event.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleClickRest = () => {
        setImages(undefined);
        setPreview(undefined);
    };
    
    const queryClient = useQueryClient();
    const feedAddMutation = useMutation(addPhotoChatRoom, {
		onSuccess: (response) => {
            const url = response.data.data;
            client.current!.send('/pub/chat/message', {Authorization: accessToken}, JSON.stringify({type:"IMAGE" ,roomId: roomId, message: inputValue, imageUrl: url}));
            setIsRequestSend(true);
            handleClickRest();
			queryClient.invalidateQueries(["messages", isRequestSend]);
		},
	});

    const handleSendPhoto = () => {
        if (images !== undefined) {
            const formData = new FormData();
            formData.append("file", images);
            feedAddMutation.mutate(formData);
        }
    };

    // 메시지 전송
    const [isRequestSend, setIsRequestSend] = useState<boolean>(false);
    const handleSendMsg = () => {
        if (client.current && inputValue.trim() !== "") {
            client.current!.send('/pub/chat/message', {Authorization: accessToken,}, JSON.stringify({type:"TALK" ,roomId: roomId, message: inputValue}));
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
                                <S.ParticipantDiv><S.Span fontSize={16} fontWeight="700">{roomData?.name}</S.Span></S.ParticipantDiv>
                                <S.ParticipantDiv><S.Span fontSize={11} fontWeight="400" color="A9A9A9">{roomData?.participants.join(", ")}</S.Span></S.ParticipantDiv>
                            </S.HeaderSpanDiv>
                            <S.Button onClick={() => handleClickClose()}><img src={chatClose} alt="close"/></S.Button>
                        </S.HeaderSection>
                        <S.ContentSection>
                            <ChatMessageForm roomId={roomId} roomData={roomData} isRequestSend={isRequestSend}/>
                        </S.ContentSection>
                        {images === undefined? 
                        <S.InputSection>
                            <S.PhotoLabel htmlFor="fileInput">
                                <img src={chatPhotoAdd} alt="이미지"/>
                            </S.PhotoLabel>
                            <S.InputPhoto type="file" id="fileInput" onChange={changeImages} accept=".jpg, .jpeg, .png"/>
                            <S.Input type="text" value={inputValue} onChange={handleChange} placeholder="메시지를 입력하세요." onKeyPress={handleKeyPress}/>
                            <S.InputButton onClick={() => handleSendMsg()}><img src={chatSend} alt="send"/></S.InputButton>
                        </S.InputSection>
                        :<S.PhotoSection>
                            <S.DeleteButtonDiv>
                                <S.PreviewImg src={preview} alt="preview"/> 
                                <S.DeleteButton onClick={handleClickRest}>
                                        <img src={trashIcon} alt="trashIcon"/>
                                </S.DeleteButton>
                            </S.DeleteButtonDiv>
                            <S.SendPhotoButton onClick={() => handleSendPhoto()}><img src={chatSend} alt="send"/></S.SendPhotoButton>
                        </S.PhotoSection>}
                    </S.ChatLayout>
                </S.ModalLayout>
            }
        </div>
    )
}

export default ChatDetailModal;