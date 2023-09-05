import styled from "styled-components";
import { cursor } from "../common/GlobalStyle";

export const ModalLayout = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
`;

export const ChatLayout = styled.div`
	position: absolute;
	right: 16%;
	top: 8%;
	width: 375px;
	height: 70%;
	min-height: 320px;
	max-height: 812px;
	border: 1px solid #d3d3d3;
	background-color: white;
	border-radius: 15px;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	z-index: 998;
`;

export const HeaderSection = styled.section`
	width: 100%;
	height: 70px;
	z-index: 998;
	border-bottom: 1px solid #EEEEEE;
`;

export const MainSection = styled.section`
	margin-top: auto;
	overflow-y: auto;
	height: 85%;
	max-height: 100%;
	min-height: 10%;
`;

export const InputSection = styled.section`
	position: sticky;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-left: 7px;
	background-color: #F1F1F1;
	height: 70px;
	z-index: 999;
`;

type BelowButtonProps = {
	show: boolean;
};

export const BelowButton = styled.button<BelowButtonProps>`
	position: absolute;
	bottom: 5%;
	right: 7%;
	display: ${(props) => (props.show ? "block" : "none")};
	${cursor};
`;