import styled from "styled-components";
import { Flex, MainBackgroundColor, cursor } from "../../common/GlobalStyle";

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
	${Flex};
	flex-direction: column;
	div {
		margin: 10px 0;
	}
`;

export const BtnBox = styled.div`
	margin: 30px auto;
	${Flex}
	flex-direction: column;
`;

export const SubmitButton = styled.button`
	${cursor};
	${MainBackgroundColor};
	width: 400px;
	height: 55px;
	color: #fff;
	border-radius: 10px;
	margin: 10px 0;
	font-size: 20px;
	font-weight: 600;
`;

export const BackButton = styled.button`
	${cursor};
	background-color: #cdcdcd;
	width: 400px;
	height: 55px;
	color: #fff;
	border-radius: 10px;
	margin: 20px 0 100px;
	font-size: 20px;
`;