import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deadlineFeed, fetchFeed, postPin } from "../../../api/feedApi";
import { pushNotification } from "../../../utils/notification";
import * as S from "./style";
import ImgForm from "./DetailImgForm/ImgForm";
import TitleInfo from "./DetailInfo/TitleInfo";

const FeedDetailList = ({ closed, onClose }: { closed: boolean; onClose: (value: boolean) => void }) => {
	const navigate = useNavigate();

	const { id } = useParams();
	const postId = Number(id);

	const queryClient = useQueryClient();

	const { data: detailFeed, isLoading, isError } = useQuery(["detailFeed", postId], () => fetchFeed(postId));

	// 관심
	const pinedMutation = useMutation(postPin, {
		onSuccess: () => {
			queryClient.invalidateQueries(["detailFeed"]);
		},
		onError: () => {
			pushNotification("로그인 후 이용해주세요", "error");
		},
	});

	// 마감
	const closedClient = useQueryClient();
	const closedMutation = useMutation(deadlineFeed, {
		onSuccess: () => {
			closedClient.invalidateQueries(["detailFeed"]);
		},
		onError: () => {
			pushNotification("게시물 마감을 실패했습니다.", "error");
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;

	// 관심을 누르면 서버에 반영 및 횟수 올라가기
	const pinHandler = () => {
		pinedMutation.mutate(postId);
	};

	// 마감
	onClose(detailFeed?.isComplete);
	const handleCloseClick = () => {
		onClose(true);
		closedMutation.mutate(postId); // 서버에도 반영
	};

	//카테고리 분류
	const getCategoryName = (category: string) => {
		switch (category) {
			case "FRESH_FOOD":
				return "신선식품";
			case "BEAUTY":
				return "뷰티";
			case "DAILY_NECESSITIES":
				return "생필품";
			case "ETC":
				return "기타";
			default:
				return category;
		}
	};

	return (
		<S.LayoutBox>
			<S.DetailMain>
				<S.Category>
					<span
						onClick={() => {
							navigate("/");
						}}>
						홈
					</span>
					{` > `}
					<span
						onClick={() => {
							navigate("/feedlist");
						}}>
						{getCategoryName(detailFeed?.category)}
					</span>
					{` > `}
					<strong>{detailFeed.title}</strong>
				</S.Category>
				<S.InlineWrapper>
					<ImgForm detailFeed={detailFeed} />
					<S.InfoSection>
						<TitleInfo
							detailFeed={detailFeed}
							closed={closed}
							handleCloseClick={handleCloseClick}
							pinHandler={pinHandler}
						/>

						<S.Content>
							<div style={{ display: "flex", width: "100%" }}>
								<h1>상세 내용</h1>
								<S.Dates>
									작성일 :<span>{detailFeed?.createdAt.slice(0, 10)}</span>
									수정일 :<span>{detailFeed?.modifiedAt.slice(0, 10)}</span>
								</S.Dates>
							</div>
							<p>{detailFeed.content}</p>
						</S.Content>

						<S.DetailList>
							<li>
								<strong>거래 가능 날짜</strong>
								<span>{`${detailFeed.transactionStartDate} - ${detailFeed.transactionEndDate}`}</span>
							</li>
							<li>
								<strong>유통기한</strong>
								<span> {detailFeed.consumerPeriod}</span>
							</li>
							<li>
								<strong>제품 구매 날짜</strong>
								<span> {detailFeed.purchaseDate}</span>
							</li>
						</S.DetailList>
					</S.InfoSection>
				</S.InlineWrapper>
			</S.DetailMain>
		</S.LayoutBox>
	);
};

export default FeedDetailList;
