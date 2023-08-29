import { Flex, cursor } from "../../common/GlobalStyle";
import styled from "styled-components";

export const LayoutBox = styled.main`
	background-color: #f8f8f8;
`;
export const LayoutInline = styled.article`
	background-color: #fff;
	margin: 0 auto;
	max-width: 1230px;
`;

export const EditForm = styled.form`
	width: 100%;
	margin: 0 auto;
	${Flex}
	flex-direction: column;
	div {
		margin: 10px 0;
	}
`;

export const ProfileImg = styled.div`
	text-align: center;
	margin-bottom: 50px;
	h1 {
		color: #2bb673;
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
		${cursor}
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
	position: relative;
	input {
		display: none;
	}
	margin: -110px auto 0;
	width: 110px;
	height: 110px;
	${Flex}
	span {
		position: absolute;
		bottom: 0;
		line-height: 180px;
		height: 110px;
		width: 110px;
		opacity: 0;
		z-index: 1;
		&:hover {
			opacity: 1;
			color: #fff;
		}
	}
	&:hover {
		border-radius: 100%;
		background: rgb(0, 0, 0);
		background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(2, 0, 36, 0) 90%);
	}
`;

export const EditBtn = styled.div`
	${cursor}
	position:absolute;
	bottom: 0;
	left: 53%;
	width: 30px;
	height: 30px;
	background-color: #f0f0f0;
	border-radius: 100%;
	margin: 0 auto;
	img {
		width: 30px;
		height: 30px;
		object-fit: none;
	}
`;

export const ResetBtn = styled.button`
	margin-top: 10px;
	color: #a1a1a1;
	border-bottom: 1px solid #a1a1a1;
	padding: 0;
`;

export const Btn = styled.div`
	margin: 30px auto;
	${Flex}
	flex-direction: column;
`;

export const SubmitBtn = styled.button`
	${cursor}
	background-color : #2BB673;
	width: 285px;
	height: 55px;
	color: #fff;
	border-radius: 10px;
	margin: 10px 0;
	font-size: 20px;
	font-weight: 600;
`;

export const BackBtn = styled.button`
	${cursor};
	background-color: #cdcdcd;
	width: 285px;
	height: 55px;
	color: #fff;
	border-radius: 10px;
	margin: 20px 0 100px;
	font-size: 20px;
`;
