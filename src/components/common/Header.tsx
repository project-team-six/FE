import React from "react";
import * as St from "../common/commonStyle";
import { NavigateFunction, useNavigate } from "react-router-dom";
import mainlogo from "../../asstes/mainlogo.png";
import { LayoutBox } from "./GlobalStyle";

const Header = () => {
	const navigate: NavigateFunction = useNavigate();

	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

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
					<button>글쓰기</button>
					<button onClick={handleNavigate("/signin")}>로그인</button>
					<button onClick={handleNavigate("/signup")}>회원가입</button>
				</St.NavBtnSection>
			</LayoutBox>
		</St.HeaderLayout>
	);
};

export default Header;
