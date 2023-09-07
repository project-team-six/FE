import React, { useState } from "react";
import * as S from "./style";
import { moremenu, pin, pined, profileImg, report } from "../../../../asstes/asstes";
import { priceUtils } from "../../../../utils/priceUtils";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/config/configStore";
import { enterChatRoom } from "../../../../api/chatApi";
import { useMutation, useQueryClient } from "react-query";
import { pushNotification } from "../../../../utils/notification";
import ChatRoomModal from "../../../chatRoomForm/ChatRoomModal";
import { deleteFeed } from "../../../../api/feedApi";
import ReportModal from "../../../ReportForm/ReportModal";

interface TitleInfoProps {
	detailFeed: any;
	closed: boolean;
	handleCloseClick: () => void;
	pinHandler: () => void;
}

const TitleInfo: React.FC<TitleInfoProps> = ({ detailFeed, closed, handleCloseClick, pinHandler }) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isReportModalOpen, setIsReportModalOpen] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();
	const postId = Number(id); // 게시물 ID
	const authId: Number = detailFeed?.userId; // 작성자 ID
	const userInfo = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken;
	});
	const isLogin = useSelector((state: RootState) => {
		return state.tokenSlice.isLogin;
	});
	const userId: Number = Number(userInfo.userId); // 사용자 ID

	// 채팅방 연결
	const [isChatModal, setIsChatModal] = useState<boolean>(false);
	const toggleChatModal: React.MouseEventHandler = (event) => {
		event.preventDefault();
		setIsChatModal((prevModalState) => !prevModalState);
	};
	const roomMutation = useMutation(enterChatRoom, {
		onSuccess: () => {
			setIsChatModal(!isChatModal); // 채팅 모달 열기
		},
	});

	// 신고
	const reportHandler = () => {
		setIsReportModalOpen(!isReportModalOpen);
	}
	
	// 게시물 삭제
	const queryClient = useQueryClient();

	const deleteFeedMutation = useMutation(deleteFeed, {
		onSuccess: () => {
			queryClient.invalidateQueries(["mypage"])
			queryClient.invalidateQueries(["feedList"])
		},
		onError: () => {
			pushNotification("게시물 삭제 실패", "error")
		}
	})
	
	const deleteFeedHandler =()=> {
		deleteFeedMutation.mutate(postId);
		pushNotification("게시물이 삭제되었습니다", "success")
		navigate(-1)
	}

	const handleCancel = ()=> {
		setIsDeleteModalOpen(!isDeleteModalOpen);
		setIsEditModalOpen(false);
	}

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
				{userId !== authId && (
					<div>
						<button onClick={reportHandler}>
							<img src={report} alt='신고하기' />
							<p>신고하기</p>
						</button>
						{isReportModalOpen && <ReportModal postId={detailFeed.id} reportHandler={reportHandler}
							isReportModalOpen={isReportModalOpen} setIsReportModalOpen={setIsReportModalOpen} /> }
					</div>
				)}
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
				{closed ? (
					<div style={{marginTop:"30px"}}>
				<S.Btn onClick={handleCancel} color="#ccc">삭제하기</S.Btn>
				{isDeleteModalOpen && 
					<S.DeleteModalWrapBox>
						<S.DeleteModalBox>
							<p>게시물을 삭제하시겠습니까?</p>
							<div>
								<S.Btn onClick={deleteFeedHandler} color='#4fbe9f'>삭제</S.Btn>
								<S.Btn onClick={()=>{setIsDeleteModalOpen(!isDeleteModalOpen)}} color='#ccc'>취소</S.Btn>
							</div>									
						</S.DeleteModalBox>
					</S.DeleteModalWrapBox>
				}
				</div>
				) : (
					<div>
						{userId === authId ? (
							<>
							<S.ModalBox>
								<S.Modalbutton onClick={() => setIsEditModalOpen(!isEditModalOpen)}>
									<img src={moremenu} alt="수정메뉴" />
								</S.Modalbutton>
									{isEditModalOpen && 
										<S.ModalEditBox>
											<S.AuthButton onClick={() => navigate(`/feed/${postId}/edit`)}>수정하기</S.AuthButton>
											<S.AuthButton onClick={handleCloseClick}>마감하기</S.AuthButton>
											<S.AuthButton onClick={handleCancel}>삭제하기</S.AuthButton>
										</S.ModalEditBox>}
							</S.ModalBox>
							{isDeleteModalOpen && 
								<S.DeleteModalWrapBox>
									<S.DeleteModalBox>
										<p>게시물을 삭제하시겠습니까?</p>
										<div>
											<S.Btn onClick={deleteFeedHandler} color='#4fbe9f'>삭제</S.Btn>
											<S.Btn onClick={()=>{setIsDeleteModalOpen(!isDeleteModalOpen)}} color='#ccc'>취소</S.Btn>
										</div>									
									</S.DeleteModalBox>
								</S.DeleteModalWrapBox>
							}
							</>
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
								<S.Btn
									color='#4FBE9F'
									onClick={() => {
										if (!isLogin) {
											pushNotification("로그인 후 이용해주세요", "error");
										} else {
											roomMutation.mutate(detailFeed.chatroomId);
										}
									}}>
									연락하기
								</S.Btn>
								<ChatRoomModal
									postId={detailFeed.chatroomId}
									modalState={isChatModal}
									setModalState={setIsChatModal}
									modalHandle={toggleChatModal}
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
