import styled from "styled-components";
import { Flex, MainBackgroundColor, cursor } from "../../common/GlobalStyle";

export const PageNationSection = styled.section`
	${Flex}
	width: 100%;
	height: 100px;
	gap: 20px;
	margin-bottom: 20px;
	button {
		font-size: 14px;
		color: #a7a7a7;
		${cursor}
		&.active {
			width: 30px;
			height: 30px;
			border-radius: 100%;
			${MainBackgroundColor}
			color: white;
			font-weight: 900;
		}
	}
`;
