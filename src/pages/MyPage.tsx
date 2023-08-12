import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyPage } from "../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import UserInfo from "../components/mypage/UserInfo";

const MyPage = () => {
    const navigate = useNavigate();
    const userId: Number = useSelector((state: RootState) => {
        return state.tokenSlice.decodeToken.userId;
    });

    // useQuery로 유저 정보 불러오기
    const { data: mypage, isLoading } = useQuery(["mypage", userId], () =>
        getMyPage(userId)
    );

    if (Error) { console.log(Error) }
    const onClickuserEditnavigate = () => {
        navigate(`/mypage/edit`, {state: userId})
    };
    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <UserInfo />
                    <button onClick={onClickuserEditnavigate}>
                        회원정보 수정
                    </button>
                    <div>
                        <h2>작성글 {mypage.data.userPosts.length}</h2>
                        {mypage.data.userPosts.length === 0 ? (
                            <p>아직 작성된 글이 없습니다.</p>
                        ) : (
                            <div>{mypage.data.postList}</div>
                        )}
                    </div>
                    <div>
                        <h2>관심글 {mypage.data.pinedPosts.length} </h2>
                        {mypage.data.pinedPosts.length === 0 ? (
                            <p>아직 관심글이 없습니다.</p>
                        ) : (
                            <div>{mypage.data.postList}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPage;
