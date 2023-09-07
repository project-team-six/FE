import styled from "styled-components";
import { Flex, cursor } from "../../../common/GlobalStyle";

export const CommentLi = styled.li`
    width: 100%;
    height: 110px;
    ${Flex}
    margin-right: 25px;
    justify-content: space-between;
    border-bottom: 1px solid #dcdcdc;
`;

export const CommentDiv = styled.div`
    ${Flex}
`;

export const CommentProfileImg = styled.img`
    width: 45px;
    height: 45px;
    margin-right: 25px;
    border-radius: 100px;
    @media(max-width: 600px){
        margin-right:10px;
	}
`;

type SpanProps = {
    fontSize: number;
    fontWeight: string;
};

export const Span = styled.span<SpanProps>`
    font-size: ${(props) => props.fontSize}px;
    font-weight: ${(props) => props.fontWeight};
    margin-right: 10px;
    @media(max-width: 600px){
        font-size:1rem;
        margin-right:5px;
	}
`;

export const ReportButton = styled.button`
    font-size: 14px;
    display: inline-block;
    ${Flex}
    ${cursor}
    padding:0;
`;

export const CommentContentDiv = styled.div`
    margin-top: 10px;
    input {
        padding: 10px;
        height: 40px;
        border-radius: 10px;
        font-size: 1.1rem;
        width: 200%;
    }
    span {
        font-size: 1.1rem;
    }
`;

export const CommentEditInput = styled.input`
    max-width: 500px;
    height: 25px;
    border: 1px solid #7f7f7f;
    
`;

export const IconButton = styled.button`
    margin: 35px 0 0 20px;
    ${cursor}
    width:90px;
    height: 40px;
    color: #fff;
    font-size: 1.2rem;
    border-radius: 10px;
    font-weight: 600;
    background-color: ${(props) => props.color};
`;

export const ModalWrapper = styled.div`
    height: 45px;
    position: relative;
`;

export const EditButton = styled.button`
    margin-top: 10px;
    width: 50px;
    ${cursor}
`;

export const EditModal = styled.div`
    position: absolute;
    right: 15%;
    background-color: #fff;
    width: 110px;
    height: 90px;
    ${Flex}
    flex-direction: column;
    border-radius: 6px;
    filter: drop-shadow(0 0 0.25rem #c3c3c3);
`;

export const ModalButton = styled.button`
    ${cursor}
    width:100%;
    height: 35px;
    &:hover {
        background-color: #efefef;
    }
`;
