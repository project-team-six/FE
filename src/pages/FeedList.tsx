import React, { useState } from "react";
import styled from "styled-components";
import FeedCards from "../components/feedListForm/FeedCards";
import { ImSearch } from "react-icons/im";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

const FeedList = () => {
	//카테고리 (필터)
	const [category, setCategory] = useState("");
	const handleCategoryChange = (category: string) => {
		setCategory(category);
	};

	//유저지역 (필터)
	const fetchLocation = useSelector((state: RootState) => {
		return state.locationSlice.userLocation;
	});
	const location = fetchLocation.sido + " " + fetchLocation.sigungu + " " + fetchLocation.dong;

	//소분완료여부 (필터)
	const [status, setStatus] = useState("");
	const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.checked ? "IN_PROGRESS" : "");
	};

	//제목, 내용 통합검색
	const [titleOrContent, setTitleOrContent] = useState("");

	const userInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleOrContent(event.target.value);
	};

	//페이지네이션 ?.?
	const [totalPages, setTotalpages] = useState(0);
	const fetchPageable = (totalPages: number) => {
		setTotalpages(totalPages);
	};

	console.log("totalPages", totalPages);

	const [page, setPage] = useState(0);

	return (
		<div>
			<CategorySection>
				<button onClick={() => handleCategoryChange("")} className={category === "" ? "active" : ""}>
					전체
				</button>
				<button
					onClick={() => handleCategoryChange("FRESH_FOOD")}
					className={category === "FRESH_FOOD" ? "active" : ""}>
					신선식품
				</button>
				<button
					onClick={() => handleCategoryChange("BEAUTY")}
					className={category === "BEAUTY" ? "active" : ""}>
					뷰티
				</button>
				<button
					onClick={() => handleCategoryChange("DAILY_NECESSITIES")}
					className={category === "DAILY_NECESSITIES" ? "active" : ""}>
					생필품
				</button>
				<button onClick={() => handleCategoryChange("ETC")} className={category === "ETC" ? "active" : ""}>
					기타
				</button>
			</CategorySection>
			<SearchFilterSection>
				<SearchBox>
					<ImSearch style={{ marginLeft: "15px" }} />
					<input
						type='text'
						placeholder='검색어를 입력해주세요'
						value={titleOrContent}
						onChange={userInputHandler}
					/>
				</SearchBox>
				<FilterBox>
					<input type='checkbox' onChange={handleStatusChange} />
					<p>소분 진행중인 상품만 보기</p>
				</FilterBox>
			</SearchFilterSection>
			<div className='FeedListSection'>
				<FeedCards
					location={location}
					category={category}
					status={status}
					titleOrContent={titleOrContent}
					page={page}
					fetchPageable={fetchPageable}
					pageSize={12}
				/>
			</div>
			<PageNationSection>
				<MdArrowBackIos />
				{Array.from({ length: totalPages }, (_, index: number) => (
					<button key={index} onClick={() => setPage(index + 1)}>
						{index + 1}
					</button>
				))}
				<MdArrowForwardIos />
			</PageNationSection>
		</div>
	);
};

export default FeedList;

const CategorySection = styled.section`
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

const SearchFilterSection = styled.section`
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

const SearchBox = styled.div`
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

const FilterBox = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	@media (max-width: 700px) {
		margin-right: 20px;
	}
`;

const PageNationSection = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 80px;
	button {
		cursor: pointer;
	}
`;
