import React from "react";
import { NavigateFunction, useNavigate } from "react-router";
import FeedCards from "../../feedListForm/feedCards/FeedCards";
import * as S from "./style";

const RecentPostsForm = () => {
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};
	const fetchPageable = (totalPages: number) => {
		return;
	};

	return (
		<S.RecentPostsSection>
			<S.MainTextBox>최근 게시물</S.MainTextBox>
			<FeedCards
				location={""}
				category={""}
				status={""}
				titleOrContent={""}
				page={0}
				fetchPageable={fetchPageable}
				pageSize={8}
			/>
			<S.ShowAllButton onClick={handleNavigate("/feedlist")}>더보기</S.ShowAllButton>
		</S.RecentPostsSection>
	);
};

export default RecentPostsForm;
