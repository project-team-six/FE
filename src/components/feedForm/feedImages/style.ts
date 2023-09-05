import styled from "styled-components";
import { Flex, cursor } from "../../common/GlobalStyle";

export const MainContentWrapper = styled.div`
	max-width: 1920px;
	min-width: 1280px;
	width: 100%;
`;

export const ImageSection = styled.section`
	display: flex;
	margin-left: 110px;

	@media (max-width: 800px) {
		display: flex;
		flex-direction: column;
	}
`;

export const ImageAddDiv = styled.div`
	width: 126px;
	height: 126px;
	background-color: #fbfbfb;
	border: 1px solid #4fbe9f;
	border-radius: 5px;
`;

export const ImageLabel = styled.label`
	width: 126px;
	height: 126px;
	${Flex}
	flex-direction: column;
	${cursor}
`;

export const ImageLabelSpan = styled.span`
	margin-top: 10px;
	color: #4fbe9f;
`;

export const ImageAddInput = styled.input`
	display: none;
`;

export const ImageContainer = styled.div`
	position: relative;
`;

export const ImagePreviewWrapper = styled.div`
	position: relative;
	display: inline-block;
`;

export const PreviewImg = styled.img`
	width: 126px;
	height: 126px;

	margin-right: 33px;
`;

export const DeleteButtonDiv = styled.div`
	position: absolute;
	top: 49%;
	left: 40%;
	width: 126px;
	height: 126px;
	transform: translate(-50%, -50%);
	border: none;
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
	background-color: rgba(0, 0, 0, 0.5);

	${ImageContainer}:hover & {
		opacity: 1;
	}
`;

export const DeleteButton = styled.button`
	cursor: pointer;
	align-items: center;
	width: 100%;
	height: 100%;
`;
