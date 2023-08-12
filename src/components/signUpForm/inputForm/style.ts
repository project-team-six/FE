import styled from "styled-components";

export const Form = styled.form`
	margin-top: 30px;
`;

export const Input = styled.input`
	width: 330px;
	height: 40px;
	background-color: #f3f3f3;
	border-radius: 5px;

	/* 숫자 버튼 숨김 */
	-moz-appearance: textfield;
	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const Span = styled.span`
	color: red;
`;
