import styled from "styled-components";
import { cursor, MainBackgroundColor } from "../../common/GlobalStyle";

export const ModalLayout = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.5); /* 배경색 + 투명도 조절 */
`;

export const PrecautionsLayout = styled.div`
	position: relative;
	width: 457px;
	height: 606px;
	border-radius: 20px;
	background-color: #ffffff;
`;

export const PrecautionsDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 47px 34px 20px 34px;
`;

export const TitleDiv = styled.div`
	margin-bottom: 30px;
	display: flex;
	justify-content: center;
`;

type SpanProps = {
	fontSize: number;
	fontWeight: string;
};

export const Span = styled.span<SpanProps>`
	font-size: ${(props) => props.fontSize}px;
	font-weight: ${(props) => props.fontWeight};
`;

export const Li = styled.li`
	padding: 15px 25px 15px 25px;
	display: flex;
	width: 390px;
	height: 66px;
	background-color: #f8f8f8;
	margin-bottom: 17px;
	border-radius: 20px;
`;

export const Icon = styled.img`
	width: 30px;
	height: 30px;
	margin-right: 20px;
`;

export const ButtonDiv = styled.div`
	width: 100%;
	height: 70px;
	${MainBackgroundColor}
	border-radius: 0 0 20px 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	${cursor};
`;

export const Button = styled.button`
	width: 100%;
	height: 100%;
	align-items: center;
	text-align: center;
	color: #cccccc;
	font-size: 20px;
	font-weight: 700;
	${cursor};
`;
