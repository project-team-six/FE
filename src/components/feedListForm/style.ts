import styled from "styled-components";

export const CategorySection = styled.section`
	width: 100%;
	height: 55px;
	border-top: 1px solid grey;
	border-bottom: 1px solid grey;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10%;
	button {
		height: 30px;
		cursor: pointer;
		font-size: 14px;
		font-weight: bold;
		&.active {
			color: #6f8a6b;
			border-bottom: 2.5px solid #6f8a6b; /* 원하는 클릭된 상태의 스타일을 지정하세요 */
		}
	}
`;

export const SearchFilterSection = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10%;
	width: 100%;
	height: 75px;
	@media (max-width: 700px) {
		flex-direction: column;
	}
`;

export const SearchBox = styled.div`
	display: flex;
	align-items: center;
	width: 300px;
	height: 35px;
	border-radius: 17.5px;
	border: 1px solid grey;
	img {
		margin-left: 5px;
		width: 25px;
		height: 25px;
	}
	input {
		margin-left: 10px;
		width: 80%;
		height: 33px;
		outline: none;
	}
`;

export const FilterBox = styled.label`
	display: flex;
	align-items: center;
	gap: 10px;
	@media (max-width: 700px) {
		margin-right: 20px;
	}
`;

export const PageNationSection = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 80px;
	button {
		cursor: pointer;
	}
`;

//FeedCards
