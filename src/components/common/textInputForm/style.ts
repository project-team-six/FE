import styled from "styled-components";

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
`;

type SpanProps = {
    fontSize: number;
    fontWeight: string;
    color?: string;
};

export const Span = styled.span<SpanProps>`
    font-size: ${props => props.fontSize}px;
    font-weight: ${props => props.fontWeight};
    color: #${props => props.color};
`;

export const SpanDiv = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    gap: 10px;
`;

export const Input = styled.input`
    border: 1px solid #C5C5C5;
    border-radius: 10px;
    width: 400px;
    height: 55px;
    padding: 25px;
    margin-top: 10px;
    margin-bottom: 5px;
`;