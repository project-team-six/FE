import { styled } from "styled-components";

export const CommentBox = styled.article`
    max-width : 1280px;
    margin : 0 auto;
`;

export const CommentArticle = styled.article`
    width: 57%;
    margin : 0 auto;
`;

export const SpanDiv = styled.div`
    margin-bottom: 15px;
`;

export const Span = styled.span`
    font-size: 22px;
    font-weight: 700;
    margin-right: 10px;
`
export const CommentLi = styled.li`
    display: flex;
    margin-right: 25px; 
    justify-content: space-between;
`;

export const CommentDiv = styled.div`
    display: flex;
`;

export const CommentProfileImg = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 25px; 
    margin-bottom: 25px;
`;

export const CommentContentDiv = styled.div`
    margin-top: 10px;
`;

export const ViewDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 45px;
`;

export const ViewButton = styled.button`
    cursor: pointer;
    border-bottom: 1px solid black;
    display: inline-block;
`;