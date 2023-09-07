import styled from "styled-components";
import { Flex, cursor } from "../../../common/GlobalStyle";

export const Image = styled.div`
/* padding :0 2%; */

`;

export const SelectImgWrapper = styled.div`
    max-width: 550px;
    max-height: 505px;
    ${Flex}
    border-radius: 10px;
    padding:0;
    img {
        border-radius: 10px;
        object-fit: cover;
        width: 500px;
        height: 505px;
    }
    @media(max-width: 1024px){
		max-width:440px;
        max-height:395px;
        img{
            max-width:440px;
            max-height:395px;
        }
	}
    @media(max-width: 440px){
        padding: 0;
		max-width:320px;
        max-height:325px;
        img{
            max-width:320px;
            max-height:325px;
        }
	}
`;
export const ImageList = styled.div`
    ${Flex};
    gap: 10px;
    width: 100%;
    margin: 15px 10px 40px 0;
    .selectedImage {
        border: 1px solid #333;
    }
`;

export const ArrowImg = styled.img`
    height: 20px;
    width: 20px;
    object-fit: cover;
    ${cursor};
`;

export const PreviewImg = styled.img`
    border: none;
    ${cursor};
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
`;
