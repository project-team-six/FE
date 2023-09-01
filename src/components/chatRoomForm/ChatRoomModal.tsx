import { useEffect, useState } from "react";
import ChatHeaderForm from "./chatHeaderForm/ChatHeaderForm";
import ChatListForm from "./chatListForm/ChatListForm";
import ChatMessageForm from "./chatMessageForm/ChatMessageForm";
import * as S from "./style";
import ChatInputForm from "./chatInputForm/ChatInputForm";

const ChatRoomModal = ({ postId, modalState, setModalState, modalHandle }: { postId: string, modalState: boolean, setModalState:(value: boolean)=>void, modalHandle: React.MouseEventHandler<HTMLDivElement>}) => {
    const toggleChat: React.MouseEventHandler = (event) => event.stopPropagation(); // 영역 안에서는 토글 안닫히게 하기

    const [selectChat, setSelectChat] = useState<string>(postId); // 선택한 채팅방 ID
    const [isFeed, setIsFeed] = useState<boolean>(postId.trim() !== ""); // 채팅 요청과 목록 요청 구분 값
    useEffect(() => {
        if (selectChat.trim() !== "") setIsFeed(true);
    }, [selectChat])

    return (
        <div>
            {modalState && 
            (<S.ModalLayout onClick={modalHandle}>
                <S.ChatLayout onClick={toggleChat}>
                    <S.HeaderSection>
                        <ChatHeaderForm isFeed={isFeed} setModalState={setModalState} setIsFeed={setIsFeed} selectChat={selectChat}/>
                    </S.HeaderSection>
                    <S.MainSection>
                        {isFeed ? <ChatMessageForm selectChat={selectChat}/>: <ChatListForm setSelectChat={setSelectChat}/>}
                    </S.MainSection>
                    {isFeed ? <S.InputSection><ChatInputForm selectChat={selectChat}/></S.InputSection> : <></>}
                </S.ChatLayout>
            </S.ModalLayout>)}
        </div>
    )
}

export default ChatRoomModal;