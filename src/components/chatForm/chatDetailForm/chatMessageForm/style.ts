import styled from "styled-components";

type SpanProps = {
	fontSize: number;
	fontWeight: string;
	fontColor?: string;
	MarginRight? : number;
};

export const Span = styled.span<SpanProps>`
	font-size: ${(props) => props.fontSize}px;
	font-weight: ${(props) => props.fontWeight};
	color: #${(props) => props.fontColor};
	margin-right: ${(props) => props.MarginRight}px;
`;

export const Li = styled.li`
	display: flex;
	margin-bottom: 10px;
`;

export const SendBox = styled.div`
	margin-left: auto;
`;

export const ReceiveBox = styled.div`
	margin-top: 5px;
	display: flex;
	align-items: center;
`;

type DivProps = {
	$backgroundColor: string;
	borderRadius: string;
	padding: string;
};

export const MessageBox = styled.div<DivProps>`
	text-align: center;
	align-items: center;
	background-color: #${props => props.$backgroundColor};
	border-radius: ${props => props.borderRadius};
	padding: ${props => props.padding};
	width: auto;
	max-width :308px;
	word-wrap: break-word;
`;

export const TimeBox = styled.div`
	margin-top: auto;
	margin-left: 10px;
`;

export const ProfileImg = styled.img`
	width: 38px;
	height: 38px;
	border-radius: 50%;
	margin-right: 10px;
`;

export const NotificationLi = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Photo = styled.img`
	width: 150px; 
	height: 150px;
`;