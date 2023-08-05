import React from "react";
import * as St from "../common/commonStyle";
import { NavigateFunction, useNavigate } from "react-router-dom";
import mainlogo from "../../asstes/mainlogo.png";
import { LayoutBox } from "./GlobalStyle";
import { useSelector } from "react-redux";
import TokenSliceState from "../../redux/modules/user";
import { RootState } from "../../redux/config/configStore";

const Header = () => {
	const navigate: NavigateFunction = useNavigate();

	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	const exp: number = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.iat;
	});

	// 토근이 만료되면 자동 로그아웃
	// const currentTime = Date.now() / 1000; // 현재 시간
	// if(currentTime > ) {
	// 	alert("로그인이 만료되었습니다. 다시 로그인 해주시기 바랍니다.");
	// 	document.cookie = `accessToken=0; max-age=0`; // 쿠키에서 삭제
	// }

	return (
		<St.HeaderLayout>
			<LayoutBox style={{ justifyContent: "space-between" }}>
				<St.LogoSection>
					<img src={mainlogo} alt='header_logo' />
				</St.LogoSection>
				<St.LocationSetSection>
					<button>지역을 설정해주세요</button>
				</St.LocationSetSection>
				<St.NavBtnSection>
					<button onClick={handleNavigate("/feedadd")}>글쓰기</button>
					<button onClick={handleNavigate("/signin")}>로그인</button>
					<button onClick={handleNavigate("/signup")}>회원가입</button>
				</St.NavBtnSection>
			</LayoutBox>
		</St.HeaderLayout>
	);
};

export default Header;
