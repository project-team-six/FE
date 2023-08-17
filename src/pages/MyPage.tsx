import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyPage } from "../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import * as MySt from "../components/mypageForm/MypageStyle";
import { InitialType } from "../redux/modules/locationSet";
import { pushNotification } from "../utils/notification";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import UserInfo from "../components/mypageForm/UserInfo";
import { useParams } from "react-router";

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
                            <MySt.List>
                                {mypage?.data?.userPosts.length === 0 ? (
                                    <p>아직 작성된 글이 없습니다.</p>
                                ) : (
                                    <div className="list-wrapper">
                                        {mypage.data.userPosts.map((userPost: any, index: number) => {
                                                const createdAt = new Date(userPost.createdAt);
                                                return (
                                                    <div key={index} onClick={()=>navigate(`/feed/${userPost.id}`)}>
                                                        <img src={userPost.imageUrlList} alt="등록한 게시물 이미지"/>
                                                        <MySt.PostContent>
                                                            <MySt.ContentHead>
                                                        <span>{userPost.location}</span>
                                                        <span className="day">
                                                            {formatDistanceToNow(createdAt, {addSuffix: true, locale: ko,})}
                                                        </span>
                                                        </MySt.ContentHead>
                                                        <h4>{userPost.title}</h4>
                                                        <p>
                                                            {userPost.content.length > 35
                                                                ? `${userPost.content.slice(0, 34)}...`
                                                                : userPost.content}
                                                        </p>
                                                        <h4>{userPost.price} </h4>
                                                        </MySt.PostContent>
                                                    </div>
                                                );
                                        })}
                                    </div>
                                )}
                            </MySt.List>
                            {+accountId === userId ? (
                            <>
                            <h2>관심글 <strong>{mypage?.data?.pinedPosts.length} </strong></h2>
                            <MySt.List>
                            {mypage?.data?.pinedPosts.length === 0 ? (
                                    <p>아직 작성된 글이 없습니다.</p>
                                ) : (
                                    <div className="list-wrapper">
                                        {mypage.data.pinedPosts.map((pinedPost: any, index: number) => {
                                                const createdAt = new Date(pinedPost.createdAt);
                                                return (
                                                    <div key={index} onClick={()=>navigate(`/feed/${pinedPost.id}`)}>
                                                        <img src={pinedPost.imageUrlList} alt="등록한 게시물 이미지"/>
                                                        <MySt.PostContent>
                                                            <MySt.ContentHead>
                                                        <span>{pinedPost.location}</span>
                                                        <span className="day">
                                                            {formatDistanceToNow(createdAt, {addSuffix: true, locale: ko,})}
                                                        </span>
                                                            </MySt.ContentHead>
                                                        <h4>{pinedPost.title}</h4>
                                                        <p>
                                                            {pinedPost.content.length > 30
                                                                ? `${pinedPost.content.slice(0, 30)}...`
                                                                : pinedPost.content}
                                                        </p>
                                                        <h4>{pinedPost.price} </h4>
                                                        </MySt.PostContent>
                                                    </div>
                                                );
                                        })}
                                    </div>
                                )}
                            </MySt.List>
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