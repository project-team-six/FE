import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import * as S from "./style";
import { fetchFeedList } from "../../../api/feedApi";
import { useCallback, useEffect } from "react";
import { priceUtils } from "../../../utils/priceUtils";

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
	fetchPageable: (totalPages: number) => void;
	pageSize: number;
}) => {
	//게시물 조회
	const {
		data: feedList,
		isLoading,
		isError,
	} = useQuery(["feedList", location, category, status, titleOrContent, page], () =>
		fetchFeedList(location, category, status, titleOrContent, page)
	);

	const navigate = useNavigate();

	// fetchPageable 함수를 불필요한 재렌더링을 방지하기 위해 useCallback으로 래핑합니다.
	const memoizedFetchPageable = useCallback(fetchPageable, [fetchPageable]);

	// 의존성 배열을 업데이트하여 useEffect 사용
	useEffect(() => {
		if (feedList) {
			memoizedFetchPageable(feedList.totalPages);
		}
	}, [feedList, memoizedFetchPageable, fetchPageable]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

	// 시간포맷함수
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
		<S.FeedListSection>
			{feedList && feedList.content && feedList.content.slice(0, pageSize).map((item: any) => (
				<div key={item.id}>
					<S.FeedCard onClick={handleNavigate(`/feed/${item.id}`)}>
						<S.FeedImageBox>
							<img src={item.imageUrlList[0]} alt='게시글첫번째사진' />
						</S.FeedImageBox>
						<S.FeedInfoBox>
							<S.ContentBox>
								<p
									className='ellipsis'
									style={{
										width: "285px",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}>
									{item.title}
								</p>
							</S.ContentBox>
							<S.PriceBox>
								<p>{priceUtils(item.price)}</p>
							</S.PriceBox>
							<S.UserLocationTimeBox>
								<p>{item.location}</p>
								<p>ㅣ</p>
								<p>{formatTimeDifference(item.createdAt)}</p>
							</S.UserLocationTimeBox>
						</S.FeedInfoBox>
					</S.FeedCard>
				</div>
			))}

		</S.FeedListSection>
	);
};

export default FeedCards;
