import styled from "styled-components";
import { Flex, cursor } from "../../common/GlobalStyle";

export const Post = styled.div`
	max-width: 915px;
	margin: 0 auto 50px;
`;

export const NonPost = styled.div`
	height: 300px;
	width: 100%;
	${Flex}
	flex-direction: column;
	h1 {
		font-size: 1.5rem;
		display: block;
		margin: 15px 0;
	}
	button {
		${cursor};
		display : block;
		width: 200px;
		height: 40px;
		border: 2px solid #4fbe9f;
		border-radius: 10px;
		&:hover {
			background-color: #4fbe9f;
			border: none;
			color:#fff;
		}
	}
`;

export const ListWrapper = styled.div`
	${Flex};
    justify-content: flex-start;
	gap: 30px;
	flex-wrap: wrap;
`;

export const Feed = styled.div`
	${cursor}
	width: 285px;
	border-radius: 15px;
	/* margin : 0 auto; */
	h4,p,span {
		margin: 10px 0;
		padding: 0 5px;
	}
	img {
		width: 285px;
		height: 340px;
		border-radius: 15px;
		object-fit: cover;
	}
	h4 {font-size: 18px}
	p {font-size: 16px}
	span {
		color: #838383;
		font-size: 15px;
	}
	@media(max-width: 1000px){
		width : 250px;
		margin : 0 auto;
		img{
			width : 250px;
			height : 290px;
		}
	}
`;