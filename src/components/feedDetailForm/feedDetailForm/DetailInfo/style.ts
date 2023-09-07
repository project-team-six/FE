import styled from "styled-components";
import { Flex, cursor } from "../../../common/GlobalStyle";

export const FeedCounter = styled.div`
    ${Flex}
    width:100px;
    justify-content: space-between;
    span {
        font-size: 1rem;
        color: #4fbe9f;
    }
`;
export const Location = styled.p`
    margin-top: 12px;
    font-size: 1.2rem;
    color: #7d7d7d;
    font-weight: 600;
`;

export const Title = styled.div`
    width: 100%;
    ${Flex}
    justify-content : space-between;
    margin: 2% 0;
    h1 {
        font-size: 2.2rem;
        max-width: 85%;
        line-height: 1.4;
        height: 100%;
    }
    button {
        ${Flex};
        ${cursor}
    }
    img {
        width: 24px;
    }
    p {
        height: 20px;
        line-height: 24px;
        font-size: 1rem;
        color: #8c8c8c;
    }
`;

export const UserProfile = styled.div`
    ${cursor}
    ${Flex}
    width:100%;
    justify-content: flex-start;
    h1 {
        font-size: 1.3rem;
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
    width: 50%;
    p,
    span {
        color: #8c8c8c;
        font-size: 15px;
        margin: 15px 0 5px;
    }
    h2 {
        font-size: 2.3rem;
        max-width: 85%;
    }
`;

export const Auth = styled.div`
    width: 100%;
    height: 77px;
    ${Flex}
    align-items: flex-end;
`;

export const NotAuth = styled.div`
    ${Flex}
    
    margin-top:30px;
    button {
        padding:0;
        margin: 0;
        margin-left: 15px;
        ${cursor}
    }
`;

export const Btn = styled.button`
    ${cursor}
    font-weight:700;
    font-size: 1.3rem;
    width: 130px;
    height: 45px;
    border-radius: 10px;
    background-color: ${(props) => props.color};
    color: #fff;
    margin: 0 10px;
`;

export const ModalBox = styled.div`
    height: 45px;
    width: 50px;
`;

export const Modalbutton = styled.button`
    ${cursor}
    width:100%;
    height: 100%;
`;
export const ModalEditBox = styled.div`
    background-color: #fff;
    width: 110px;
    height: 120px;
    ${Flex}
    flex-direction: column;
    border-radius: 6px;
    filter: drop-shadow(0 0 0.25rem #c3c3c3);
`;

export const AuthButton = styled.button`
    ${cursor}
    color : #6a6a6a;
    width: 100%;
    height: 35px;
    &:hover {
        background-color: #efefef;
    }
`;

export const DeleteModalWrapBox = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0%;
    right: 0%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const DeleteModalBox = styled.div`
    background-color: #fff;
    width: 350px;
    height: 150px;
	position: absolute;
	top: 50%;
    right: 40%;
    ${Flex}
    flex-direction: column;
    border-radius:10px;
    p{
        font-size:1.3rem;
        margin-bottom:5%;
    }
`;
