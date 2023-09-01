import useRoomQuery from "../../../../hooks/useRoomQuery";
import * as S from "./style";

const ChatInfoForm = ({selectChat}: {selectChat: string}) => {
    const roomInfo = useRoomQuery(selectChat);

    return (
        <S.MainContentWrapper>
            {roomInfo && 
            <S.Div>
                <S.SpanDiv maxWidth="130"><S.Span fontSize="1.2" fontWeight="700">{roomInfo.data.name}</S.Span></S.SpanDiv>
                <S.SpanDiv maxWidth="170"><S.Span fontSize="0.8" fontWeight="400" color="A9A9A9">{roomInfo.data.participants.join(", ")}</S.Span></S.SpanDiv>
            </S.Div>}
        </S.MainContentWrapper>
    )
}

export default ChatInfoForm;