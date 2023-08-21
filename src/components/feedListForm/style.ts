import styled from "styled-components";

//FeedList

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
export const FeedListSection = styled.section`
	width: 1200px;
	margin: 0 auto;
	display: flex;
	gap: 5%;
	flex-wrap: wrap;
`;

export const FeedCard = styled.div`
	display: flex;
	flex-direction: column;
	width: 255px;
	height: 390px;
	border-radius: 16px;
	margin-bottom: 55px;
	&:hover {
		cursor: pointer;
		-webkit-box-shadow: 1px 4px 4px 0px rgba(153, 149, 149, 1);
	}
`;

export const FeedImageBox = styled.div`
	img {
		border-radius: 16px 16px 0 0;
		width: 100%;
		height: 275px;
	}
`;

export const FeedInfoBox = styled.div`
	height: 100px;
`;

export const UserLocationTimeBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 25px;
	p {
		font-size: 10px;
		color: grey;
	}
`;

export const ContentBox = styled.div`
	width: 100%;
	height: 55px;
`;
