import styled from "styled-components";
import { Flex, cursor } from "../../../common/GlobalStyle";

export const ProfileImg = styled.div`
	text-align: center;
	margin-bottom: 50px;
	h1 {
		color: #4fbe9f;
		font-size: 2rem;
		padding: 70px 0 80px;
		box-sizing: border-box;
	}

	span {
		display: inline-block;
		width: 110px;
		height: 110px;
		border-radius: 100%;
	}
	button {
		${cursor};
	}
`;

export const ImgBox = styled.div`
	position: relative;
	img {
		width: 110px;
		height: 110px;
		border-radius: 100%;
		object-fit: cover;
	}
`;

export const Avatar = styled.div`
	display: none;
	position: relative;
	input {
		display: none;
	}
	margin: 0 auto;
	${Flex};
`;

export const EditBtn = styled.div`
	${cursor}
	position:absolute;
	bottom: 0;
	left: 70%;
	width: 30px;
	height: 30px;
	border-radius: 100%;
	margin: 0 auto;
	img {
		width: 24px;
		height: 24px;
		object-fit: none;
	}
`;

export const ResetBtn = styled.button`
	margin-top: 10px;
	color: #a1a1a1;
	border-bottom: 1px solid #a1a1a1;
	padding: 0;
`;