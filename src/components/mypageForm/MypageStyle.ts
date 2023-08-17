import { Flex, cursor } from "./../common/GlobalStyle";
import styled from "styled-components";

export const LayoutBox = styled.div`
    width: 1280px;
    margin: 0 auto;
`;

export const Title = styled.h1`
    width: 100%;
    font-size: 2rem;
    border-bottom: 1px solid #d3d3d3;
    margin: 15px 0;
    padding-bottom: 15px;
`;

export const LayoutBody = styled.main`
    width: 96%;
    margin: 0 auto;
`;

export const Wrapper = styled.article`
    display: flex;
    margin-top: 70px;
`;

export const UserInfoWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    section {
        width: 220px;
        margin-right: 50px;
    }
`;

export const UserProfile = styled.section`
    .profile-img {
        text-align: center;
        width: 100%;
        margin-bottom: 20px;
        img {
            width: 130px;
            height: 130px;
            border-radius: 100%;
            border: 1px solid #000;
        }
    }
    h2 {
        padding: 15px 0;
        font-size: 20px;
    }
`;
export const Location = styled.section`
    p {
        font-size: 15px;
        font-weight: 600;
    }
`;

export const EditBtn = styled.section`
    text-align: center;
    margin-bottom:50px;
    button {
        ${cursor}
        width: 120px;
        height: 40px;
        background-color: #f1c548;
        border-radius: 25px;
        font-weight: 600;
    }
`;

export const Feed = styled.section`
    width: 100%;
    padding-left: 35px;
    margin-bottom : 20px;
    border-left : 1px solid #d9d9d9;
    h2 {
        height: 35px;
        margin: 5px;
        display: inline-block;
        font-size: 1.5rem;
        border-bottom: 1px solid #000;
    }
`;

export const List = styled.div`
    width: 100%;
    margin : 35px 0;
    img {
        width: 200px;
        height: 195px;
        border-radius: 25px 25px 0 0;
        object-fit:contain;
    }
    .list-wrapper{
        width:100%;
        display: flex;
        flex-wrap: wrap;
        gap : 30px;
    }
    div {
        ${cursor}
        width: 200px;
        border-radius: 25px 25px 0 0;
    }
    h4 {
        margin: 10px 0;
        font-size: 15px;
        font-weight: 600;
    }
    span {
        padding-top:10px;
        font-size: 11px;
        color:#666;
    }
    .day {
        display: inline-block;
        width : 60px;
        text-align: right;
    }
`;

export const PostContent = styled.div`
    width:100%;
`

export const ContentHead = styled.div`
${Flex}
justify-content: space-between;
`