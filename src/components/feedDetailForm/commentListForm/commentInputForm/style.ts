import { cursor, MainBackgroundColor } from "./../../../common/GlobalStyle";
import styled from "styled-components";

export const InputForm = styled.form`
	display: flex;
	gap: 30px;
	justify-content: space-around;
`;

export const Input = styled.input`
	width: 85%;
	height: 55px;
	border: 1px solid #7f7f7f;
	border-radius: 10px;
	margin-bottom: 30px;
	padding-left: 15px;
	font-size: 18px;
`;

export const InputButton = styled.button`
	width: 140px;
	height: 55px;
	color: #ffffff;
	${MainBackgroundColor}
	border-radius: 10px;
	${cursor}
	font-size: 18px;
	font-weight: 700;
`;
