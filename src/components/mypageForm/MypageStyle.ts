import { Flex, cursor } from "./../common/GlobalStyle";
import styled from "styled-components";

export const Main = styled.main`
    background-color: #f8f8f8;
`;

export const InlineLayout = styled.article`
    background-color: #fff;
    width: 1230px;
    height: 100%;
    margin: 0 auto;
    padding-top: 80px;
`;

export const UserInfoWrapper = styled.section`
    margin: 0 auto;
    ${Flex}
    max-width:915px;
    min-width: 400px;
    height: 320px;
    width: 100%;
    background: #2bb673;
    border-radius: 20px;
`;

export const UserInfo = styled.section`
    width: 335px;
    margin-right: 10px;
    h2,
    h4,
    strong,
    span {
        color: #fff;
    }
`;

export const Nickname = styled.div`
    ${Flex}
    justify-content: flex-start;
    h2 {
        font-size: 24px;
        margin-right: 20px;
    }
    button {
        ${cursor}
    }
`;

export const Info = styled.div`
    ${Flex}
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
    strong {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        font-weight: normal;
    }
    span img {
        object-fit: contain;
        height: 24px;
        display: inline-block;
        width: 24px;
        margin-right: 20px;
    }
`;

export const Popularity = styled.section`
    width: 270px;
    min-width: 120px;
    height: 100%;
    border-left: 1px solid #fff;
    background-color: #3ac884;
    ${Flex}
    flex-direction: column;
    border-radius: 0 20px 20px 0;
    h5,p {color: #fff;}
    h5 {font-size: 36px;}
    p {font-size: 20px;margin: 5px 0;}
`;

export const Post = styled.div`
    max-width: 915px;
    margin: 0 auto 50px;
`;

export const ListWrapper = styled.div`
    ${Flex}
    justify-content: flex-start;
`;

export const Feed = styled.div`
    width: 285px;
    img,h4,p,span {margin: 3px 0;}
    img {
        width: 285px;
        height: 340px;
        border-radius: 15px;
    }
    h4 {font-size: 18px;}
    p {font-size: 16px;}
    span {color: #838383;font-size: 15px;}
`;
