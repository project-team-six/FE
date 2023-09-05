import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyPage } from "../../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import UserInfoForm from "../../components/mypageForm/userInfoForm/UserInfoForm";
import { useParams } from "react-router";
import PostList from "../../components/mypageForm/postListForm/PostList";
import * as S from "./style";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Loading from "../../components/common/Loading";

const MyPageForm: React.FC = () => {
	const [value, setValue] = React.useState("one");
	const TabChangehandler = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue); // 탭 변경
	};

	const navigate = useNavigate();
	const accountId: Number = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.userId; // 현재 로그인된 사용자의 ID
	});

	const { id } = useParams();

	// useQuery로 유저 정보 불러오기
	const { data: mypage, isLoading } = useQuery(["mypage", id], () => getMyPage(Number(id)));
	const [myPageInfo, setMyPageInfo] = useState();
	useEffect(()=>{
		if (mypage) setMyPageInfo(mypage)
	}, [mypage]);
	if (isLoading)
		<div>
			<Loading />
		</div>;

	return (
		<S.Main>
			<S.InlineLayout>
				<section>
					<UserInfoForm mypage={myPageInfo} />
				</section>
				<Box sx={{ width: "100%" }}>
					<TabContext value={value}>
						<Box
							sx={{
								borderBottom: 1,
								borderColor: "divider",
								display: "flex",
								justifyContent: "center",
								margin: "40px 0 45px",
							}}>
							<Tabs
								value={value}
								onChange={TabChangehandler}
								aria-label="secondary tabs example"
								TabIndicatorProps={{
									style: { background: "#4fbe9f" },
								}}>
								<Tab
									value="one"
									label="작성글"
									style={{
										color: value === "one" ? "#4fbe9f" : "", // 선택한 탭일 때의 텍스트 색상
										fontWeight: "bold",
										fontSize: "16px",
									}}
								/>
								{+accountId === Number(id) ? (
									<Tab
										value="two"
										label="관심글"
										style={{
											color: value === "two" ? "#4fbe9f" : "", // 선택한 탭일 때의 텍스트 색상
											fontWeight: "bold",
											fontSize: "16px",
										}}
									/>
								) : null}
							</Tabs>
						</Box>
						<TabPanel value="one">
							<PostList
								posts={mypage?.data?.userPosts}
								navigate={navigate}
								messege="아직 작성글이 없습니다."
								btnMessege="소분하러 가기"
							/>
						</TabPanel>
						<TabPanel value="two">
							{+accountId === Number(id) ? (
								<>
									<PostList
										posts={mypage?.data?.pinedPosts}
										navigate={navigate}
										messege="아직 관심글이 없습니다."
										btnMessege="관심 등록하러 가기"
									/>
								</>
							) : null}
						</TabPanel>
					</TabContext>
				</Box>
			</S.InlineLayout>
		</S.Main>
	);
};

export default MyPageForm;
