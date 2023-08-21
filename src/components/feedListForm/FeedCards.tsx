import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import * as S from "./style";
import { fetchFeedList } from "../../api/feedApi";
import { priceUtils } from "../../utils/priceUtils";

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
	//게시물 조회
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

	//전체페이지 갯수
	fetchPageable(feedList.totalPages);

	//시간포맷함수
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
			{feedList.content.slice(0, pageSize).map((item: any) => (
				<div key={item.id}>
					<S.FeedCard onClick={handleNavigate(`/feed/${item.id}`)}>
						<S.FeedImageBox>
							<img src={item.imageUrlList[0]} alt='게시글첫번째사진' />
						</S.FeedImageBox>
						<S.FeedInfoBox>
							<S.UserLocationTimeBox>
								<p>{item.location}</p>
								<p>{formatTimeDifference(item.createdAt)}</p>
							</S.UserLocationTimeBox>
							<S.ContentBox>
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
							</S.ContentBox>
							<div className='priceBox'>
								<p>{priceUtils(item.price)}</p>
							</div>
						</S.FeedInfoBox>
					</S.FeedCard>
				</div>
			))}
		</S.FeedListSection>
	);
};

export default FeedCards;
