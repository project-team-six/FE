import styled from "styled-components";
import { MainBackgroundColor } from "../common/GlobalStyle";

export const MainContentWrapper = styled.div`
	display: grid;
	place-items: center;
	margin: 0 auto;
	max-width: 1280px;
	margin-top: 50px;
`;

export const SignUpBox = styled.div`
	text-align: center;
`;

export const Button = styled.button`
	font-size: 18px;
	font-weight: 700;
	cursor: pointer;
	margin-top: 37px;
	margin-bottom: 240px;
	width: 400px;
	height: 55px;
	color: #ffffff;
	${MainBackgroundColor}
	border-radius: 10px;

	@media(max-width: 426px){
		width: 300px;
	}
`;
