import styled from "styled-components";
import { MainBackgroundColor } from "../../common/GlobalStyle";

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
`;

export const PwButton = styled.button`
	cursor: pointer;
	color: #666666;
	width: 100%;
	font-size: 12px;
`;
