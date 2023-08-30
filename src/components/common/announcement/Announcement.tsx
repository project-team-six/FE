import * as S from "./style";

const Announcement = ({content}: {content: string}) => {
    return (
        <S.SpanSection>
            <S.Span>{content}</S.Span>
        </S.SpanSection>
    )
}

export default Announcement;