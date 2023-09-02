import styled from "styled-components";

export const FeedListSection = styled.section`
	width: 1280px;
	margin: 0 auto;
	display: flex;
	gap: 3%;
	flex-wrap: wrap;
`;

export const FeedCard = styled.div`
	display: flex;
	flex-direction: column;
	width: 285px;
	height: 465px;
	border-radius: 16px;
	margin-bottom: 55px;
	cursor: pointer;
`;

export const FeedImageBox = styled.div`
	height: 340px;
	img {
		border-radius: 15px;
		width: 100%;
		height: 340px;
	}
`;

export const FeedInfoBox = styled.div``;

export const UserLocationTimeBox = styled.div`
	display: flex;
	align-items: center;
	height: 25px;
	p {
		font-size: 14px;
		color: #838383;
	}
`;

export const ContentBox = styled.div`
	width: 100%;
	margin-top: 25px;
	margin-bottom: 6px;
	p {
		font-size: 17px;
	}
`;

export const PriceBox = styled.div`
	margin-bottom: 8px;
	p {
		font-size: 20px;
		font-weight: bold;
	}
`;
