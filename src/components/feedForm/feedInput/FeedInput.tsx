import React, { ChangeEvent, useEffect, useState } from "react";
import * as S from "./style";
import { feedTextType } from "../../../types/feedType";

export const FeedInput = React.memo(({label, name, textEntered, setTextEntered}: {label: string, name: string, textEntered: feedTextType, setTextEntered: (value: feedTextType) => void }) => {
    let initialValue = ""; // 초기 값
    switch (name) {
        case "title":
            initialValue = textEntered.title;
            break;
        case "content":
            initialValue = textEntered.content;
            break;
        case "originPrice":
            initialValue = textEntered.originPrice;
            break;
        case "price":
            initialValue = textEntered.price;
            break;
    }

    const [inputValue, setInputValue] = useState<string>(initialValue);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value) };
    useEffect(()=>{
        setTextEntered(
            {...textEntered,
            [name]: inputValue,
        }
        );
    }, [inputValue]);

    return (
        <div>
            <S.Label>{label}</S.Label>
            <S.Input type="text" name={name} required value={inputValue} onChange={handleChange}/>
            <S.Line />
        </div>
    )
});