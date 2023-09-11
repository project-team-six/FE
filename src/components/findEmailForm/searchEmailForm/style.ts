import styled from "styled-components";
import { MainBackgroundColor, cursor } from "../../common/GlobalStyle";

export const MainContentWrapper = styled.div`
	margin-bottom: 45px;
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

export const PwButton = styled.button`
	${cursor}
	color: #666666;
	width: 100%;
	font-size: 12px;
`;
