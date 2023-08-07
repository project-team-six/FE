import styled from "styled-components";

export const InputDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 60%;
	height: 45vh;

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
`;

export const Label = styled.label`
	padding: 6px 25px;
	margin: 10px;
	border-radius: 4px;
	color: white;
	cursor: pointer;
`;

export const Input = styled.input`
	display: none;
`;

export const PreviewImg = styled.img`
	width: 50px;
	height: 50px;
`;