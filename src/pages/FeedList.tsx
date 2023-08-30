import React, { useState } from "react";
import * as AS from "../asstes/asstes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import CategorySection from "../components/feedListForm/category/CategorySection";
import SearchFilter from "../components/feedListForm/search/SearchFilter";
import FeedCards from "../components/feedListForm/feedCards/FeedCards";
import PageNation from "../components/feedListForm/pagenation/PageNation";

const FeedList = () => {
	//카테고리 (필터)
	const [categoryObj, setCategoryObj] = useState({
		category: "",
		bannerText: "소분목록",
		categoryURL: `${AS.WHOLE}`,
	});

	const category = categoryObj.category;
	const bannerText = categoryObj.bannerText;
	const categoryURL = categoryObj.categoryURL;

	const handleCategoryChange = (category: string) => {
		switch (category) {
			case "":
				setCategoryObj({
					category: "",
					bannerText: "소분목록",
					categoryURL: `${AS.WHOLE}`,
				});
				break;
			case "FRESH_FOOD":
				setCategoryObj({
					category: "FRESH_FOOD",
					bannerText: "신선식품",
					categoryURL: `${AS.FRESH_FOOD}`,
				});
				break;
			case "BEAUTY":
				setCategoryObj({
					category: "BEAUTY",
					bannerText: "뷰티제품",
					categoryURL: `${AS.BEAUTY}`,
				});
				break;
			case "DAILY_NECESSITIES":
				setCategoryObj({
					category: "DAILY_NECESSITIES",
					bannerText: "생활용품",
					categoryURL: `${AS.DAILY_NECESSITIES}`,
				});
				break;
			case "ETC":
				setCategoryObj({
					category: "ETC",
					bannerText: "기타제품",
					categoryURL: `${AS.ETC}`,
				});
				break;
			default:
				break;
		}
	};

	//유저지역 (필터)
	const fetchLocation = useSelector((state: RootState) => {
		return state.locationSlice.userLocation;
	});
	const location = fetchLocation.sido + " " + fetchLocation.sigungu + " " + fetchLocation.dong;

	//소분완료여부 (필터)
	const [status, setStatus] = useState("");
	const handleStatusChange = (status: string) => {
		switch (status) {
			case "IN_PROGRESS":
				setStatus("IN_PROGRESS");
				break;
			case "COMPLETED":
				setStatus("COMPLETED");
				break;
			default:
				setStatus("");
				break;
		}
	};

	//제목, 내용 통합검색
	//엔터
	const [titleOrContent, setTitleOrContent] = useState("");

	const userInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleOrContent(event.target.value);
	};

	//페이지네이션
	const [totalPages, setTotalpages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	const fetchPageable = (totalPages: number) => {
		setTotalpages(totalPages);
	};
	return (
		<div>
			<CategorySection
				category={category}
				bannerText={bannerText}
				categoryURL={categoryURL}
				handleCategoryChange={handleCategoryChange}
			/>
			<SearchFilter
				titleOrContent={titleOrContent}
				status={status}
				userInputHandler={userInputHandler}
				handleStatusChange={handleStatusChange}
			/>
			<FeedCards
				location={location}
				category={category}
				status={status}
				titleOrContent={titleOrContent}
				page={currentPage}
				fetchPageable={fetchPageable}
				pageSize={12}
			/>
			<PageNation totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</div>
	);
};

export default FeedList;
