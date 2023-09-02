import styled from "styled-components";
import { cursor } from "../../common/GlobalStyle";

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

export const Li = styled.li`
    border-bottom: 1px solid #EEEEEE;
`;

export const ChatButton = styled.button`
    padding: 20px;
    height: 78px;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    ${cursor}
`;

export const ProfileImg = styled.img`
    width: 38px;
	height: 38px;
	border-radius: 50%;
`;

export const ChatDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`;

export const ChatSpanDiv = styled.div`
    gap: 15px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    text-align: left;
`;

export const SpanDiv = styled.div`
    width: auto;
    max-width: 180px;
    white-space: nowrap; 
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const ChatDeleteButton = styled.button`
    cursor: pointer;
    position: absolute;
    left: 86%;
    margin-top: -45px;
    ${cursor}
`;