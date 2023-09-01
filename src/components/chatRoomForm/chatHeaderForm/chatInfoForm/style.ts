import styled from "styled-components";

export const MainContentWrapper = styled.div`
    margin-left: auto;
    width: 290px;
`;

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

type SpanProps = {
    fontSize: string;
    fontWeight: string;
    color?: string;
};

export const Span = styled.span<SpanProps>`
    font-size: ${props => props.fontSize}rem;
    font-weight: ${(props) => props.fontWeight};
    color: #${(props) => props.color};
`;

type SpanDivProps = {
    maxWidth: string;
};

export const SpanDiv = styled.div<SpanDivProps>`
    width: auto;
    max-width: ${props => props.maxWidth}px;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
`;