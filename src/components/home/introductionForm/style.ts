import styled from "styled-components";
import { Flex } from "../../common/GlobalStyle";

export const IntroductionSection = styled.section`
	${Flex}
	flex-direction: column;
	gap: 115px;
	width: 100%;
	height: 1285px;
`;

export const IntroLayoutBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 80%;
	height: 440px;
	@media (max-width: 1400px) {
		flex-direction: column;
		align-items: center;
		height: 520px;
		gap: 30px
	}
`;

export const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 70px;
	h1 {
		font-size: 40px;
		font-weight: bold;
	}
	p {
		color: #4e4e4e;
		width: 455px;
		font-size: 20px;
		line-height: 38px;
	}
	@media (max-width: 1400px) {
		gap: 30px;
		h1 {
			font-size: 30px;
		}
		p {
			font-size: 19px;
		}
	}
	@media (max-width: 545px) {
		p {
			width: 360px;
			font-size: 14px;
		}
	}
`;

export const IconBox = styled.div`
	width: 600px;
	height: 440px;
	border-radius: 20px;
	background-color: #f5f5f5;
	img {
		opacity: 0;
		transition: all 1.3s;
		position: absolute;
	}
	@media (max-width: 1400px) {
		width: 500px;
		height: 650px;
	}
	@media (max-width: 545px) {
		width: 360px;
		height: 360px;
	}
`;
