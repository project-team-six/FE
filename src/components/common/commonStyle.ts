import styled from "styled-components";
import { Flex } from "./GlobalStyle";

// Header Style
export const HeaderLayout = styled.div`
	width: 95%;
	margin: 0 auto;
	border-bottom: 1px solid black;
`;

export const LogoSection = styled.section`
	img {
		width: 100px;
		height: 50px;
	}
`;
export const LocationSetSection = styled.section``;
export const NavBtnSection = styled.section`
	${Flex}
`;

// Footer Style
export const FooterLayout = styled.div`
	width: 95%;
	margin: 0 auto;
	height: 270px;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	h3 {
		font-size: 20px;
		margin-bottom: 15px;
	}
`;

export const SummarySection = styled.section`
	width: 345px;
	display: flex;
	flex-direction: column;
	text-align: justify;
	img {
		width: 200px;
	}
`;
export const DetailSection = styled.section`
	display: flex;
	gap: 60px;
`;

export const MemberItem = styled.li`
	margin: 10px 0;
`;
export const PageNavBtn = styled.button`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
`;
