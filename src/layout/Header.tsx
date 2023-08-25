import React, { useState } from "react";
import styled from "styled-components";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { setLogOut, TokenSliceState } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import ProfileModal from "../components/common/ProfileModal";
import { useMutation } from "react-query";
import { signOut } from "../api/userApi";
import { pushNotification } from "../utils/notification";
import { deleteToken } from "../utils/deleteToken";
import { h_mainLogo, h_chatIcon, h_alertIcon, h_profile } from "../asstes/asstes";
import { Badge } from "@mui/material";
import AlertModal from "../components/alertForm/AlertModal";

const Header = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch = useDispatch();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};
	//알람, 프로필모달 핸들러
	const [isProfileModal, setIsProfileModal] = useState(false);
	const [isAlertModal, setIsAlertModal] = useState(false);
	const [alertCount, setAlertCount] = useState(0);
	const toggleProfileModal: React.MouseEventHandler = (event) => {
		event.preventDefault();
		setIsProfileModal((prevModalState) => !prevModalState);
	};
	const toggleAlertModal: React.MouseEventHandler = (event) => {
		event.preventDefault();
		setIsAlertModal((prevModalState) => !prevModalState);
	};

	//토큰 디코드한 값 가져오기
	const tokenInfo: TokenSliceState = useSelector((state: RootState) => {
		return state.tokenSlice;
	});

	const userProfile = tokenInfo.decodeToken.profileImageUrl;

	//로그아웃
	const logOutMutation = useMutation(signOut, {
		onSuccess: (res) => {
			deleteToken("accessToken");
			deleteToken("refreshToken");
			dispatch(setLogOut()); // 로그인된 정보 초기화
			navigate("/");
		},
		onError: () => {
			pushNotification("로그아웃 실패!", "error");
		},
	});

	const Logout = () => {
		logOutMutation.mutate();
	};

	return (
		<div style={{ position: "sticky", top: "0" }}>
			<HeaderBox>
				<LogoSection onClick={handleNavigate("/")}>
					<img src={h_mainLogo} alt='header_logo' />
				</LogoSection>
				<NavBtnSection>
					{tokenInfo.isLogin ? (
						<div style={{ display: "flex", gap: "35px" }}>
							<NavButton>
								<img src={h_chatIcon} alt='채팅' />
							</NavButton>
							<NavButton onClick={toggleAlertModal}>
								{/* 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string */}
								<Badge
									badgeContent={alertCount}
									sx={{
										"& .MuiBadge-badge": {
											color: "white",
											backgroundColor: "#2BB673",
										},
									}}>
									<img src={h_alertIcon} alt='알람' style={{ width: "23px" }} />
								</Badge>
							</NavButton>
							<NavButton onClick={toggleProfileModal}>
								<ProfileBox>
									{userProfile ? (
										<img src={userProfile} alt='유저프로필' />
									) : (
										<img src={h_profile} alt='기본프로필' />
									)}
								</ProfileBox>
							</NavButton>
							<AlertModal
								modalState={isAlertModal}
								modalHandle={toggleAlertModal}
								setAlertCount={setAlertCount}
							/>
							<ProfileModal
								modalState={isProfileModal}
								logoutHandle={Logout}
								modalHandle={toggleProfileModal}
							/>
						</div>
					) : (
						<div>
							<SignButton onClick={handleNavigate("/signin")}>로그인</SignButton>
							<SignButton onClick={handleNavigate("/signup")}>회원가입</SignButton>
						</div>
					)}
				</NavBtnSection>
			</HeaderBox>
		</div>
	);
};

export default Header;

const HeaderBox = styled.div`
	height: 74px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	padding: 0 8% 0 8%;
	background-color: white;
`;

const LogoSection = styled.section`
	display: flex;
	cursor: pointer;
	img {
		margin-left: 20px;
		width: 130px;
		height: 50px;
	}
`;

const NavButton = styled.button`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
	}
	img {
		width: 30px;
		height: 30px;
	}
`;

const NavBtnSection = styled.section`
	display: flex;
`;

const ProfileBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: black;
	border-radius: 100%;
	width: 44px;
	height: 44px;
	img {
		width: 46px;
		height: 46px;
	}
`;

const SignButton = styled.button`
	cursor: pointer;
	width: 80px;
	height: 30px;
	border-radius: 6px;
	&:hover {
	}
	font-size: 18px;
	font-weight: bold;
`;
