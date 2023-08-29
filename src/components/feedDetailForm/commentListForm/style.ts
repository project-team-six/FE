import styled from "styled-components";
import { Flex, cursor } from "../../common/GlobalStyle";

export const CommentBox = styled.article`
    max-width: 1920px;
    margin: 0 auto 100px;
`;

export const CommentArticle = styled.article`
    max-width: 1375px;
    margin: 0 auto;
`;

export const SpanDiv = styled.div`
    margin-bottom: 40px;
`;

export const Span = styled.span`
    font-size: 20px;
    font-weight: 600;
`;
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
    ${Flex}
    margin: 45px 0;
`;

export const ViewButton = styled.button`
    ${cursor}
    font-size:1.3rem;
    padding:5px 0;
    border-bottom: 1px solid black;
    display: inline-block;
`;
