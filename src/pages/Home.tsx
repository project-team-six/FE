import React from "react";
import { NavigateFunction, useNavigate } from "react-router";
import styled from "styled-components";
import { Flex } from "../components/common/GlobalStyle";
import FeedCards from "../components/feedListForm/FeedCards";

const Home = () => {
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	const fetchPageable = (totalPages: number) => {
		return;
	};

	return (
		<div>
			<BannerSection></BannerSection>
			<MainFeedSection>
				<MainTextBox>최근 게시물</MainTextBox>
				<FeedCards
					location={""}
					category={""}
					status={""}
					titleOrContent={""}
					page={0}
					fetchPageable={fetchPageable}
					pageSize={8}
				/>
			</MainFeedSection>
			<ShowAllButton>
				<button onClick={handleNavigate("/feedlist")}>전체보기</button>
			</ShowAllButton>
		</div>
	);
};

export default Home;

const BannerSection = styled.section`
	width: 100%;
	height: 295px;
	background-color: beige;
	img {
		width: 100%;
		height: 100%;
	}
`;

const MainFeedSection = styled.section`
	width: 1200px;
	margin: 0 auto;
	display: flex;
	gap: 5%;
	flex-wrap: wrap;
`;

const MainTextBox = styled.div`
	margin-top: 35px;
	font-size: 20px;
`;

const ShowAllButton = styled.div`
	display: flex;
	height: 80px;
	justify-content: center;
	align-items: center;
	padding-bottom: 50px;
	button {
		cursor: pointer;
		font-size: 20px;
		&:active {
			color: #6f8a6b;
			border-bottom: 2.5px solid #6f8a6b; /* 원하는 클릭된 상태의 스타일을 지정하세요 */
		}
	}
`;
