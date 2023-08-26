import styled from "styled-components";
import { mainBanner } from "../../../asstes/asstes";

export const BannerSection = styled.section`
	width: 100%;
	height: 920px;
	background-image: url(${mainBanner});
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
`;

export const StartBtn = styled.button`
	cursor: pointer;
	width: 160px;
	height: 50px;
	border: 2px solid white;
	border-radius: 10px;
	color: white;
	font-size: 18px;
	font-weight: bold;
	margin-top: 77px;
`;
