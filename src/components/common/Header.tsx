import React, { useState } from "react";
import * as St from "../common/commonStyle";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LayoutBox } from "./GlobalStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { setLogOut, TokenSliceState } from "../../redux/modules/user";
import { useDispatch } from "react-redux";
import ProfileModal from "./ProfileModal";
import { resetLocation } from "../../redux/modules/locationSet";

const Header = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch = useDispatch();
	const [isProfileModal, setIsProfileModal] = useState(false);
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	const toggleModal: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault(); // 이벤트의 기본 동작을 막을 수 있으면 추가
		setIsProfileModal((prevModalState) => !prevModalState);
	};

	let tokenInfo: TokenSliceState = useSelector((state: RootState) => {
		return state.tokenSlice;
	});

	const Logout = () => {
		document.cookie = `accessToken=0; max-age=0`;
		dispatch(setLogOut()); // 로그인된 정보 초기화
		dispatch(resetLocation()); // 위치 정보 초기화
	};

	//토근이 만료되면 자동 로그아웃
	const currentTime = Date.now() / 1000; // 현재 시간
	if (tokenInfo.decodeToken.exp > 0 && currentTime > tokenInfo.decodeToken.exp) {
		alert("로그인이 만료되었습니다. 다시 로그인 해주시기 바랍니다.");
		Logout();
	}

	return (
		<LayoutBox>
			<St.HeaderBox>
				<St.LogoSection onClick={handleNavigate("/")}>
					<img src={require(`../../asstes/mainlogo.png`)} alt='header_logo' />
				</St.LogoSection>
				<St.NavBtnSection>
					{tokenInfo.isLogin ? (
						<div style={{ display: "flex", gap: "35px" }}>
							<St.NavButton onClick={() => {navigate("/chatlist")}}>
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
