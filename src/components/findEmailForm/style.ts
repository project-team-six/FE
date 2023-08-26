import styled from "styled-components";

export const ResultDiv = styled.div`
	display: grid;
	place-items: center;
	margin-top: 40px;
`;

export const ResultImg = styled.img`
	width: 117px;
	height: 111px;
	margin-bottom: 65px;
`;

type SpanProps = {
	color: string;
};

export const Span = styled.span<SpanProps>`
	font-size: 15px;
	font-weight: 700;
	color: #${(props) => props.color};
`;

export const SpanDiv = styled.div`
	margin-bottom: 60px;
	text-align: center;
`;

export const Div = styled.div`
	margin-bottom: 10px;
`;

type ButtonProps = {
	$backgroundColor: string;
};

export const ResultBtn = styled.button<ButtonProps>`
	width: 285px;
	height: 55px;
	border-radius: 10px;
	background-color: ${(props) => props.$backgroundColor};
	color: #FFFFFF;
	font-size: 20px;
	font-weight: 700;
	margin-bottom: 35px;
`;

export const ResultSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 100px;
`;