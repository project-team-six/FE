import styled from "styled-components";
import { MainBackgroundColor, cursor } from "../common/GlobalStyle";

export const MainContentWrapper = styled.div`
	display: grid;
	place-items: center;
	margin: 0 auto;
	max-width: 1280px;
	margin-top: 100px;
	margin-bottom: 290px;
`;

export const Section = styled.section`
	margin-bottom: 45px;
`;

export const SectionButton = styled.section`
	margin-left: 4px;
	margin-bottom: 15px;
`;

export const Button = styled.button`
	width: 400px;
	height: 55px;
	color: #ffffff;
	${MainBackgroundColor}
	border-radius: 10px;
	font-size: 18px;
	font-weight: 700;

	@media(max-width: 426px){
		width: 300px;
	}
`;

export const EmailButton = styled.button`
	${cursor}
	color: #666666;
	width: 100%;
	font-size: 12px;
`;
