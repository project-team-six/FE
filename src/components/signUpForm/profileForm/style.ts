import styled from "styled-components";

export const ImgForm = styled.form`
	display: grid;
	align-items: center;
	text-align: center;
	gap: 20px;
	margin-bottom: 45px;
`;

export const ImgFormButton = styled.div`
	display: flex;
	position: relative;
`;

export const Img = styled.img`
	width: 135px;
	height: 135px;
	border-radius: 50%;
`;

export const CustomImgInput = styled.input.attrs({
	type: "file",
	id: "profile",
})`
	display: none;
	border-radius: 5px;
`;

export const ImgButton = styled.button`
	border: none;
	background: none;
	padding: 0;
	cursor: pointer;
	position: absolute;
	bottom: 15px;
  	right: 15px;
	left: 70%;
	width: 30px;
	height: 30px;
`;

export const ResetButton = styled.button`
	position: absolute;
	bottom: -10px;
	right: 35px;
	color: #A1A1A1;
	border-bottom: 1px solid #A1A1A1;
	width: 50%;
	font-size: 10px;
`;