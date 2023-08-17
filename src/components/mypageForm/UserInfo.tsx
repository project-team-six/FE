import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { useQuery } from "react-query";
import { getMyPage } from "../../api/userApi";
import UserProfile from "./UserProfile";
import UserMannerTem from "./UserMannerTem";
import { InitialType } from "../../redux/modules/locationSet";
import * as S from "./MypageStyle";
import { useNavigate, useParams } from "react-router";

const UserInfo = () => {
    const navigate = useNavigate();
    const accountId: Number = useSelector((state: RootState) => {
        return state.tokenSlice.decodeToken.userId;
    }); // 현재 로그인된 사용자의 ID

    const { id } = useParams();
    const userId = Number(id)

    const userLocation: InitialType = useSelector((state: RootState) => {
        return state.locationSlice.userLocation;
    });

    // useQuery로 유저 정보 불러오기
    const { data: mypage, isLoading, isError } = useQuery(["mypage", userId], () =>
        getMyPage(userId))

    if (isLoading) return <div>isLoading</div>;
    if (isError) return <div>iserror</div>;

    const onClickuserEditnavigate = () => {
        navigate(`/mypage/edit`, { state: userId });
    };
    return (
        <S.UserInfoWrapper>
            <section>
                <UserProfile mypage={mypage} />
            </section>
            <S.Location>
                <strong>
                    {userLocation.sido === "" ? (
                        <p>지역을 설정해주세요</p>
                    ) : (
                        <p>
                            {userLocation.sido} {userLocation.sigungu} {userLocation.dong}
                        </p>
                    )}
                </strong>
            </S.Location>
            <section>
                <UserMannerTem mypage={mypage} />
            </section>
            {+accountId === userId ? (
            <S.EditBtn >
            <button onClick={onClickuserEditnavigate}>회원정보 수정</button>
            </S.EditBtn>
            ) : null }
        </S.UserInfoWrapper>
    );
};

export default UserInfo;