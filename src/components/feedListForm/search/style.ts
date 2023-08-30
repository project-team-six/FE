import styled from "styled-components";

export const SearchFilterSection = styled.section`
	display: flex;
	align-items: center;
	gap: 50%;
	margin: 0 auto;
	margin-top: 50px;
	margin-bottom: 40px;
	width: 1280px;
	height: 75px;
	@media (max-width: 700px) {
		flex-direction: column;
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
	font-size: 17px;
	font-weight: bold;
	color: #a6a6a6;
	border: 2px solid #d9d9d9;
	&.active {
		color: white;
		background-color: #2bb673;
		border: none;
	}
`;
export const FinishButton = styled(InProgressButton)``;

export const SearchBox = styled.div`
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
		width: 80%;
		height: 33px;
		outline: none;
	}
`;
