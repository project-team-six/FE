import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { InitialType } from "../../redux/modules/locationSet";
import * as S from "./MypageStyle";
import { useNavigate, useParams } from "react-router";
import {cog, emailIconWhite,locationpin,smileyneutral,smileywink} from "../../asstes/asstes";
import UserProfile from "./UserProfile";
import { pushNotification } from "../../utils/notification";
import { useMutation, useQueryClient } from "react-query";
import { postPopularity } from "../../api/userApi";

const UserInfo = ({ mypage }: { mypage: any }) => {
    const [hasClicked, setHasClicked] = useState(false);
    const navigate = useNavigate();

    const accountId: Number = useSelector((state: RootState) => {
        return state.tokenSlice.decodeToken.userId;
    }); // 현재 로그인된 사용자의 ID
    const email: string = useSelector((state: RootState) => {
        return state.tokenSlice.decodeToken.sub;
    }); // 현재 로그인된 사용자의 email

    const { id } = useParams();
    const userId = Number(id);

    const userLocation: InitialType = useSelector((state: RootState) => {
        return state.locationSlice.userLocation;
    });

    const onClickuserEditnavigate = () => {
		const userInfo = {userId:userId, nickname:`${mypage.data.nickname}`, phoneNumber:`${mypage.data.phoneNumber}`, }
		navigate(`/mypage/edit`, { state: {userInfo} });
	};
    const queryClient = useQueryClient();
    const popularityMutation = useMutation(postPopularity, {
        onSuccess: (response) => {
            console.log("data", response)
            const hasRaised = response.data.data.includes("올렸습니다");
            setHasClicked(hasRaised);
            queryClient.invalidateQueries(["mypage", userId]);
        },
        onError: () => {
            pushNotification("로그인 후 이용해주세요", "error");
        },
    });
    
    // 관심을 누르면 서버에 반영 및 횟수 올라가기
    const popularityHandler = () => {
        popularityMutation.mutate(userId);
    };
    return (
        <S.UserInfoWrapper>
            <UserProfile mypage={mypage} />
            <S.UserInfo>
                <S.Nickname>
                    <h2>{mypage?.data?.nickname}</h2>
                    {+accountId === userId ? (
                        <button onClick={onClickuserEditnavigate}>
                            <img src={cog} alt="회원정보 수정" />
                        </button>
                    ) : null}
                </S.Nickname>
                <S.Info>
                    <span>
                        <img src={emailIconWhite} alt="이메일아이콘" />
                    </span>
                    <strong>{email}</strong>
                </S.Info>
                <S.Info>
                    <span>
                        <img src={locationpin} alt="지도아이콘" />
                    </span>
                    {userLocation.sido === "" || null || undefined ? (
                        <strong>지역을 설정해주세요</strong>
                    ) : (
                        <strong>
                            {`${userLocation.sido} ${userLocation.sigungu}
                            ${userLocation.dong}`}
                        </strong>
                    )}
                </S.Info>
            </S.UserInfo>
            <S.Popularity>
                {userId === +accountId ?
                <img src={smileywink} alt="기본이모지" />
                :
                <button onClick={popularityHandler}>
                    <img src={hasClicked ? smileywink : smileyneutral} alt="기본이모지"/>
                </button>
                }
                <h5>{mypage?.data?.popularity}</h5>
                <p>LIKED</p>
            </S.Popularity>
        </S.UserInfoWrapper>
    );
};

export default UserInfo;
