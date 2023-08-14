import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { useQuery } from "react-query";
import { getMyPage } from "../../api/userApi";

const UserInfo = () => {
    const userId: Number = useSelector((state: RootState) => {
        return state.tokenSlice.decodeToken.userId;
    });

    // useQuery로 유저 정보 불러오기
    const { data: mypage } = useQuery(["mypage", userId], () =>
        getMyPage(userId)
    );
    console.log(mypage.data)
    // const dealt = Math.floor ((num/maxNum)*100)
    return (
        <article>
            <section>
                <div className="profile-img">
                {mypage?.data?.profileImageUrl ? (
                    <img src={`${mypage.data.profileImageUrl}`} alt="업로드된 이미지" />
                ) : ( 
                    <img src={require("../../asstes/profileImageDefault.png")} alt="기본 프로필이미지" />
                )}
                </div>
            </section>
            <section>
                <strong>{mypage?.data?.nickname}</strong>
                <p> 매너온도 {mypage?.data?.mannerTemperature}</p>
            </section>
        </article>
    );
};

export default UserInfo;
