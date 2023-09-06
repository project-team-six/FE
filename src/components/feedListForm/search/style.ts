import styled from "styled-components";
import { cursor, MainBackgroundColor } from "../../common/GlobalStyle";

export const SearchFilterSection = styled.section`
	display: flex;
	align-items: center;
	justify-content:space-between;
	margin: 0 auto;
	margin-top: 50px;
	margin-bottom: 40px;
	width: 100%;
	max-width: 1200px;
	height: 75px;

	@media (max-width: 700px) {
		flex-direction: column;
		gap: 20px;
		height: 100%;
	}
`;

export const FilterBox = styled.label`
	display: flex;
	align-items: center;
	gap: 20px;
	@media (max-width: 700px) {
		margin-right: 20px;
	}
`;

export const InProgressButton = styled.button`
	width: 135px;
	height: 48px;
	border-radius: 50px;
	${cursor}
	font-size: 17px;
	font-weight: bold;
	color: #a6a6a6;
	border: 2px solid #d9d9d9;
	&.active {
		color: white;
		${MainBackgroundColor}
		border: none;
	}
`;
export const FinishButton = styled(InProgressButton)``;

export const SearchBox = styled.div`
	padding: 30px;
	display: flex;
	align-items: center;
	width: 330px;
	height: 45px;
	border-radius: 50px;
	background-color: #f5f5f5;
	img {
		width: 22px;
		height: 22px;
	}
	input {
		margin-left: 20px;
		background-color: #f5f5f5;
		width: 248px;
		height: 33px;
		outline: none;
	}
`;
