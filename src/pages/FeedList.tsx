import React, { useState } from "react";
import * as S from "../components/feedListForm/style";
import FeedCards from "../components/feedListForm/FeedCards";
import { ImSearch } from "react-icons/im";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

const FeedList = () => {
	//페이지네이션
	const [totalPages, setTotalpages] = useState(0);

	const fetchPageable = (totalPages: number) => {
		setTotalpages(totalPages);
	};

	const [currentPage, setCurrentPage] = useState(0);
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

	return (
		<div>
			<S.CategorySection>
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
			</S.CategorySection>
			<S.SearchFilterSection>
				<S.SearchBox>
					<ImSearch style={{ marginLeft: "15px" }} />
					<input
						type='text'
						placeholder='검색어를 입력해주세요'
						value={titleOrContent}
						onChange={userInputHandler}
					/>
				</S.SearchBox>
				<S.FilterBox>
					<input type='checkbox' onChange={handleStatusChange} />
					소분 진행중인 상품만 보기
				</S.FilterBox>
			</S.SearchFilterSection>
			<div className='FeedListSection'>
				<FeedCards
					location={location}
					category={category}
					status={status}
					titleOrContent={titleOrContent}
					page={currentPage}
					fetchPageable={fetchPageable}
					pageSize={12}
				/>
			</div>
			<S.PageNationSection>
				<MdArrowBackIos />
				{Array.from({ length: totalPages }, (_, index: number) => (
					<button key={index} onClick={() => setCurrentPage(index)}>
						{index + 1}
					</button>
				))}
				<MdArrowForwardIos />
			</S.PageNationSection>
		</div>
	);
};

export default FeedList;
