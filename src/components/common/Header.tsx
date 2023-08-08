import React from "react";
import * as St from "../common/commonStyle";
import { NavigateFunction, useNavigate } from "react-router-dom";
import mainlogo from "../../asstes/mainlogo.png";
import { LayoutBox } from "./GlobalStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { setLogOut } from "../../redux/modules/user";
import { useDispatch } from "react-redux";
import { resetLocation } from "../../redux/modules/locationSet";

const Header = () => {
  const navigate: NavigateFunction = useNavigate();

  const handleNavigate =
    (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      navigate(path);
    };

  const info = useSelector((state: RootState) => {
    return state;
  });

  const userInfo = info.tokenSlice.decodeToken;
  const userLocationInfo = info.locationSlice.userLocation;

  const dispatch = useDispatch();
  const Logout = () => {
    document.cookie = `accessToken=0; max-age=0`;
    dispatch(setLogOut()); // 로그인된 정보 초기화
    dispatch(resetLocation()); // 위치 초기화
  };

  return (
    <St.HeaderLayout>
      <LayoutBox style={{ justifyContent: "space-between" }}>
        <St.LogoSection>
          <img src={mainlogo} alt="header_logo" />
        </St.LogoSection>
        <St.LocationSetSection>
          {userLocationInfo.sido == "" ? (
            <button onClick={handleNavigate("/locationsetting")}>
              지역을 설정해주세요
            </button>
          ) : (
            <button onClick={handleNavigate("/locationsetting")}>
              {userLocationInfo.sido} {userLocationInfo.sigungu}{" "}
              {userLocationInfo.dong}
            </button>
          )}
        </St.LocationSetSection>
        <St.NavBtnSection>
          <button onClick={Logout}>로그아웃</button>
          <button onClick={handleNavigate("/feedadd")}>글쓰기</button>
          <button onClick={handleNavigate("/signin")}>로그인</button>
          <button onClick={handleNavigate("/signup")}>회원가입</button>
          <button onClick={handleNavigate("/mypage")}>마이페이지</button>
        </St.NavBtnSection>
      </LayoutBox>
    </St.HeaderLayout>
  );
};

export default Header;
