import React, { useState } from "react";
import * as St from "../common/commonStyle";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LayoutBox } from "./GlobalStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { setLogOut, TokenSliceState } from "../../redux/modules/user";
import { useDispatch } from "react-redux";
import ProfileModal from "./ProfileModal";
import { useMutation } from "react-query";
import { signOut } from "../../api/userApi";
import { pushNotification } from "../../utils/notification";
import { deleteToken } from "../../utils/deleteToken";

const Header = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch = useDispatch();
	const [isProfileModal, setIsProfileModal] = useState(false);
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	const toggleModal: React.MouseEventHandler = (event) => {
		event.preventDefault();
		setIsProfileModal((prevModalState) => !prevModalState);
	};

	let tokenInfo: TokenSliceState = useSelector((state: RootState) => {
		return state.tokenSlice;
	});

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
			<St.HeaderBox>
				<St.LogoSection onClick={handleNavigate("/")}>
					<img src={require(`../../asstes/mainlogo.png`)} alt='header_logo' />
				</St.LogoSection>
				<St.NavBtnSection>
					{tokenInfo.isLogin ? (
						<div style={{ display: "flex", gap: "35px" }}>
							<St.NavButton>
								<img src={require(`../../asstes/chatIcon.png`)} alt='채팅' />
							</St.NavButton>
							<St.NavButton>
								<img src={require(`../../asstes/alertIcon.png`)} alt='알람' />
							</St.NavButton>
							<St.NavButton onClick={toggleModal}>
								<img src={require(`../../asstes/profileIcon.png`)} alt='프로필' />
							</St.NavButton>
							<ProfileModal modalState={isProfileModal} logoutHandle={Logout} modalHandle={toggleModal} />
						</div>
					) : (
						<div>
							<St.SignButton onClick={handleNavigate("/signin")}>로그인</St.SignButton>
							<span>ㅣ</span>
							<St.SignButton onClick={handleNavigate("/signup")}>회원가입</St.SignButton>
						</div>
					)}
				</St.NavBtnSection>
			</St.HeaderBox>
		</LayoutBox>
	);
};

export default Header;
