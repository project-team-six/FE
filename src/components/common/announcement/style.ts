import styled from "styled-components";

export const SpanDiv = styled.div`
	width: 100%;
	margin-bottom: 65px;
`;

type SpanProps = {
	color: string;
	$borderBottom?: string;
};

export const Span = styled.span<SpanProps>`
	font-size: 24px;
	font-weight: 700;
	color: #${(props) => props.color};
	border-bottom: ${(props) => props.$borderBottom};
`;