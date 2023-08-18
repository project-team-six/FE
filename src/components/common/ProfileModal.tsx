import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router";
import { RootState } from "../../redux/config/configStore";
import * as St from "../common/commonStyle";
import { pushNotification } from "../../utils/notification";
import { setLocation } from "../../redux/modules/locationSet";
import { locationType } from "../../types/feedType";
import { useDispatch } from "react-redux";

type ProfileModalProps = {
	modalState: boolean;
	logoutHandle: () => void;
	modalHandle: React.MouseEventHandler<HTMLButtonElement>;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ modalState, logoutHandle, modalHandle }) => {
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};
	const userLocationInfo = useSelector((state: RootState) => {
		return state.locationSlice.userLocation;
	});

	const userInfo = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken;
	});

	const dispatch = useDispatch();
	const userLocationValue = userInfo.location; // 기존에 지역을 설정한 사용자의 지역 정보
	useEffect(() => {
		if (userLocationValue.trim() !== "") {
			const temps = userLocationValue.split(" ");

			const address: locationType = {
				sido: temps[0],
				sigungu: temps[1],
				dong: temps[2],
			};
			dispatch(setLocation(address));
		}
	}, [userLocationValue]);

	const clickFeedAddBtn = () => {
		if (userLocationInfo.sido === "" && userLocationValue.trim() === "") {
			pushNotification("지역을 먼저 등록해주세요", "error");
			return navigate("/locationsetting");
		}
		navigate("/feedadd");
	};

	const locationTag = userLocationValue
		? userLocationValue
		: `${userLocationInfo.sido} ${userLocationInfo.sigungu} ${userLocationInfo.dong}`;
	return (
		<div>
			{modalState && (
				<St.ProfileLayout>
					<St.UserInfoSection>
						<St.ProfileImgBox>
							{userInfo.profileImageUrl ? (
								<img src={userInfo.profileImageUrl} alt='유저프로필' />
							) : (
								<img src={require(`../../asstes/profileImageDefault.png`)} alt='기본프로필' />
							)}
						</St.ProfileImgBox>
						<St.NicknameBox>
							<p>{userInfo.nickname}</p>
							<p>{userInfo.sub}</p>
						</St.NicknameBox>
					</St.UserInfoSection>
					<St.ModalNavSection onClick={modalHandle}>
						<St.ModalButton onClick={handleNavigate("/locationsetting")}>
							<img src={require(`../../asstes/locationIcon.png`)} alt='위치' />
							{userLocationInfo.sido === "" && userInfo.location.trim() === "" ? (
								<p>지역을 설정해주세요</p>
							) : (
								<p>{locationTag}</p>
							)}
						</St.ModalButton>
						<St.ModalButton onClick={handleNavigate(`/mypage/${userInfo.userId}`)}>
							<img src={require(`../../asstes/peopleIcon.png`)} alt='사람' />
							<p>마이페이지</p>
						</St.ModalButton>
						<St.ModalButton onClick={clickFeedAddBtn}>
							<img src={require(`../../asstes/addFeedIcon.png`)} alt='게시물추가' />
							<p>게시물작성</p>
						</St.ModalButton>
						<St.ModalButton onClick={logoutHandle} style={{ borderRadius: "0 0 12px 12px" }}>
							<img src={require(`../../asstes/logoutIcon.png`)} alt='로그아웃' />
							<p>로그아웃</p>
						</St.ModalButton>
					</St.ModalNavSection>
				</St.ProfileLayout>
			)}
		</div>
	);
};

export default ProfileModal;
