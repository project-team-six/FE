import React, { useState } from "react";
import styled from "styled-components";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LayoutBox } from "../components/common/GlobalStyle";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { setLogOut, TokenSliceState } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import ProfileModal from "../components/common/ProfileModal";
import { useMutation } from "react-query";
import { signOut } from "../api/userApi";
import { pushNotification } from "../utils/notification";
import { deleteToken } from "../utils/deleteToken";
import { mainlogo, chatIcon, alertIcon, profileIcon } from "../asstes/asstes";
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
	let tokenInfo: TokenSliceState = useSelector((state: RootState) => {
		return state.tokenSlice;
	});

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
		<LayoutBox>
			<HeaderBox>
				<LogoSection onClick={handleNavigate("/")}>
					<img src={mainlogo} alt='header_logo' />
				</LogoSection>
				<NavBtnSection>
					{tokenInfo.isLogin ? (
						<div style={{ display: "flex", gap: "35px" }}>
							<NavButton>
								<img src={chatIcon} alt='채팅' />
							</NavButton>
							<NavButton onClick={toggleAlertModal}>
								{/* 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string */}
								<Badge badgeContent={alertCount} color='secondary'>
									<img src={alertIcon} alt='알람' />
								</Badge>
							</NavButton>
							<NavButton onClick={toggleProfileModal}>
								<img src={profileIcon} alt='프로필' />
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
							<span>ㅣ</span>
							<SignButton onClick={handleNavigate("/signup")}>회원가입</SignButton>
						</div>
					)}
				</NavBtnSection>
			</HeaderBox>
		</LayoutBox>
	);
};

export default Header;

const HeaderBox = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
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

const SignButton = styled.button`
	cursor: pointer;
	width: 80px;
	height: 30px;
	border-radius: 6px;
	&:hover {
		background-color: #6f8a6b;
		color: white;
	}
`;

const NavButton = styled.button`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 39px;
	border-radius: 100%;
	background-color: #6f8a6b;
	&:hover {
	}
`;

const NavBtnSection = styled.section`
	display: flex;
`;
