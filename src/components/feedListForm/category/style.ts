import { cursor } from './../../common/GlobalStyle';
import styled from "styled-components";
import { Flex } from "../../common/GlobalStyle";

type CategoryBannerProps = {
	backgroundImage: string;
};

export const CategoryBanner = styled.div<CategoryBannerProps>`
	width: 100%;
	min-width: 375px;
	height: 410px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-image: ${props => props.backgroundImage};
	background-size: cover;
	background-repeat: no-repeat;
`;

type PProps = {
	color: string;
	$fontSize: string;
	$fontWeight: string;
	$margin: string;
};
export const Paragraph = styled.p<PProps>`
	color: ${(props) => props.color};
	font-size: ${(props) => props.$fontSize};
	font-weight: ${(props) => props.$fontWeight};
	margin: ${(props) => props.$margin};
`;

export const CategoryChoice = styled.section`
	width: 80%;
	margin: 0 auto;
	margin-top: 70px;
	height: 55px;
	border-bottom: 1px solid #dcdcdc;
	${Flex}
	gap: 8%;
	button {
		color: #969696;
		height: 55px;
		width: 90px;
		${cursor}
		font-size: 14px;
		font-weight: bold;
		&.active {
			color: black;
			border-bottom: 2.5px solid black; /* 원하는 클릭된 상태의 스타일을 지정하세요 */
		}
	}
`;
