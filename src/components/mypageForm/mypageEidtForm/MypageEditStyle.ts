import { cursor } from "../../common/GlobalStyle";
import { styled } from "styled-components";

const EditForm = styled.form`
	width: 330px;
	margin: 0 auto;
	display: grid;
	justify-content: center;
	align-items: center;
`;

const ProfileImg = styled.div`
	/* border : 1px solid red; */
	text-align: center;
	h1 {
		font-size: 2rem;
		padding: 70px 0 80px;
		box-sizing: border-box;
	}
	img {
		width: 110px;
		height: 100px;
		border-radius: 100%;
		object-fit: cover;
	}
	span {
		display: inline-block;
		width: 110px;
		height: 110px;
		border: 1px solid #000;
		border-radius: 100%;
	}
	button {
		${cursor}
		width: 75px;
		height: 25px;
		background-color: #6f8a6b;
		color: #fff;
		border-radius: 25px;
		margin: 20px 5px;
	}
`;

const Avatar = styled.input`
	display: none;
`;

const Input = styled.div`
	width: 330px;
	height: 62px;
	/* border : 1px solid #f8f8f8; */
	margin: 15px 0;
	input {
		width: 100%;
		height: 40px;
		background-color: #f8f8f8;
		margin: 5px 0;
		padding-left: 7px;
	}
`;

const Btn = styled.div`
	margin: 20px auto;
	button {
		${cursor}
		background-color : #F1C548;
		width: 120px;
		height: 35px;
		color: #fff;
		border-radius: 25px;
		margin: 0 5px;
	}
`;

export { EditForm, ProfileImg, Avatar, Input, Btn };
