import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router";
import { RootState } from "../../redux/config/configStore";
import { locationType } from "../../types/feedType";
import styled from "styled-components";
import { profileImageDefault, p_location } from "../../asstes/asstes";
import { Flex, cursor } from "../common/GlobalStyle";
import { ModalLayout } from "../common/commonFormStyles";
import { setUserLocation } from "../../api/userApi";
import LocationSetting from "./LocationSettingModal";
import { toggleModal } from "../../redux/modules/locationSet";

type ProfileModalProps = {
	modalState: boolean;
	logoutHandle: () => void;
	modalHandle: React.MouseEventHandler<HTMLDivElement>;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ modalState, logoutHandle, modalHandle }) => {
	//지역설정 모달
	const dispatch = useDispatch();
	const toggleLocationModal = () => {
		dispatch(toggleModal());
	}

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

	const userLocationValue = userInfo.location; // 기존에 지역을 설정한 사용자의 지역 정보

	useEffect(() => {
		if (userLocationValue.trim() !== "") {
			const temps = userLocationValue.split(" ");

			const address: locationType = {
				sido: temps[0],
				sigungu: temps[1],
				dong: temps[2],
			};

			setUserLocation(address); // 신규 가입 유저의 경우 기본 지역 값으로 저장
		}
	}, [userLocationValue]);

	const clickFeedAddBtn = () => {
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
								{userInfo.profileImageUrl === "nonImage" ? (
									<img src={profileImageDefault} alt='기본프로필' />
								) : (
									<img src={userInfo.profileImageUrl} alt='유저프로필' />
								)}
							</ProfileImgBox>
							<NicknameBox>
								<p>{userInfo.nickname}</p>
								<p style={{ fontSize: "13px", fontWeight: "normal", color: "#6A6A6A" }}>
									{userInfo.sub}
								</p>
							</NicknameBox>
						</UserInfoSection>
						<ModalNavSection onClick={modalHandle}>
							<ModalButton
								onClick={toggleLocationModal}
								style={{
									borderBottom: "0.5px solid #d3d3d3",
									fontSize: "10px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									gap: "5px",
								}}>
								<img src={p_location} alt='위치' />
									<p>{locationTag}</p>
							</ModalButton>
							<ModalButton onClick={handleNavigate(`/mypage/${userInfo.userId}`)}>
								<p>마이페이지</p>
							</ModalButton>
							<ModalButton onClick={clickFeedAddBtn}>
								<p>게시물작성</p>
							</ModalButton>
							<ModalButton onClick={logoutHandle} style={{ borderRadius: "0 0 6px 6px" }}>
								<p>로그아웃</p>
							</ModalButton>
						</ModalNavSection>
					</ProfileLayout>
				</ModalLayout>
			)}
			<LocationSetting

			/>
		</div>
	);
};

export default ProfileModal;

const ProfileLayout = styled.div`
	position: absolute;
	right: 13%;
	top: 6%;
	width: 230px;
	height: 250px;
	background-color: white;
	border: 1px solid #d3d3d3;
	border-radius: 6px;
	z-index: 998;
`;

const UserInfoSection = styled.section`
	display: flex;
	align-items: center;
	padding-left: 15px;
	gap: 15px;
	height: 80px;
	border-bottom: 0.5px solid #d3d3d3;
`;

const ProfileImgBox = styled.div`
	width: 45px;
	height: 45px;
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
		font-weight: bold;
	}
`;

const ModalNavSection = styled.section`
	height: 170px;
	${Flex}
	flex-direction: column;
`;

const ModalButton = styled.button`
	height: 42.5px;
	width: 100%;
	${cursor}
	&:hover {
		background-color: #efefef;
	}
	img {
		height: 16px;
		width: 16px;
	}
	p {
		font-size: 13px;
		color: #6a6a6a;
	}
`;
