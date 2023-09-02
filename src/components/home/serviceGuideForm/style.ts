import { Flex, MainBackgroundColor } from "./../../common/GlobalStyle";
import styled from "styled-components";

export const GuideSection = styled.section`
	width: 100%;
	height: 675px;
	${MainBackgroundColor}
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5%;
	@media (max-width: 700px) {
		height: 500px;
	}
`;

export const StepGuideBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 50px;
	margin-top: 70px;
`;

export const IconCircleBox = styled.div`
	${Flex}
	width: 285px;
	height: 285px;
	border-radius: 100%;
	background-color: white;
	margin-top: 50px;
	@media (max-width: 700px) {
		width: 205px;
		height: 205px;
	}
`;

export const TextBox = styled.div`
	text-align: center;
	width: 210px;
	height: 55px;
	font-size: 20px;
	font-weight: bold;
	color: white;
`;
