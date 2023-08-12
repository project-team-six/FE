import { styled } from "styled-components";
import { Flex, cursor } from "../common/GlobalStyle";

const CommentBox = styled.article`
    width: 57%;
`;

const InputBox = styled.form`
    ${Flex}
    justify-content: space-between;
    div {
        min-width: 200px;
        width: 50%;
        text-align: center;
    }
    input {
        border: 1px solid #000;
        width: 60%;
        height: 45px;
        border-radius: 5px;
        padding-left: 10px;
    }
    button {
        margin: 0 5px;
        ${cursor}
        width : 85px;
        height: 30px;
        &:hover {
            border: 1px solid #6f8a6b;
            border-radius: 30px;
        }
        &:active {
            background-color: #6f8a6b;
            border-radius: 30px;
            color: #fff;
        }
    }
    .submitBtn {
        background-color: #6f8a6b;
        border-radius: 30px;
        color: #fff;
    }
`;

export { InputBox, CommentBox };
