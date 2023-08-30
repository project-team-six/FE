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
	width: 94.28px;
	height: 94.23px;
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
	bottom: 25px;
  	right: 15px;
	left: 75%;
	width: 30px;
	height: 30px;
`;

export const Line = styled.div`
	border-bottom: 1px solid #B0B0B0;
	width: 47%;
	position: absolute;
	bottom: -10px;
	right: 23px;
`;

export const ResetButton = styled.button`
	position: absolute;
	bottom: -10px; 
	right: 26px;
	color: #B0B0B0;
	width: 50%;
	font-size: 10px;
	white-space: nowrap; 
`;