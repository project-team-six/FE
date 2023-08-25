import React from "react";
import { NavigateFunction, useNavigate } from "react-router";
import styled from "styled-components";
import { mainBanner } from "../asstes/asstes";
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
			<BannerSection>
				<h1 style={{ paddingTop: "120px" }}>나누고 나눠지는</h1>
				<h1 style={{ paddingBottom: "50px" }}>1인가구를 위한 소분 커뮤니티</h1>
				<p>
					<span>소분소분</span>은 제품 종류와 상관없이 사용자들이 함께 나누고 소통하는 공간을 제공합니다.
				</p>
				<p>식품부터 일회용품까지, 소비의 의미를 새롭게 만나보세요.</p>
				<StartBtn>시작하기</StartBtn>
			</BannerSection>
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
			<ShowAllButtonBox>
				<button onClick={handleNavigate("/feedlist")}>우리지역 소분목록보기</button>
			</ShowAllButtonBox>
		</div>
	);
};

export default Home;

const BannerSection = styled.section`
	width: 100%;
	height: 920px;
	background-image: url(${mainBanner});
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	h1 {
		font-size: 65px;
		color: white;
	}
	p,
	span {
		font-size: 16px;
		color: white;
	}
	span {
		font-weight: bold;
	}
`;

const StartBtn = styled.button`
	cursor: pointer;
	width: 160px;
	height: 50px;
	border: 2px solid white;
	border-radius: 10px;
	color: white;
	font-size: 18px;
	font-weight: bold;
	margin-top: 77px;
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

const ShowAllButtonBox = styled.div`
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
		&:hover {
			color: #6f8a6b;
			border-bottom: 2.5px solid #6f8a6b; /* 원하는 클릭된 상태의 스타일을 지정하세요 */
		}
	}
`;
