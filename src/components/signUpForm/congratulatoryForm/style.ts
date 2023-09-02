import styled from "styled-components";

export const MainContentWrapper = styled.div`
    margin-top: 180px;
    margin-bottom: 315px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const Img = styled.img`
    width: 197px;
    height: 196px;
`;

type SpanProps = {
    fontSize: number;
    fontWeight: string;
    color?: string;
};

export const Span = styled.span<SpanProps>`
    font-size: ${props => props.fontSize}rem;
    font-weight: ${props => props.fontWeight};
    color: #${props => props.color};
`;

export const SpanBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const SpanContentBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 83px;
`;

export const Button = styled.button`
    width: 222px;
    height: 64px;
    border-radius: 3px;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: bold;
    background-color: #2BB673;
`;