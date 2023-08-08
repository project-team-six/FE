import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyPage } from "../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";

const MyPage = () => {
  // const [userId, setuserId] = useState(3);
  const navigate = useNavigate();
  const userId: Number = useSelector((state: RootState) => {
    return state.tokenSlice.decodeToken.userId;
  });

  console.log("userId", userId);
  // useQuery로 유저 정보 불러오기
  const {
    data: mypage,
    isLoading,
    error,
  } = useQuery(["mypage", userId], () => getMyPage(userId));

  if (error) {
    console.log(error);
  }

  // navigate 겸 유저 정보 props 해주기
  const onClickuserEditnavigate = () => {
    navigate(`/mypage/edit`, {
      state: userId,
    });
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {mypage.data.profileImageUrl ? (
            <img src={`${mypage.data.profileImageUrl}`} alt="업로드된 이미지" />
          ) : (
            <img
              src={require("../asstes/sobooni.png")}
              alt="기본 프로필이미지"
            />
          )}
          <p>{mypage.data.nickname}</p>
          <button onClick={onClickuserEditnavigate}>회원정보 수정</button>
          <div>
            매너온도 어떻게 표시하지
            <div>{mypage.data.mannerTemperature}</div>
          </div>
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
