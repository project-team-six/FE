import React, { useEffect, useRef, useState } from "react";
import * as S from "./style";
import { feedTextType } from "../../../types/feedType";

export const FeedInput = React.memo(({name, textEntered, setTextEntered, inputWidth}: {name: string, textEntered: feedTextType, setTextEntered: (value: feedTextType) => void, inputWidth: number}) => {
    let initialValue = ""; // 초기 값
    let isContent = false;
    switch (name) {
        case "title":
            initialValue = textEntered.title;
            break;
        case "content":
            initialValue = textEntered.content;
            isContent = true;
            break;
        case "originPrice":
            initialValue = textEntered.originPrice;
            break;
        case "price":
            initialValue = textEntered.price;
            break;
    }

    const [inputValue, setInputValue] = useState<string>(initialValue);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { setInputValue(e.target.value) };
    useEffect(()=>{
        setTextEntered(
            {...textEntered,
            [name]: inputValue,
        }
        );
    }, [inputValue]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      };
    useEffect(() => {
        adjustTextareaHeight();
    }, [inputValue]);  

    return (
        <div>
            {isContent ? 
            <S.TextArea ref={textareaRef} rows={isContent ? 1 : 0} width={inputWidth} name={name} value={inputValue} onChange={handleChange}/>
            :
            <S.Input width={inputWidth} type="text" name={name} required value={inputValue} onChange={handleChange}/>
            }
        </div>
    );
});