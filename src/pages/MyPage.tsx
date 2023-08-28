import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMyPage } from "../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { InitialType } from "../redux/modules/locationSet";
import { pushNotification } from "../utils/notification";
import UserInfo from "../components/mypageForm/UserInfo";
import { useParams } from "react-router";
import PostList from "../components/mypageForm/PostList";
import * as S from "../components/mypageForm/MypageStyle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

const MyPage: React.FC = () => {
    const [value, setValue] = React.useState("one");
    const TabChangehandler = (
        event: React.SyntheticEvent,
        newValue: string
    ) => {
        setValue(newValue); // 탭 변경
    };

    const navigate = useNavigate();
    const accountId: Number = useSelector((state: RootState) => {
        return state.tokenSlice.decodeToken.userId;
    }); // 현재 로그인된 사용자의 ID

    const { id } = useParams();
    const userId = Number(id);

    const userLocation: InitialType = useSelector((state: RootState) => {
        return state.locationSlice.userLocation;
    });

    // useQuery로 유저 정보 불러오기
    const { data: mypage, isLoading } = useQuery(["mypage"], () =>
        getMyPage(userId)
    );

    useEffect(() => {
        if (userLocation.sido === "") {
            pushNotification("지역을 먼저 등록해주세요", "error");
            navigate("/locationsetting");
        }
    }, [userLocation.sido, navigate]);

    if (isLoading) {
        <div>Loding...</div>;
    }

    return (
        <S.Main>
            <S.InlineLayout>
                <section>
                    <UserInfo mypage={mypage} />
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
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={TabChangehandler}
                                aria-label="secondary tabs example"
                                TabIndicatorProps={{
                                    style: { background: "#2bb673" },
                                }}
                            >
                                <Tab
                                    value="one"
                                    label="작성글"
                                    style={{
                                        color: value === "one" ? "#2bb673" : "", // 선택한 탭일 때의 텍스트 색상
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                    }}
                                />
                                {+accountId === userId ? (
                                <Tab
                                    value="two"
                                    label="관심글"
                                    style={{
                                        color: value === "two" ? "#2bb673" : "", // 선택한 탭일 때의 텍스트 색상
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
                                btnMessege = "소분하러 가기"
                            />
                        </TabPanel>
                        <TabPanel value="two">
                            {+accountId === userId ? (
                                <>
                                    <PostList
                                        posts={mypage?.data?.pinedPosts}
                                        navigate={navigate}
                                        messege="아직 관심글이 없습니다."
                                        btnMessege = "관심 등록하러 가기"

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

export default MyPage;
