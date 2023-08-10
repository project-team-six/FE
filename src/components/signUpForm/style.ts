import styled from "styled-components";

export const MainContentWrapper = styled.div`
    display: grid;
    place-items: center;
    margin: 0 auto;
    max-width: 1280px;
    margin-top: 50px;
`;

export const TitleSpan = styled.span`
    font-weight: 700;
    font-size: 20px;
    width: 80px;
    height: 25px;
    margin-bottom: 80px;
`;

export const ImgForm = styled.form`
    display: grid;
    alignItems: center;
    text-align: center;
    gap: 20px;
`;

export const ImgFormButton = styled.div`
    display: flex;
    gap: 5px;
`;

export const Img = styled.img`
    width: 135px;
    height: 135px;
    border-radius: 50%;
`;


export const ImgInput = styled.input`
    display: none;
`;

export const CustomImgInput = styled.input.attrs({
    type: "file",
    id: "profile"
})`
    display: none;
`;


export const ImgButton = styled.button`
    cursor: pointer;

    color: #FFFFFF;
    background-color: #6F8A6B;
    border-radius: 20px;
    width: 65px;
    height: 20px;
`;

export const Form = styled.form`
    margin-top: 30px;
`;

export const Input = styled.input`
    width: 330px;
    height: 40px;
    background-color: #F3F3F3;
`;

export const Button = styled.button`
    cursor: pointer;
    margin-top: 60px;
    margin-bottom: 240px;
    width: 155px;
    height: 35px;
    color: #FFFFFF;
    background-color: #F1C548;
    border-radius: 20px;
`;

export const InputForm = styled.span`
    color: red;
`;