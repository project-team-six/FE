import { Flex } from './../../common/GlobalStyle';
import styled from "styled-components";
import { cursor } from "../../common/GlobalStyle";

export const MainContentWrapper = styled.div`
    height: 100%;
    ${Flex}
`;

export const PreviewDiv = styled.div`
    position: absolute;
    bottom: 70px;
    width: 120%;
    height: 120px;
	background-color: rgba(0, 0, 0, 0.2);
`;

export const PreviewDeleteButton = styled.button`
    opacity: 0; 
    position: absolute;
    width: 100px;
    height: 100px;
    left: 170px;
    top: 10px;
    ${cursor};
    &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

export const PreviewImg = styled.img`
    width: 100px;
	height: 100px;
    position: absolute;
    bottom: 10px;
    left: 170px;
`;

export const TextDiv = styled.div`
    ${Flex}
`;

export const PhotoLabel = styled.label`
	margin-right: 5px;
	${cursor}	
`;

export const InputPhoto = styled.input`
	display: none;
    ${cursor};
`;

export const Input = styled.input`
    padding: 20px;
    width: 297px;
    height: 40px;
    background-color: #F1F1F1;
    border: 1px solid #D1D1D1;
    border-radius: 30px;

`;

export const Button = styled.button`
    ${cursor};
`;