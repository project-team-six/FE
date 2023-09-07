import { addPhotoChatRoom } from "./../../../api/chatApi";
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
	p {
		font-size: 40px;
		top: 70px;
	}
	@media (max-width: 1400px) {
		gap: 1%;
	}
	@media (max-width: 1100px) {
		height: 500px;
	}
	@media (max-width: 800px) {
		height: 400px;
		p {
			font-size: 30px;
		}
	}
	@media (max-width: 530px) {
		height: 300px;
		p {
			font-size: 20px;
			top: 30px;
		}
	}
`;

export const StepGuideBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 50px;
	margin-top: 70px;
	@media (max-width: 800px) {
		gap: 20px;
	}
	@media (max-width: 530px) {

	}
`;

export const IconCircleBox = styled.div`
	${Flex}
	width: 285px;
	height: 285px;
	border-radius: 100%;
	background-color: white;
	margin-top: 50px;
	@media (max-width: 1100px) {
		width: 200px;
		height: 200px;
	}
	@media (max-width: 800px) {
		width: 140px;
		height: 140px;
	}
	@media (max-width: 530px) {
		width: 90px;
		height: 90px;
	}
`;

export const TextBox = styled.div`
	text-align: center;
	width: 210px;
	height: 55px;
	font-size: 20px;
	font-weight: bold;
	color: white;
	@media (max-width: 800px) {
		width: 140px;
		height: 100px;
		font-size: 15px;
	}
	@media (max-width: 530px) {
		width: 120px;
		height: 70px;
		font-size: 11px;
	}
`;

export const ArrowImg = styled.img`
	width: 64px;
	height: 64px;
	@media (max-width: 800px) {
		width: 40px;
		height: 40px;
	}
	@media (max-width: 530px) {
		width: 20px;
		height: 20px;
	}
`