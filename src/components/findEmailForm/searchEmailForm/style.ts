import styled from "styled-components";

export const InputDiv = styled.div`
    margin-top: 40px;
`;

export const Input = styled.input`
    width: 330px;
    height: 40px;
    background-color: #F3F3F3;

    /* 숫자 버튼 숨김 */
    -moz-appearance: textfield;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
`;

export const FindPwDiv = styled.div`
    margin-top: 10px;
    text-align: right;
`;

export const FindEmailDiv = styled.div`
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
`;

export const FindEmailBtn = styled.button`
    width: 110px;
    height: 40px;
    color: #FFFFFF;
    background-color: #F1C548;
    border-radius: 20px;
`;