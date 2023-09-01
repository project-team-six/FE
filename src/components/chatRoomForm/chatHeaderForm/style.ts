import styled from "styled-components";
import { cursor } from "../../common/GlobalStyle";

export const MainContentWrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BackDiv = styled.div`
    display: flex;
    align-items: center;
`;

export const Div = styled.div`
    height: 70px;
    display: flex;
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

export const BackButton = styled.button`
    ${cursor};
`;

export const Button = styled.button`
    position: absolute;
    left 325px;
    ${cursor};
`;