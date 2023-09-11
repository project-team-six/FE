import styled from "styled-components";
import { Flex, cursor } from "../../common/GlobalStyle";

export const GuideLayout = styled.div`
    ${Flex}
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const GuideSection = styled.div`
    position: relative;
    width: 562px;
    height: 474px;
    padding: 60px 81px 36px 81px;
    border-radius: 20px;
    background-color: #ffffff;
`;

export const CancelButton = styled.button`
    position: absolute;
    right: 5%;
    top: 5%;
    ${cursor};
`;

export const SpanBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 30px;
`;

export const NicknameBox = styled.div`
    margin-bottom: 15px;
`;

type SpanProps = {
    fontSize: string;
    fontWeight: string;
    color: string;
};

export const Span = styled.span<SpanProps>`
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
    color: #${props => props.color};
`;

export const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    ${Flex}
`;

export const Img = styled.img`
    width: 198px;
    height: 239px;
`;

export const GradientOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 190px;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 100%);
    // background: linear-gradient(transparent, rgba(255, 255, 255, 1)); 
`;

export const ButtonBox = styled.div`
    position: absolute;
    bottom: 7%;
    left: 12%;
    ${Flex}
    gap: 32px;
    vertical-align: bottom;
`;

type ButtonProps = {
    $backgroundColor: string;
    color: string;
};

export const Button = styled.button<ButtonProps>`
    width: 201px;
    height: 54px;
    background-color: #${props => props.$backgroundColor};
    color: #${props => props.color};
    border-radius: 50px;
    font-size: 17px;
    font-weight: bold;
    ${cursor};
`;