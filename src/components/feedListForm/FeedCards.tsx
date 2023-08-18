import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { fetchFeedList } from "../../api/feedApi";
import { pushNotification } from "../../utils/notification";

const FeedCards = ({
	location,
	category,
	status,
	titleOrContent,
	page,
	fetchPageable,
	pageSize,
}: {
	location: string;
	category: string;
	status: string;
	titleOrContent: string;
	page: number;
	fetchPageable: (page: number) => void;
	pageSize: number;
}) => {
	const {
		data: feedList,
		isLoading,
		isError,
	} = useQuery(["feedList", location, category, status, titleOrContent, page], () =>
		fetchFeedList(location, category, status, titleOrContent, page)
	);

	const navigate = useNavigate();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

	fetchPageable(feedList.totalPages);

	const formatTimeDifference = (dateString: string) => {
		const currentDate = new Date();
		const targetDate = new Date(dateString);
		const timeDifference = currentDate.getTime() - targetDate.getTime();

		if (timeDifference < 60 * 60 * 1000) {
			const minutesAgo = Math.floor(timeDifference / (60 * 1000));
			return `${minutesAgo} minutes ago`;
		} else if (timeDifference < 24 * 60 * 60 * 1000) {
			const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
			return `${hoursAgo} hours ago`;
		} else {
			const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
			return `${daysAgo} days ago`;
		}
	};

	const handleNavigate = (path: string) => () => {
		navigate(path);
	};

	return (
		<FeedListSection>
			{feedList.content.slice(0, pageSize).map((item: any) => (
				<div key={item.id}>
					<FeedCard onClick={handleNavigate(`/feed/${item.id}`)}>
						<FeedImageBox>
							<img src={item.imageUrlList[0]} alt='게시글첫번째사진' />
						</FeedImageBox>
						<FeedInfoBox>
							<UserLocationTimeBox>
								<p>{item.location}</p>
								<p>{formatTimeDifference(item.createdAt)}</p>
							</UserLocationTimeBox>
							<ContentBox>
								<p style={{ fontWeight: "700" }}>{item.title}</p>
								<p
									className='ellipsis'
									style={{
										width: "255px",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}>
									{item.content}
								</p>
							</ContentBox>
							<div className='priceBox'>
								<p>{item.price}</p>
							</div>
						</FeedInfoBox>
					</FeedCard>
				</div>
			))}
		</FeedListSection>
	);
};

export default FeedCards;

const FeedListSection = styled.section`
	width: 1200px;
	margin: 0 auto;
	display: flex;
	gap: 5%;
	flex-wrap: wrap;
`;

const FeedCard = styled.div`
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

const FeedImageBox = styled.div`
	img {
		border-radius: 16px 16px 0 0;
		width: 100%;
		height: 275px;
	}
`;

const FeedInfoBox = styled.div`
	height: 100px;
`;

const UserLocationTimeBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 25px;
	p {
		font-size: 10px;
		color: grey;
	}
`;

const ContentBox = styled.div`
	width: 100%;
	height: 55px;
`;
