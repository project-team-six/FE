import styled from "styled-components";
import { Flex } from "./GlobalStyle";

// Header Style
export const HeaderBox = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
`;

export const LogoSection = styled.section`
	display: flex;
	cursor: pointer;
	img {
		margin-left: 20px;
		width: 130px;
		height: 50px;
	}
`;

export const SignButton = styled.button`
	cursor: pointer;
	width: 65px;
	height: 30px;
	border-radius: 6px;
	&:hover {
		background-color: #6f8a6b;
		color: white;
	}
`;

export const NavButton = styled.button`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 39px;
	border-radius: 100%;
	background-color: #6f8a6b;
	&:hover {
	}
`;

export const NavBtnSection = styled.section`
	display: flex;
`;

// Footer Style

export const FooterLayout = styled.div`
	width: 100%;
	margin: 0 auto;
	height: 180px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	h6 {
		font-size: 14px;
		margin-bottom: 15px;
	}
`;

export const FooterBox = styled.div`
	width: 1280px;
	align-items: center;
	display: flex;
	gap: 220px;
`;

export const SummarySection = styled.section`
	width: 360px;
	display: flex;
	flex-direction: column;
	text-align: justify;
	img {
		width: 170px;
		height: 60x;
	}
	p {
		font-size: 13px;
	}
`;
export const DetailSection = styled.section`
	display: flex;
	padding-top: 20px;
	gap: 90px;
`;

export const MemberItem = styled.li`
	font-size: 12px;
	margin-bottom: 5px;
`;
export const PageNavBtn = styled.button`
	display: flex;
	flex-direction: column;
	font-size: 12px;
	margin-bottom: 5px;
`;

//ProfileModal Style
export const ProfileLayout = styled.div`
	position: absolute;
	right: 40px;
	top: 50px;
	border: 1.6px solid #6f8a6b;
	width: 320px;
	height: 340px;
	background-color: white;
	border-radius: 14px;
	z-index: 99;
`;

export const UserInfoSection = styled.section`
	display: flex;
	align-items: center;
	padding-left: 15px;
	gap: 15px;
	height: 90px;
	border-bottom: 0.5px solid grey;
`;

export const ProfileImgBox = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 100%;
	${Flex}
	img {
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
`;

export const NicknameBox = styled.div`
	p {
		font-size: 15px;
	}
	margin-right: 50px;
`;

export const ModalNavSection = styled.section`
	height: 300px;
`;

export const ModalButton = styled.button`
	display: flex;
	align-items: center;
	gap: 20px;
	padding-left: 20px;
	height: 62px;
	width: 100%;
	cursor: pointer;
	&:hover {
		background-color: rgba(111, 138, 107, 0.1);
	}
	img {
		height: 16px;
		width: 16px;
	}
	p {
		font-size: 15px;
	}
`;
