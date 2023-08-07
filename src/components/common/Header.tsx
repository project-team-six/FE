import React, { useEffect } from "react";
import * as St from "../common/commonStyle";
import { NavigateFunction, useNavigate } from "react-router-dom";
import mainlogo from "../../asstes/mainlogo.png";
import { LayoutBox } from "./GlobalStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { setLogOut, TokenSliceState } from "../../redux/modules/user";
import { useDispatch } from "react-redux";

const Header = () => {
	const navigate: NavigateFunction = useNavigate();

	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	let tokenInfo: TokenSliceState = useSelector((state: RootState) => {
		return state.tokenSlice;
	});

	const dispatch = useDispatch();
	const Logout = () => {
		document.cookie = `accessToken=0; max-age=0`;
		dispatch(setLogOut());
	};

	//토근이 만료되면 자동 로그아웃
	const currentTime = Date.now() / 1000; // 현재 시간
	if (tokenInfo.decodeToken.exp > 0 && currentTime > tokenInfo.decodeToken.exp) {
		alert("로그인이 만료되었습니다. 다시 로그인 해주시기 바랍니다.");
		Logout();
	}

	const userLocationInfo = useSelector((state: RootState) => {
		return state.locationSlice.userLocation;
	});

	return (
		<St.HeaderLayout>
			<LayoutBox style={{ justifyContent: "space-between" }}>
				<St.LogoSection>
					<img src={mainlogo} alt='header_logo' />
				</St.LogoSection>

				<St.LocationSetSection>
					{tokenInfo.isLogin && (
						<>
							{userLocationInfo.sido === "" ? (
								<button onClick={handleNavigate("/locationsetting")}>지역을 설정해주세요</button>
							) : (
								<button onClick={handleNavigate("/locationsetting")}>
									{userLocationInfo.sido} {userLocationInfo.sigungu} {userLocationInfo.dong}
								</button>
							)}
						</>
					)}
				</St.LocationSetSection>
				<St.NavBtnSection>
					{tokenInfo.isLogin ? (
						<>
							<button onClick={Logout}>로그아웃</button>
							<button onClick={handleNavigate("/feedadd")}>글쓰기</button>
							<button onClick={handleNavigate("/mypage")}>마이페이지</button>
						</>
					) : (
						<>
							<button onClick={handleNavigate("/signin")}>로그인</button>
							<button onClick={handleNavigate("/signup")}>회원가입</button>
						</>
					)}
				</St.NavBtnSection>
			</LayoutBox>
		</St.HeaderLayout>
	);
};

export default Header;
