import styled from "styled-components";
import { Flex } from "../../../common/GlobalStyle";

export const Image = styled.div``;
export const SelectImgWrapper = styled.div`
    width: 710px;
    height: 655px;
    ${Flex}
    /* border : 1px solid #b6b6b6; */
    border-radius: 10px;
    img {
        border-radius: 10px;
        object-fit: cover;
        max-width: 100%;
        height: 100%;
    }
`;
export const ImageList = styled.div`
    ${Flex};
    gap: 10px;
    width: 100%;
    margin: 15px 0 40px;
    .selectedImage {
        border: 1px solid #333;
    }
`;

export const ArrowImg = styled.img`
    height: 20px;
    width: 20px;
    object-fit: cover;
`;

export const PreviewImg = styled.img`
    border: none;
    width: 85px;
    height: 85px;
    object-fit: cover;
    border-radius: 10px;
`;
