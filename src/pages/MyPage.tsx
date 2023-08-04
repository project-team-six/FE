import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyPage } from "../api/user";

const MyPage = () => {
	const [userId, setUserId] = useState<number>(1);
	const navigate = useNavigate();

	const {
		data: mypage,
		isLoading,
		error,
	} = useQuery(["mypage", userId], () => {
		return getMyPage(userId);
	});

	return (
		<>
			<div>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<div>
						{mypage.data.profileImageUrl ? (
							<img src={`${mypage.data.profileImageUrl}`} />
						) : (
							<img src={require("../asstes/sobooni.png")} alt='기본 프로필이미지' />
						)}
						<p>{mypage.data.nickname}</p>
						<button onClick={() => navigate("/mypage/edit")}>회원정보 수정</button>
						<div>
							매너온도 어떻게 표시하지
							<div>{mypage.data.mannerTemperature}</div>
						</div>
						<div>
							<h2>작성글 {mypage.data.userPosts.length}</h2>
							<div>postList</div>
						</div>
						<div>
							<h2>관심글 {mypage.data.pinedPosts.length} </h2>
							<div>postList</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default MyPage;
