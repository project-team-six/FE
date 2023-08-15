import React from "react";
import * as S from './MypageStyle'

const UserProfile = ({mypage}:{mypage:any}) => {
    return (
        <S.UserProfile>
            <div className="profile-img">
                {mypage?.data?.profileImageUrl ? (
                    <img
                        src={`${mypage.data.profileImageUrl}`}
                        alt="업로드된 이미지"
                    />
                ) : (
                    <img
                        src={require("../../asstes/profileImageDefault.png")}
                        alt="기본 프로필이미지"
                    />
                )}
            </div>
            <h2>{mypage?.data?.nickname}</h2>
        </S.UserProfile>
    );
};

export default UserProfile;
