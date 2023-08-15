import styled from "styled-components/";
import { Flex, cursor } from "../../common/GlobalStyle";

const LayoutBox = styled.main`
max-width : 1280px;
margin : 0 auto;
`

const DetailMain = styled.article`
    width: 57%;
    margin : 0 auto;
`;

const DetailTitle = styled.section`
    width: 100%;
    height: 100px;
    ${Flex}
    justify-content : space-between;
    border-bottom: 1px solid #d9d9d9;
    h1 {font-size: 2.5rem;}
    img {width: 35px;}
    p {color: #8c8c8c;}
`;
const NotAuth = styled.div`
    ${Flex}
    margin-top:30px;
    button {
        ${cursor}
        box-shadow: 2px 2px 0 #eee;
        width: 35px;
        text-align: center;
        margin: 0 5px;
        border-radius: 50%;
        height: 35px;
        padding: 0;
    }
`;
const Auth = styled.div`
    height: 30px;
    margin-top: 40px;
    button {
        ${cursor}
        font-size : 15px;
        width: 65px;
        height: 30px;
        border-radius: 50px;
        background-color: #6f8a6b;
        color: #fff;
        margin: 0 10px;
    }
`;

const DetailUser = styled.section`
    width: 100%;
    height: 90px;
    ${Flex}
    justify-content : space-between;
    margin: 2% 0;
    padding-bottom: 2%;
    border-bottom: 1px solid #d9d9d9;

    article {
        width: 100%;
        ${Flex};
        justify-content: flex-start;
        gap: 20px;
    }
    span {text-align: right;}
    .profile-img {
        border: 1px solid #000;
        border-radius: 100%;
        width: 80px;
        height: 80px;
        ${Flex}
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    strong {font-size: 18px;}
`;

const DetailList = styled.section`
    width: 100%;
    ${Flex}
    justify-content : space-between;
    align-items: flex-start;
    gap: 30px;
    margin-top: 90px;
    h2 {
        margin: 20px 0;
        font-size: 20px;
    }
    p {
        margin: 15% 0;
        font-size: 14px;
        width: 260px;
    }
    img {
        width: 370px;
        height: 310px;
        object-fit: contain;
        border: 1px solid #333;
    }
    span {padding-left: 24px;}
`;

const ImageList = styled.div`
    ${Flex};
    gap: 10px;
    width: 100%;
    margin: 15px 0 40px;
    img {
        border: none;
        width: 40px;
        height: 40px;
        object-fit: contain;
    }
    .selectedImage {border: 1px solid #333;}
`;

const DetailContent = styled.section`
    width: 100%;
    height: 100%;
    margin: 10px auto;
    text-align : justify;
    p {margin: 40px 0;}
    span {margin-right: 15px;}
`;

export { LayoutBox, DetailMain, NotAuth, Auth, DetailTitle, DetailUser, DetailList, ImageList, DetailContent };