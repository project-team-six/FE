import styled from "styled-components";
import { cursor, MainBackgroundColor } from "../common/GlobalStyle";

export const MainContentWrapper = styled.div`
	display: grid;
	place-items: center;
	margin: 0 auto;
	margin-top: 57px;
	max-width: 1920px;
	min-width: 1290px;
	width: 100%;
`;

type SpanProps = {
	fontSize: number;
	fontWeight: string;
};

export const Span = styled.span<SpanProps>`
	font-size: ${(props) => props.fontSize}px;
	font-weight: ${(props) => props.fontWeight};
`;

export const Line = styled.div`
	width: 100%;
	height: 2px;
	${MainBackgroundColor}
	margin-top: 22px;
	margin-bottom: 42px;
`;

export const SubLine = styled.div`
	width: 100%;
	height: 1px;
	background-color: #ededed;
	margin-top: 48px;
	margin-bottom: 48px;
`;

export const Section = styled.section`
	width: 940px;
	margin-bottom: 40px;
`;

export const SectionDiv = styled.div`
	width: 100%;
	margin-left: 67px;
`;

export const LabelDiv = styled.div`
	display: flex;
	align-items: center;
	width: 90px;
`;

export const Label = styled.label`
	font-size: 15px;
	width: 90px;
	text-align: right;
`;

export const InputDiv = styled.div`
	margin-left: 57px;
	margin-bottom: 67px;
`;

export const InputSection = styled.section`
	display: flex;
	gap: 30px;
	margin-bottom: 30px;
`;

export const LocationDiv = styled.div`
	width: 758px;
	height: 45px;
	display: flex;
	justify-content: center;
	place-items: center;
	border: 1px solid #4fbe9f;
	border-radius: 4px;
	gap: 10px;
`;

export const LocationSpan = styled.span`
	color: #4fbe9f;
`;

export const LocationIcon = styled.img`
	width: 17px;
	height: 21px;
`;

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: center;
	gap: 28px;
`;

type ButtonProps = {
	color: string;
	$backgroundColor: string;
};

export const Button = styled.button<ButtonProps>`
	${cursor}
	color: #${(props) => props.color};
	background-color: #${(props) => props.$backgroundColor};
	width: 285px;
	height: 55px;
	border-radius: 10px;
	font-size: 20px;
	font-weight: 700;
`;
