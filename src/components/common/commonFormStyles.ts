import styled from "styled-components";

export const MainContentWrapper = styled.div`
    display: grid;
    place-items: center;
    margin: 0 auto;
    max-width: 1280px;
    margin-top: 100px;
`;

export const LogoImg = styled.img`
    width: 200px;
    height: 100px;
    margin-bottom: 30px;
`;

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

export const MovePageDiv = styled.div`
    margin-top: 10px;
    text-align: right;
`;

export const MovePageBtn = styled.button`
    width: 110px;
    height: 40px;
    color: #FFFFFF;
    background-color: #F1C548;
    border-radius: 20px;
    cursor: pointer;
`;

export const FindDiv = styled.div`
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
`;

export const FindBtn = styled.button`
    width: 110px;
    height: 40px;
    color: #FFFFFF;
    background-color: #F1C548;
    border-radius: 20px;
    cursor: pointer;
`;