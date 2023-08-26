import { Flex, cursor } from "../../common/GlobalStyle";
import  styled  from "styled-components";


export const LayoutBox = styled.main`
background-color:#f8f8f8;
`
export const LayoutInline = styled.article`
background-color:#fff;
margin: 0 auto;
max-width: 1230px;
/* ${Flex} */
`

export const EditForm = styled.form`
width: 100%;
margin : 0 auto;
${Flex}
flex-direction: column;
`

export const ProfileImg = styled.div`
	text-align: center;
	h1 {
		color : #2BB673;
		font-size: 2rem;
		padding: 70px 0 80px;
		box-sizing: border-box;
	}
	img {
		width: 110px;
		height: 110px;
		border-radius: 100%;
		object-fit: cover;
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

export const Avatar = styled.input`
	display: none;
`;

export const ResetBtn = styled.button`
color: #a1a1a1;
border-bottom : 1px solid #a1a1a1;
padding:0;
`

export const Input = styled.div`
	width: 330px;
	height: 62px;
	/* border : 1px solid #f8f8f8; */
	margin: 15px 0;
	input {
		width: 100%;
		background-color: #f8f8f8;
		margin: 2px 0;
		padding-left: 7px;
	}
`;

export const Btn = styled.div`
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
