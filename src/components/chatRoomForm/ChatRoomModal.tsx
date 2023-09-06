import { useEffect, useRef, useState } from "react";
import ChatHeaderForm from "./chatHeaderForm/ChatHeaderForm";
import ChatListForm from "./chatListForm/ChatListForm";
import ChatMessageForm from "./chatMessageForm/ChatMessageForm";
import ChatInputForm from "./chatInputForm/ChatInputForm";
import { chatRoomMessageType } from "../../types/chatType";
import * as S from "./style";
import { chatBelow } from "../../asstes/asstes";

const ChatRoomModal = ({ postId, modalState, setModalState, modalHandle }: { postId: string, modalState: boolean, setModalState:(value: boolean)=>void, modalHandle: React.MouseEventHandler<HTMLDivElement>}) => {
    const toggleChat: React.MouseEventHandler = (event) => event.stopPropagation(); // 영역 안에서는 토글 안닫히게 하기
    const [selectChat, setSelectChat] = useState<string>(postId); // 선택한 채팅방 ID
    const [isFeed, setIsFeed] = useState<boolean>(postId.trim() !== ""); // 채팅 요청과 목록 요청 구분 값
    useEffect(() => {
        if (selectChat.trim() !== "") setIsFeed(true);
    }, [selectChat])

    // 스크롤 이벤트
    const targetRef = useRef<HTMLDivElement | null>(null);
    const [isFloat, setIsFloat] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          if (targetRef.current) {
            const scrollPosition = targetRef.current.scrollTop;
            if (scrollPosition >= targetRef.current.scrollHeight-500) setIsFloat(false);
            else setIsFloat(true);
          }
        };
        targetRef.current?.addEventListener("scroll", handleScroll);
        return () => {
            targetRef.current?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClickScrollButton = () => {
        if (targetRef.current) {
            targetRef.current.scrollTop = targetRef.current.scrollHeight;
        }
    };

    // 메시지 내용
    const [msgList, setMsgList] = useState<chatRoomMessageType>({
        createdAt: "",
        modifiedAt: "",
        roomId: "",
        imageUrl: "",
        message: "",
        messageId: 0,
        profileImageUrl: "",
        sender: "",
        type: "",
        userCount: 0
    });
    
    return (
        <div>
            {modalState && 
            (<S.ModalLayout onClick={modalHandle}>
                <S.ChatLayout onClick={toggleChat}>
                    <S.HeaderSection>
                        <ChatHeaderForm isFeed={isFeed} setModalState={setModalState} setIsFeed={setIsFeed} selectChat={selectChat} setSelectChat={setSelectChat}/>
                    </S.HeaderSection>
                    <S.MainSection ref={targetRef}>
                        {isFeed ? <ChatMessageForm selectChat={selectChat} msgList={msgList} setMsgList={setMsgList}/>: <ChatListForm setSelectChat={setSelectChat}/>}
                    </S.MainSection>
                    {isFloat ? <S.BelowButton show={isFloat} onClick={handleClickScrollButton}><img src={chatBelow} alt="chatBelow"/></S.BelowButton> : <></>}
                    {isFeed ? <S.InputSection><ChatInputForm selectChat={selectChat} setMsgList={setMsgList}/></S.InputSection> : <></>}
                </S.ChatLayout>
            </S.ModalLayout>)}
        </div>
    )
}

export default ChatRoomModal;