import React, { useState } from "react";
import * as S from "./style";
import { pin, pined, profileImg, report } from "../../../../asstes/asstes";
import { priceUtils } from "../../../../utils/priceUtils";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/config/configStore";
import { enterChatRoom } from "../../../../api/chatApi";
import { useMutation } from "react-query";
import ChatDetailModal from "../../../chatForm/chatDetailForm/ChatDetailModal";

interface TitleInfoProps {
	detailFeed: any;
	closed: boolean;
	handleCloseClick: () => void;
	pinHandler: () => void;
}

const TitleInfo: React.FC<TitleInfoProps> = ({ detailFeed, closed, handleCloseClick, pinHandler }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const postId = Number(id); // 게시물 ID
	const authId: Number = detailFeed?.userId; // 작성자 ID
	const userInfo = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken;
	});
	const userId: Number = Number(userInfo.userId); // 사용자 ID

	// 채팅방 연결
	const [isChatModal, setIsChatModal] = useState<boolean>(false);
	const roomMutation = useMutation(enterChatRoom, {
		onSuccess: () => {
			setIsChatModal(!isChatModal); // 채팅 모달 열기
		},
	});

	return (
		<div>
			<S.FeedCounter>
				<span>
					<strong>조회</strong> {detailFeed.views}
				</span>
				<span>
					<strong>관심</strong> {detailFeed.pined}
				</span>
			</S.FeedCounter>
			<S.Location>{detailFeed?.location}</S.Location>
			<S.Title>
				<h1>{detailFeed?.title}</h1>
				<button>
					<img src={report} alt='신고하기' />
					<p>신고하기</p>
				</button>
			</S.Title>
			<S.UserProfile onClick={() => navigate(`/mypage/${detailFeed.userId}`)}>
				<S.ProfileImg
					src={detailFeed.profileImageUrl === "nonImage" ? profileImg : detailFeed?.profileImageUrl}
					alt='profile'
				/>
				<h1>{detailFeed.nickname}</h1>
			</S.UserProfile>
			<S.Wapper>
				<S.Price>
					<p>
						원가
						<span>: {priceUtils(detailFeed.originPrice)}</span>
					</p>
					<h2>{priceUtils(detailFeed.price)}</h2>
				</S.Price>
				{closed ? null : (
					<div>
						{userId === authId ? (
							<S.Auth>
								<S.Btn color='#ccc' onClick={() => navigate(`/feed/${postId}/edit`)}>
									수정하기
								</S.Btn>
								<S.Btn color='#2bb673' onClick={handleCloseClick}>
									마감하기
								</S.Btn>
							</S.Auth>
						) : (
							<S.NotAuth>
								{detailFeed.isPin === true ? (
									<S.Btn onClick={pinHandler} color='#000'>
										<img src={pined} alt='관심 등록' />
									</S.Btn>
								) : (
									<S.Btn onClick={pinHandler} color='#ccc'>
										<img src={pin} alt='관심 미등록' />
									</S.Btn>
								)}
								<S.Btn color='#2bb673' onClick={() => roomMutation.mutate(detailFeed.chatroomId)}>
									연락하기
								</S.Btn>
								<ChatDetailModal
									roomId={detailFeed.chatroomId}
									isFeed={true}
									modalState={isChatModal}
									modalHandle={setIsChatModal}
								/>
							</S.NotAuth>
						)}
					</div>
				)}
			</S.Wapper>
		</div>
	);
};

export default TitleInfo;
