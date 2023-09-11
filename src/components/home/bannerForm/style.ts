import styled from "styled-components";
import { mainBanner } from "../../../asstes/asstes";
import { cursor, Flex } from "../../common/GlobalStyle";

export const BannerSection = styled.section`
	width: 100%;
	height: 920px;
	background-image: url(${mainBanner});
	${Flex}
	flex-direction: column;
	h1 {
		font-size: 65px;
		color: white;
		font-family: "NEXON Lv1 Gothic OTF";
	}
	p,
	span {
		font-size: 16px;
		color: white;
	}
	span {
		font-weight: bold;
	}
	@media (max-width: 950px) {
		h1 {
			font-size: 40px;
		}
		p,
		span {
			font-size: 14px;
			color: white;
		}
	}
	@media (max-width: 515px) {
		h1 {
			font-size: 25px;
		}
		p,
		span {
			font-size: 10px;
			color: white;
		}
	}
`;

export const StartButton = styled.button`
	${cursor}
	width: 160px;
	height: 50px;
	border: 2px solid white;
	border-radius: 10px;
	color: white;
	font-size: 18px;
	font-weight: bold;
	margin-top: 77px;
	transition: box-shadow 400ms ease-in-out, color 300ms ease-in-out;
	&:hover {
		background-color: white;
		color: grey;
	}
`;
