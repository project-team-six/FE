import React, { ChangeEvent } from "react";
import * as S from "./style";

export const FeedInput = React.memo(({label, value, setValue}: {label: string, value: string, setValue: (value: string) => void }) => {
    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    return (
        <div>
            <S.Label>{label}</S.Label>
            <S.Input type="text" required value={value} onChange={handleChangeValue}/>
        </div>
    )
});