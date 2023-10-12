import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { RootState } from "../../../redux/config/configStore";
import { postPopularity } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";
import * as S from "./style";
import { cog, emailIconWhite, locationpin, smileyneutral, smileywink } from "../../../asstes/asstes";
import UserProfile from "./userProfileForm/UserProfile";

const UserInfoForm = ({ mypage }: { mypage: any }) => {
	const [, setHasClicked] = useState(false);
	const navigate = useNavigate();

	// 현재 로그인된 사용자의 정보
	const userTokenInfo = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken;
	});
	
	const accountId = Number(userTokenInfo.userId); // 현재 로그인된 사용자의 ID

	const { id } = useParams();
	const userId = Number(id);
	const isAdmin = accountId === userId; // 로그인된 계정의 마이페이지인지 저장
	const profileUrl = isAdmin ? userTokenInfo.profileImageUrl : mypage && mypage.data.profileImageUrl; // 프로필 이미지 URL
	const nickname = isAdmin ? userTokenInfo.nickname : mypage && mypage.data.nickname;

	const onClickuserEditnavigate = () => {
		const userInfo = {
			userId: userId,
			nickname: `${mypage.data.nickname}`,
			phoneNumber: `${mypage.data.phoneNumber}`,
		};
		navigate(`/mypage/edit`, { state: { userInfo } });
	};
	
	const queryClient = useQueryClient();
	const popularityMutation = useMutation(postPopularity, {
		onSuccess: (response) => {
			const hasRaised = response.data.data.includes("올렸습니다");
			setHasClicked(hasRaised);
			queryClient.invalidateQueries(["mypage", id]);
		},
		onError: () => {
			pushNotification("로그인 후 이용해주세요", "error");
		},
	});
	
	// 인기도를 누르면 서버에 반영 및 횟수 올라가기
	const popularityHandler = () => {
		popularityMutation.mutate(userId);
	};

	return (
		<S.UserInfoSection>
			<UserProfile profileUrl={profileUrl} />
			<S.UserInfoBox>
				<S.NicknameBox>
					<h2>{nickname}</h2>
					{+accountId === userId ? (
						<button onClick={onClickuserEditnavigate}>
							<img src={cog} alt="회원정보 수정" />
						</button>
					) : null}
				</S.NicknameBox>
				<S.InfoBox>
					<span>
						<img src={emailIconWhite} alt="이메일아이콘" />
					</span>
					<strong>{mypage?.data?.email}</strong>
				</S.InfoBox>
				<S.InfoBox>
					<span>
						<img src={locationpin} alt="지도아이콘" />
					</span>
					{userTokenInfo.location === "" || null || undefined ? (
						<strong>지역을 설정해주세요</strong>
					) : (
						<strong>{mypage?.data?.location}</strong>
					)}
				</S.InfoBox>
			</S.UserInfoBox>
			<S.PopularityBox>
				{userId === +accountId ? (
					<img src={smileywink} alt="기본이모지" />
				) : (
					<button onClick={popularityHandler}>
						<img src={mypage?.data?.isPopularity ? smileywink : smileyneutral} alt="기본이모지" />
					</button>
				)}
				<h5>{mypage?.data?.popularity}</h5>
				<p>LIKED</p>
			</S.PopularityBox>
		</S.UserInfoSection>
	);
};

export default UserInfoForm;