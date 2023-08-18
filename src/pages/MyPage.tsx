import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyPage } from "../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import * as MySt from "../components/mypageForm/MypageStyle";
import { InitialType } from "../redux/modules/locationSet";
import { pushNotification } from "../utils/notification";
import UserInfo from "../components/mypageForm/UserInfo";
import { useParams } from "react-router";
import PostList from "../components/mypageForm/PostList";

const MyPage: React.FC = () => {
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
    const { data: mypage, isLoading } = useQuery(["mypage", userId], () =>
        getMyPage(userId)
    );

    useEffect(() => {
        if (userLocation.sido === "") {
            pushNotification("지역을 먼저 등록해주세요", "error");
            navigate("/locationsetting");
        }
    }, [userLocation.sido, navigate]);

    return (
        <MySt.LayoutBox>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <MySt.LayoutBody>
                    <MySt.Title>마이페이지</MySt.Title>
                    <MySt.Wrapper>
                        <UserInfo />
                        <MySt.Feed>
                                <h2>작성글 <strong>{mypage?.data?.userPosts?.length}</strong></h2>
                                <PostList posts={mypage?.data?.userPosts} navigate={navigate}/>
                            {+accountId === userId ? (
                            <>
                            <h2>관심글 <strong>{mypage?.data?.pinedPosts.length} </strong></h2>
                            <PostList posts={mypage?.data?.pinedPosts} navigate={navigate} />
                            </>
                            ): null }
                        </MySt.Feed>
                    </MySt.Wrapper>
                </MySt.LayoutBody>
            )}
        </MySt.LayoutBox>
    );
};

export default MyPage;