import styled from "styled-components";
import { Flex } from "../../common/GlobalStyle";

export const Article = styled.article`
	width: 100%;
`;

export const TitleSpan = styled.span`
	margin-right: 200px;
	width: 100%;
`;

export const InputSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const InputDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 285px;
	height: 270px;
	margin-bottom: 30px;
	background-color: #eee;
	border-radius: 4px;
`;

interface InputSpanProps {
    fontSize: number;
    fontWeight: string;
  }

export const InputSpan = styled.span<InputSpanProps>`
	display: block;
	font-size: ${(props) => props.fontSize}px;
	font-weight: ${(props) => props.fontWeight};
	width: 170px;
	height: 30px;
`;

export const LabelDiv = styled.div`
  	width: 165px;
	height: 30px;
	background-color: #9C9D9D;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Label = styled.label`
	color: #FFFFFF;
	cursor: pointer;
`;

export const Input = styled.input`
	display: none;
`;

export const PreviewContentWrapper = styled.div`
	text-align: center;
	width : 100%;
	${Flex}
	gap: 7px;
`;

export const PreviewMiddleDiv = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PreviewImg = styled.img`
	width: 50px;
	height: 50px;
`;

export const PreviewButton = styled.button`
	font-weight: 800;
	cursor: pointer;
	position: relative;
	width: 20px;
	top: -50px;
	right: -29px;

	&:hover {
		background-color: #D5D7D8;
		border-radius: 20px;
	}
`;

export const PreviewBtnSpan = styled.span`
	display: inline-block;
	text-align: center;
`;