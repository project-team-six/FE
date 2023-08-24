import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router";
import { RootState } from "../../redux/config/configStore";
import { pushNotification } from "../../utils/notification";
import { setLocation } from "../../redux/modules/locationSet";
import { locationType } from "../../types/feedType";
import styled from "styled-components";
import { profileImageDefault, locationIcon, peopleIcon, addFeedIcon, logoutIcon } from "../../asstes/asstes";
import { Flex } from "./GlobalStyle";
import { ModalLayout } from "./commonFormStyles";

type ProfileModalProps = {
	modalState: boolean;
	logoutHandle: () => void;
	modalHandle: React.MouseEventHandler<HTMLDivElement>;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ modalState, logoutHandle, modalHandle }) => {
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};
	const userLocationInfo = useSelector((state: RootState) => {
		return state.locationSlice.userLocation;
	});

	const userInfo = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken;
	});

	const dispatch = useDispatch();
	const userLocationValue = userInfo.location; // 기존에 지역을 설정한 사용자의 지역 정보
	useEffect(() => {
		if (userLocationValue.trim() !== "") {
			const temps = userLocationValue.split(" ");

			const address: locationType = {
				sido: temps[0],
				sigungu: temps[1],
				dong: temps[2],
			};
			dispatch(setLocation(address));
		}
	}, [userLocationValue]);

	const clickFeedAddBtn = () => {
		if (userLocationInfo.sido === "" && userLocationValue.trim() === "") {
			pushNotification("지역을 먼저 등록해주세요", "error");
			return navigate("/locationsetting");
		}
		navigate("/feedadd");
	};

	const locationTag = userLocationValue
		? userLocationValue
		: `${userLocationInfo.sido} ${userLocationInfo.sigungu} ${userLocationInfo.dong}`;
	return (
		<div>
			{modalState && (
				<ModalLayout onClick={modalHandle}>
					<ProfileLayout onClick={(e: any) => e.stopPropagation()}>
						<UserInfoSection>
							<ProfileImgBox>
								{userInfo.profileImageUrl ? (
									<img src={userInfo.profileImageUrl} alt='유저프로필' />
								) : (
									<img src={profileImageDefault} alt='기본프로필' />
								)}
							</ProfileImgBox>
							<NicknameBox>
								<p>{userInfo.nickname}</p>
								<p>{userInfo.sub}</p>
							</NicknameBox>
						</UserInfoSection>
						<ModalNavSection onClick={modalHandle}>
							<ModalButton onClick={handleNavigate("/locationsetting")}>
								<img src={locationIcon} alt='위치' />
								{userLocationInfo.sido === "" && userInfo.location.trim() === "" ? (
									<p>지역을 설정해주세요</p>
								) : (
									<p>{locationTag}</p>
								)}
							</ModalButton>
							<ModalButton onClick={handleNavigate(`/mypage/${userInfo.userId}`)}>
								<img src={peopleIcon} alt='사람' />
								<p>마이페이지</p>
							</ModalButton>
							<ModalButton onClick={clickFeedAddBtn}>
								<img src={addFeedIcon} alt='게시물추가' />
								<p>게시물작성</p>
							</ModalButton>
							<ModalButton onClick={logoutHandle} style={{ borderRadius: "0 0 12px 12px" }}>
								<img src={logoutIcon} alt='로그아웃' />
								<p>로그아웃</p>
							</ModalButton>
						</ModalNavSection>
					</ProfileLayout>
				</ModalLayout>
			)}
		</div>
	);
};

export default ProfileModal;

const ProfileLayout = styled.div`
	position: absolute;
	right: 40px;
	top: 50px;
	border: 1.6px solid #6f8a6b;
	width: 320px;
	height: 340px;
	background-color: white;
	border-radius: 14px;
`;

const UserInfoSection = styled.section`
	display: flex;
	align-items: center;
	padding-left: 15px;
	gap: 15px;
	height: 90px;
	border-bottom: 0.5px solid grey;
`;

const ProfileImgBox = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 100%;
	${Flex}
	img {
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
`;

const NicknameBox = styled.div`
	p {
		font-size: 15px;
	}
	margin-right: 50px;
`;

const ModalNavSection = styled.section`
	height: 300px;
`;

const ModalButton = styled.button`
	display: flex;
	align-items: center;
	gap: 20px;
	padding-left: 20px;
	height: 62px;
	width: 100%;
	cursor: pointer;
	&:hover {
		background-color: rgba(111, 138, 107, 0.1);
	}
	img {
		height: 16px;
		width: 16px;
	}
	p {
		font-size: 15px;
	}
`;
