import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { addPhotoChatRoom } from "../../../api/chatApi";
import { chatRoomMessageType } from "../../../types/chatType";
import * as S from "./style";
import { chatPhotoAdd, chatSend, trashIcon } from "../../../asstes/asstes";
import { getToken } from "../../../utils/getToken";

const ChatInputForm = ({selectChat, setMsgList}: {selectChat: string, setMsgList:(value: chatRoomMessageType) => void}) => {
    // 연결
    const client = useRef<CompatClient>();
    const accessToken = getToken("accessToken");
    
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
                    `/sub/chat/room/${selectChat}`,
                    (message) => {
                        var recv = JSON.parse(message.body);
                        setMsgList(recv);
                    },
                    {
                        Authorization: accessToken,
                        simpDestination: selectChat,
                    }
                );
            }
        );
        return () => {
            if (client.current) client.current.disconnect(); // 컴포넌트가 언마운트되면 연결 종료
        };
    }, [selectChat]);

    // 메시지: 텍스트
    const [inputValue, setInputValue] = useState<string>("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

    // 메시지: 사진 추가
    const [images, setImages] = useState<File | undefined>(undefined); // 이미지
    const [preview, setPreview] = useState<string | undefined>(undefined); // 썸네일
    const changeImages = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        setImages(file);
        // 썸네일
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(event) {
                if (event.target) setPreview(event.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // 메시지: 사진 삭제
    const handleClickRest = () => {
        setImages(undefined);
        setPreview(undefined);
    };

    const feedAddMutation = useMutation(addPhotoChatRoom, {
		onSuccess: (response) => {
            const url = response.data.data;
            client.current!.send("/pub/chat/message", {Authorization: accessToken}, JSON.stringify({type:"IMAGE" ,roomId: selectChat, message: inputValue, imageUrl: url}));
        },
	});

    // 메시지 전송
    const handleSendMsg = () => {
        let shouldInvalidateQueries = false;
        // 이미지
        if (images !== undefined) {
            const formData = new FormData();
            formData.append("file", images);
            feedAddMutation.mutate(formData);
            shouldInvalidateQueries = true;
        }

        // 텍스트
        if (client.current && inputValue.trim() !== "") {
            client.current!.send("/pub/chat/message", {Authorization: accessToken,}, JSON.stringify({type:"TALK" ,roomId: selectChat, message: inputValue}));
            shouldInvalidateQueries = true;
        }

        if (shouldInvalidateQueries) {
            handleClickRest();
            setInputValue("");
        }
    };

    // enter 눌렀을 때 관리 (입력된 내용이 있으면 댓글 등록)
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault(); 
			handleSendMsg();
		}
	};

    return (
        <S.MainContentWrapper>
            {images !== undefined?
            <S.PreviewDiv>
                    <S.PreviewImg src={preview} alt="images"/>
                    <S.PreviewDeleteButton onClick={handleClickRest}><img src={trashIcon} alt="trashIcon"/></S.PreviewDeleteButton>
            </S.PreviewDiv>
            :<></>}
            <S.TextDiv>
                <S.PhotoLabel htmlFor="fileInput"><img src={chatPhotoAdd} alt="chatPhotoAdd"/></S.PhotoLabel>
                <S.InputPhoto type="file" id="fileInput" accept=".jpg, .jpeg, .png" onChange={changeImages}/>
                <S.Input type="text" value={inputValue} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="메시지를 입력하세요."/>
                <S.Button onClick={handleSendMsg}><img src={chatSend} alt="chatSend"/></S.Button>
            </S.TextDiv>
        </S.MainContentWrapper>
    )
}

export default ChatInputForm;