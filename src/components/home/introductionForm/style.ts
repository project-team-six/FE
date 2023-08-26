import styled from "styled-components";

export const IntroductionSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 115px;
	width: 100%;
	height: 1285px;
`;

export const IntroLayoutBox = styled.div`
	display: flex;
	justify-content: space-between;
	width: 80%;
	height: 440px;
`;

export const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 70px;
	h1 {
		font-size: 40px;
		font-weight: bold;
	}
	p {
		color: #4e4e4e;
		width: 455px;
		font-size: 20px;
		line-height: 38px;
	}
`;

export const IconBox = styled.div`
	width: 600px;
	height: 440px;
	border-radius: 20px;
	background-color: #f5f5f5;
`;
