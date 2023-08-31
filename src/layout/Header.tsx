import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { setDecodeToken, setLogOut, TokenSliceState } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import ProfileModal from "../components/common/ProfileModal";
import { useMutation } from "react-query";
import { signOut } from "../api/userApi";
import { pushNotification } from "../utils/notification";
import { deleteToken } from "../utils/deleteToken";
import { h_mainLogo, h_chatIcon, h_alertIcon, h_profile } from "../asstes/asstes";
import { Badge } from "@mui/material";
import AlertModal from "../components/alertForm/AlertModal";
import { VscChevronDown } from "react-icons/vsc";
import { Flex } from "../components/common/GlobalStyle";
import { throttle } from "lodash";
import { getToken } from "../utils/getToken";
import ChatListModal from "../components/chatForm/ChatListModal";

const Header = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch = useDispatch();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	// 프로필
	const [isProfileModal, setIsProfileModal] = useState<boolean>(false);
	const toggleProfileModal: React.MouseEventHandler = (event) => {
		event.preventDefault();
		setIsProfileModal((prevModalState) => !prevModalState);
	};

	// 알람
	const [isAlertModal, setIsAlertModal] = useState<boolean>(false);
	const [alertCount, setAlertCount] = useState(0);
	const toggleAlertModal: React.MouseEventHandler = (event) => {
		event.preventDefault();
		setIsAlertModal((prevModalState) => !prevModalState);
	};

	// 채팅
	const [isChatModal, setIsChatModal] = useState<boolean>(false);
	const toggleChatModal: React.MouseEventHandler = (event) => {
		event.preventDefault();
		setIsChatModal((prevModalState) => !prevModalState);
	};

	// 토큰 저장되어 있는지 확인
	const accessToken = getToken("accessToken");
	useEffect(() => {
		if (accessToken) dispatch(setDecodeToken(accessToken));
	}, [accessToken, dispatch]);

	// 토큰 디코드한 값 가져오기
	const tokenInfo: TokenSliceState = useSelector((state: RootState) => {
		return state.tokenSlice;
	});
	const userProfile = tokenInfo.decodeToken.profileImageUrl; // 현재 로그인된 사용자의 프로필 이미지 URL

	// 로그아웃
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

	// 스크롤이 내려가고 올라오는지 확인해주는 핸들러
	const [visible, setVisible] = useState(true);
	const beforeScrollY = useRef(0);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	const handleScroll = useMemo(
		() =>
			throttle(() => {
				const currentScrollY = window.scrollY;
				if (beforeScrollY.current < currentScrollY) {
					setVisible(false);
				} else {
					setVisible(true);
				}
				beforeScrollY.current = currentScrollY;
			}, 250),
		[beforeScrollY]
	);

	return (
		<div
			style={{
				position: "sticky",
				top: visible ? "0" : "-10%",
				transition: " all 1s",
				zIndex: "997",
			}}>
			<HeaderBox>
				<LogoSection onClick={handleNavigate("/")}>
					<img src={h_mainLogo} alt='header_logo' />
				</LogoSection>
				<NavBtnSection>
					{tokenInfo.isLogin ? (
						<div style={{ display: "flex", gap: "35px" }}>
							<NavButton onClick={toggleChatModal}>
								<img src={h_chatIcon} alt='채팅' />
							</NavButton>
							<NavButton onClick={toggleAlertModal}>
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
								{userProfile === "nonImage" ? (
									<>
										<ProfileBox $backgroundColor='#000000'>
											<img src={h_profile} alt='기본프로필' />
										</ProfileBox>
										<ArrowBox>
											<VscChevronDown />
										</ArrowBox>
									</>
								) : (
									<>
										<ProfileBox $backgroundColor='transparent'>
											<img src={userProfile} alt='유저프로필' style={{ borderRadius: "100%" }} />
										</ProfileBox>
										<ArrowBox>
											<VscChevronDown />
										</ArrowBox>
									</>
								)}
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
							<ChatListModal modalState={isChatModal} modalHandle={setIsChatModal} />
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
		width: 115px;
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

type DivProps = {
	$backgroundColor: string;
};

const ProfileBox = styled.div<DivProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.$backgroundColor};
	border-radius: 100%;
	width: 44px;
	height: 44px;
	img {
		width: 46px;
		height: 46px;
	}
`;

const ArrowBox = styled.div`
	${Flex}
	width: 20px;
	height: 20px;
	border-radius: 100%;
	&:hover {
		background-color: #efefef;
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
