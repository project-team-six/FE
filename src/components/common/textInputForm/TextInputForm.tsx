import { ChangeEvent } from "react";
import * as S from "./style";

const TextInputForm = ({label, type, value, handleChange, msg, placeholder}: {label: string, type: string, value: string, handleChange: (e: ChangeEvent<HTMLInputElement>) => void, msg: string, placeholder: string}) => {
    return (
        <S.InputBox>
            <S.SpanDiv>
                <S.Span fontSize={17} fontWeight="500">{label}</S.Span>
                <S.Span fontSize={11} fontWeight="700" color="F34932">{msg}</S.Span>
            </S.SpanDiv>
            <S.Input type={type} value={value} onChange={handleChange} placeholder={placeholder}/>
        </S.InputBox>
    )
}

export default TextInputForm;