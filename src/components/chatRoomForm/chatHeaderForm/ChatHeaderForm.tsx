import { chatBack, chatClose } from "../../../asstes/asstes";
import ChatInfoForm from "./chatInfoForm/ChatInfoForm";
import * as S from "./style";

const ChatHeaderForm = ({isFeed, setModalState, setIsFeed, selectChat}: {isFeed: boolean, setModalState:(value: boolean)=>void, setIsFeed:(value: boolean)=>void, selectChat: string}) => {
    
    
    return (
        <S.MainContentWrapper>
            {isFeed? 
            <S.BackDiv>
                <S.BackButton onClick={()=>setIsFeed(false)}><img src={chatBack} alt="chatBack"/></S.BackButton>
                <ChatInfoForm selectChat={selectChat}/>
            </S.BackDiv>
            :<S.Div>
                <S.Span fontSize="1.2" fontWeight="500">채팅 목록</S.Span>
            </S.Div>}
            <S.Button onClick={()=>setModalState(false)}><img src={chatClose} alt="chatClose"/></S.Button>
        </S.MainContentWrapper>
    )
}

export default ChatHeaderForm;