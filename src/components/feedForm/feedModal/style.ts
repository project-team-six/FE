import styled from "styled-components";
import { cursor } from "../../common/GlobalStyle";

export const ModalLayout = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5); /* 배경색 + 투명도 조절 */
`;

export const PrecautionsLayout = styled.div`
	position: relative;
	width: 445px;
	height: 630px;
	border-radius: 20px;
	background-color: #ffffff;
`;

export const PrecautionsDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 350px;
	margin-top: 50px;
	margin-left: 32px;
	margin-right: 32px;
`;

export const PrecautionsIcon = styled.img`
	width: 30px;
	height: 30px;
`;

type SpanProps = {
	fontSize: number;
	fontWeight: string;
};

export const Span = styled.span<SpanProps>`
	font-size: ${(props) => props.fontSize}px;
	font-weight: ${(props) => props.fontWeight};
`;

export const Line = styled.div`
	margin-bottom: 8px;
`;

export const Ul = styled.ul`
	margin-top: 25px;
`;

export const Li = styled.li`
	display: flex;
	margin-bottom: 35px;
`;

export const Icon = styled.img`
	width: 10px;
	height: 20px;
	margin-right: 20px;
`;

export const ButtonDiv = styled.div`
	width: 100%;
	height: 62px;
	background-color: #2bb673;
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
	color: #e5e5e5;
	font-size: 20px;
	font-weight: 700;
	${cursor};
`;
