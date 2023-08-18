import styled from "styled-components";

export const ImgForm = styled.form`
	display: grid;
	align-items: center;
	text-align: center;
	gap: 20px;
`;

export const ImgFormButton = styled.div`
	display: flex;
	gap: 5px;
`;

export const Img = styled.img`
	width: 135px;
	height: 135px;
	border-radius: 50%;
`;

export const ImgInput = styled.input`
	display: none;
`;

export const CustomImgInput = styled.input.attrs({
	type: "file",
	id: "profile",
})`
	display: none;
	border-radius: 5px;
`;

export const ImgButton = styled.button`
	cursor: pointer;
	color: #ffffff;
	background-color: #6f8a6b;
	border-radius: 20px;
	width: 65px;
	height: 20px;
`;