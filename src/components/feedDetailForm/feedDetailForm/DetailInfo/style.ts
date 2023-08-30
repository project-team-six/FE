import styled from "styled-components";
import { Flex, cursor } from "../../../common/GlobalStyle";

export const FeedCounter = styled.div`
    ${Flex}
    width:100px;
    justify-content: space-between;
    span {
        font-size: 14px;
        color: #2bb673;
    }
`;
export const Location = styled.p`
    margin-top: 12px;
    font-size: 18px;
    color: #7d7d7d;
    font-weight: 600;
`;

export const Title = styled.div`
    width: 100%;
    height: 50px;
    ${Flex}
    justify-content : space-between;
    margin: 10px 0;
    h1 {font-size: 2.8rem;}
    button {${Flex}}
    img {width: 24px;}
    p {
        height: 20px;
        line-height: 24px;
        font-size: 14px;
        color: #8c8c8c;
    }
`;

export const UserProfile = styled.div`
    ${cursor}
    ${Flex}
    width:100%;
    justify-content: flex-start;
    h1 {
        font-size: 1.4rem;
        margin-left: 15px;
        color: #7d7d7d;
    }
`;

export const ProfileImg = styled.img`
    border-radius: 100%;
    width: 45px;
    height: 45px;
    margin: 5px 0;
    object-fit: cover;
    border-radius: 100%;
`;

export const Wapper = styled.div`
    ${Flex}
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid #dcdcdc;
`;

export const Price = styled.div`
    p, span {
        color: #8c8c8c;
        font-size: 15px;
        margin: 15px 0 5px;
    }
    h2 {font-size: 40px;}
`;

export const Auth = styled.div`
    height: 30px;
`;

export const NotAuth = styled.div`
    ${Flex}
    button {${cursor}}
`;

export const Btn = styled.button`
    ${cursor}
    font-weight:700;
    font-size: 20px;
    width: 160px;
    height: 55px;
    border-radius: 10px;
    background-color: ${(props) => props.color};
    color: #fff;
    margin: 0 10px;
    line-height: 2.7;
`;