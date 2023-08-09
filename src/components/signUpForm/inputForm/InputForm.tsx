import React, { ChangeEvent, useState } from 'react';
import * as S from "./style";

type InputFormProps = {
    label: string;
    type: string;
    inputVal: string;
    setInputVal: (inputVal: string) => void;
    setIsVal: (isVal: boolean) => void;
    pattern: RegExp;
}

const InputForm: React.FC<InputFormProps> = ({label, type, inputVal, setInputVal, setIsVal, pattern}) => {
    const [msg, setMsg] = useState<string>(""); // 에러메시지
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val: string = e.target.value;
        setInputVal(val);

        if (!pattern.test(val)) {
            setMsg(`사용 할 수 없는 ${label} 입니다.`);
            setIsVal(false);
        }
        else {
            setMsg("");
            setIsVal(true);
        }

    };

    return (
        <S.Form>
            <label>{label}</label>
            <br />
            <S.Input type={type} required value={inputVal} onChange={handleChange} />
            <br />
            <S.Span>{msg}</S.Span>
        </S.Form>
    )
}

export default InputForm;