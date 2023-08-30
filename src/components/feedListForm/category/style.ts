import styled from "styled-components";

export const CategoryBanner = styled.div`
	width: 100%;
	height: 410px;
	display: flex;
	flex-direction: column;
	justify-content: center;
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
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8%;
	button {
		color: #969696;
		height: 55px;
		width: 90px;
		cursor: pointer;
		font-size: 14px;
		font-weight: bold;
		&.active {
			color: black;
			border-bottom: 2.5px solid black; /* 원하는 클릭된 상태의 스타일을 지정하세요 */
		}
	}
`;
