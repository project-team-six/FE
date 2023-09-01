import { Flex } from "./../../common/GlobalStyle";
import styled from "styled-components";

export const GuideSection = styled.section`
	width: 100%;
	height: 675px;
	background-color: #2bb673;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5%;
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
`;

export const TextBox = styled.div`
	text-align: center;
	width: 210px;
	height: 55px;
	font-size: 20px;
	font-weight: bold;
	color: white;
`;
