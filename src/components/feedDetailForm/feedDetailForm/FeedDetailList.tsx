import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deadlineFeed, fetchFeed, postPin } from "../../../api/feedApi";
import { RootState } from "../../../redux/config/configStore";
import { pushNotification } from "../../../utils/notification";
import { priceUtils } from "../../../utils/priceUtils";
import * as S from "./style";
import { chat, pined, pin, report, profileImageDefault, leftArrow, rightArrow} from "../../../asstes/asstes";

const FeedDetailList = ({ closed, onClose }: { closed: boolean; onClose: (value: boolean) => void }) => {
	const [SelectImage, setSelectImage] = useState("");
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const navigate = useNavigate();

	const { id } = useParams();
	const postId = Number(id);

	const userInfo = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken;
	});
	console.log(userInfo)
	const userId: Number = Number(userInfo.userId); // 사용자 ID

	const queryClient = useQueryClient();

	const { data: detailFeed, isLoading, isError } = useQuery(["detailFeed", postId], () => fetchFeed(postId));

	const authId: Number = detailFeed?.userId;
	useEffect(() => {
		if (detailFeed && detailFeed.imageUrlList.length > 0) {
			setSelectImage(detailFeed.imageUrlList[0]);
		}
	}, [detailFeed]);

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

	//이미지 캐러셀
	const handleSelectImage = (image: string, index: number) => {
		setSelectImage(image);
		setSelectedImageIndex(index);
	};

	const moveLeft = () => {
		if (selectedImageIndex > 0) {
			setSelectedImageIndex(selectedImageIndex - 1);
			setSelectImage(detailFeed.imageUrlList[selectedImageIndex - 1]);
		}
	};

	const moveRight = () => {
		if (selectedImageIndex < detailFeed.imageUrlList.length - 1) {
			setSelectedImageIndex(selectedImageIndex + 1);
			setSelectImage(detailFeed.imageUrlList[selectedImageIndex + 1]);
		}
	};

	// 마감
	onClose(detailFeed?.isComplete);
	const handleCloseClick = () => {
		onClose(true);
		closedMutation.mutate(postId); // 서버에도 반영
	};
	
	return (
		<S.LayoutBox>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<S.DetailMain>
					<S.DetailTitle>
						<div>
							<h1>{detailFeed?.title}</h1>
							<p>{detailFeed?.location}</p>
						</div>
						{closed ? (
							<></>
						) : (
							<div>
								{userId === authId ? (
									<S.Auth>
										<button onClick={() => navigate(`/feed/${postId}/edit`)}>수정</button>
										<button onClick={handleCloseClick}>마감</button>
									</S.Auth>
								) : (
									<S.NotAuth>
										<button>
											<img src={chat} alt='채팅 아이콘' />
										</button>
										<button onClick={pinHandler}>
											{detailFeed.isPin === true ? (
												<img src={pined} alt='관심 후 아이콘' />
											) : (
												<img src={pin} alt='관심 아이콘' />
											)}
										</button>
										<button>
											<img src={report} alt='신고 아이콘' />
										</button>
									</S.NotAuth>
								)}
							</div>
						)}
					</S.DetailTitle>
					<S.DetailUser>
						<S.UserProfile onClick={() => navigate(`/mypage/${detailFeed.userId}`)}>
							<div className='profile-img'>
								<img
									src={
										userInfo.profileImageUrl !== undefined
											? userInfo.profileImageUrl
											: profileImageDefault
									}
									alt='profile'
								/>
							</div>
							<div>
								<h1>{detailFeed.nickname}</h1>
							</div>
						</S.UserProfile>
						<S.Dates>
							<div>
								{" "}
								작성일 : <span>{detailFeed?.createdAt.slice(0, 10)}</span>
							</div>
							<div>
								{" "}
								수정일 : <span>{detailFeed?.modifiedAt.slice(0, 10)}</span>
							</div>
						</S.Dates>
					</S.DetailUser>
					<S.DetailList>
						<div>
							<img src={SelectImage} alt='선택된된 이미지' />
							<S.ImageList>
								<img
									src={leftArrow}
									alt='왼쪽 화살표'
									onClick={moveLeft}
								/>
								{detailFeed?.imageUrlList.map((image: string, index: number) => {
									return (
										<img
											key={index}
											src={image}
											alt='업로드된 이미지'
											onClick={() => {
												handleSelectImage(image, index);
											}}
											className={selectedImageIndex === index ? "selectedImage" : ""}
										/>
									);
								})}
								<img
									src={rightArrow}
									alt='오른쪽 화살표'
									onClick={moveRight}
								/>
							</S.ImageList>
						</div>
						<div>
							<h2>
								{priceUtils(detailFeed.price)}
							</h2>
							<p>
								원가 <span> : {priceUtils(detailFeed.originPrice)}</span>
							</p>
							<p>
								거래가능날짜 :&nbsp;
								{detailFeed.transactionStartDate} - {detailFeed.transactionEndDate}
							</p>
							<p>
								유통기한 <span> : {detailFeed.consumerPeriod}</span>
							</p>
							<p>
								구매날짜 <span> : {detailFeed.purchaseDate}</span>
							</p>
						</div>
					</S.DetailList>
					<S.DetailContent>
						{detailFeed.content}
						<p>
							<span>
								<strong>조회</strong> {detailFeed.views}{" "}
							</span>
							<span>
								<strong>관심</strong> {detailFeed.pined}{" "}
							</span>
						</p>
					</S.DetailContent>
				</S.DetailMain>
			)}
		</S.LayoutBox>
	);
};

export default FeedDetailList;
