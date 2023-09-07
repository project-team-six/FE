import styled from "styled-components/";
import { Flex, cursor } from "../../common/GlobalStyle";

export const LayoutBox = styled.main`
    max-width: 1280px;
    margin: 0 auto;
    position:relative;
`;

export const DetailMain = styled.article`
width : 100%;
height: 100%;
`;

export const Category = styled.div`
    width: 100%;
    margin: 90px 0 65px;
    ${cursor}
    display:inline-block;
    margin-left: 2%;
    color: #b6b6b6;
    span {
        color: #b6b6b6;
        &:hover {
            border-bottom: 1px solid #b6b6b6;
        }
    }
    strong {color: #333}
`;

export const InlineWrapper = styled.div`
    width: 100%;
    ${Flex}
    align-items: flex-start;
    justify-content: space-between;
    @media(max-width: 900px){
		${Flex}
        flex-direction: column;
        margin : 0 1%;
	}
`;

export const InfoSection = styled.div`
    max-width: 580px;
    padding-right : 2%;
    @media(max-width: 1024px){
		max-width:470px;
        padding : 0;
        margin : 0 1% ;
	}
`;

export const Content = styled.section`
    width: 100%;
    height: 100%;
    margin: 20px 0;
    text-align: justify;
    p{
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
}
    line-height: 200%;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    h1 {
        margin-bottom: 20px;
        font-size: 1.5rem;
    }
    @media(max-width: 1024px){
		h1{font-size:1.3rem}
	}
`;

export const Dates = styled.div`
    color: #8c8c8c;
    width: 300px;
    text-align: right;
    span {
        color: #8c8c8c;
        margin: 0 8px;
    }
`;

export const DetailList = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 50px;
    align-content: center;
    li {
        border-top: 1px solid #dcdcdc;
        &:last-child{border-bottom:1px solid #dcdcdc;}
        width: 100%;
        height: 60px;
        ${Flex}
        justify-content: flex-start;
    }
    strong {
        margin-left: 20px;
        display: inline-block;
        font-size: 1.2rem;
        width: 230px;
        @media(max-width: 480px){
		width : 150px;
	    }
    }
    span {
        font-size: 1rem;
        color: #777;
        display: inline-block;
        padding-left: 24px;
    }
`;
