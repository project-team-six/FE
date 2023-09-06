import styled from "styled-components";
import { Flex, MainBackgroundColor, cursor } from "../../common/GlobalStyle";

export const UserInfoWrapper = styled.section`
	margin: 0 auto;
	${Flex};
	max-width:915px;
	min-width: 200px;
	height: 320px;
	width: 100%;
	${MainBackgroundColor};
	border-radius: 20px;
	@media (max-width: 600px) {
		flex-direction: column;
		max-width : 450px;
		height : 400px;
	}
`;

export const UserInfo = styled.section`
	width: 340px;
	margin-right: 10px;
	h2,h4,strong,span {color: #fff}
	@media(max-width: 600px){
		width : 200px;
	}
`;

export const Nickname = styled.div`
	${Flex};
	justify-content: flex-start;
	
	h2 {
		font-size: 24px;
		margin-right: 20px;
	}
	button {${cursor}}
	@media(max-width: 600px){
		justify-content:space-between;
	}
`;

export const Info = styled.div`
	${Flex}
	justify-content: flex-start;
	align-items: center;
	margin: 20px 0;
	strong {
		display: inline-block;
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		font-weight: normal;
	}
	span img {
		object-fit: contain;
		height: 24px;
		display: inline-block;
		width: 24px;
		margin-right: 20px;
	}
`;

export const Popularity = styled.section`
	width: 270px;
	height: 100%;
	border-left: 2px solid #fff;
	background-color: #70CBB1;
	${Flex}
	flex-direction: column;
	border-radius: 0 20px 20px 0;
	h5,
	p {color: #fff}
	h5 {font-size: 36px;}
	p {
		font-size: 20px;
		margin: 5px 0;
	}
	button {${cursor}}
	@media(max-width: 600px){
		max-width : 450px;
		width : 100%;
		border-left : none;
		border-top : 2px solid #fff;
		border-radius: 0 0 20px 20px;
		flex-direction : row;
		gap : 10%;
	}
`;