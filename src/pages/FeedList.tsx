import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchFeed } from "../api/feedApi";
import { LayoutBox } from "../components/common/GlobalStyle";
import { pushNotification } from "../utils/notification";

const FeedList = () => {
	const [location, setLocation] = useState("");
	const [category, setCategory] = useState("");
	const [title, setTitle] = useState("");
	const [username, setUsername] = useState("");
	const [status, setStatus] = useState("");
	const [pageNumber, setPageNumber] = useState(0);

	const {
		data: feedlist,
		error,
		isLoading,
	} = useQuery(["feedlist"], () => fetchFeed(location, category, title, username, status, pageNumber));

	if (isLoading) {
		console.log("feedlist 가져오는 중");
	}
	if (error) {
		pushNotification(`${error}`, "error");
	}

	console.log(feedlist);

	return (
		<LayoutBox>
			<FeedCard></FeedCard>
		</LayoutBox>
	);
};

export default FeedList;

const FeedCard = styled.div`
	width: 400px;
	height: 400px;
	background-color: green;
`;
