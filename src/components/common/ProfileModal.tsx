import React from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router";
import { RootState } from "../../redux/config/configStore";
import * as St from "../common/commonStyle";

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

	return (
		<div>
			{modalState && (
				<St.ProfileLayout>
					<St.UserInfoSection>
						<St.ProfileImgBox>
							<img src={require(`../../asstes/sobun.png`)} alt='소분이' />
						</St.ProfileImgBox>
						<St.NicknameBox>
							<p>{userInfo.nickname}</p>
							<p>{userInfo.email}</p>
						</St.NicknameBox>
					</St.UserInfoSection>
					<St.ModalNavSection onClick={modalHandle}>
						<St.ModalButton onClick={handleNavigate("/locationsetting")}>
							<img src={require(`../../asstes/locationIcon.png`)} alt='위치' />
							{userLocationInfo.sido === "" ? (
								<p>지역을 설정해주세요</p>
							) : (
								<p>
									{userLocationInfo.sido} {userLocationInfo.sigungu} {userLocationInfo.dong}
								</p>
							)}
						</St.ModalButton>
						<St.ModalButton onClick={handleNavigate("/mypage")}>
							<img src={require(`../../asstes/peopleIcon.png`)} alt='사람' />
							<p>마이페이지</p>
						</St.ModalButton>
						<St.ModalButton onClick={handleNavigate("/feedadd")}>
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
