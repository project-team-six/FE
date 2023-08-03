import { useState } from 'react';

const useInput: () => [string, (value: string) => void, boolean, (value: boolean) => void] = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isValue, setIsValue] = useState<boolean>(false); // 유효성 확인
    return [inputValue, setInputValue, isValue, setIsValue];
}

export default useInput;