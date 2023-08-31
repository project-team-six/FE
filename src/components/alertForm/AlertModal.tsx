import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavigateFunction, useNavigate } from "react-router";
import styled from "styled-components";
import { allDeleteAlert, fetchAlert } from "../../api/alertApi";
import { noAlertIcon, profileImageDefault } from "../../asstes/asstes";
import { AlertList } from "../../types/alertType";
import { ModalLayout } from "../common/commonFormStyles";
// import SseAlert from "./SseAlert";
type AlertModalProps = {
	modalState: boolean;
	modalHandle: React.MouseEventHandler<HTMLDivElement>;
	setAlertCount: React.Dispatch<React.SetStateAction<number>>;
};
const AlertModal: React.FC<AlertModalProps> = ({ modalState, modalHandle, setAlertCount }) => {
	// SseAlert();
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		navigate(path);
	};
	//알림 조회
	const { data: alertList, isLoading, isError } = useQuery(["alertList"], () => fetchAlert());

	//불필요한 렌더링 방지
	useEffect(() => {
		if (alertList) {
			setAlertCount(alertList?.data.length);
		}
	}, [alertList, setAlertCount]);


	//알림 삭제
	const deleteAllAlertClient = useQueryClient();
	const allAlertDeleteBtn = () => {
		allDeleteAlert()
			.then(() => {
				deleteAllAlertClient.invalidateQueries(["alertList"]);
			})
			.catch(() => {
				console.log("알림전체삭제 실패");
			});
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;
	return (
		<div>
			{modalState && (
				<ModalLayout onClick={modalHandle}>
					<AlertLayout onClick={(e: any) => e.stopPropagation()}>
						{alertList?.data.map((alert: AlertList) => {
							return (
								<>
									<AlertSection key={alert.notificationId} onClick={handleNavigate(alert.url)}>
										{alert.senderProfileImageUrl === "nonImage" ? (
											<>
												<ProfileImgBox>
													<img src={profileImageDefault} alt='보낸이 프로필' />
												</ProfileImgBox>
											</>
										) : (
											<>
												<ProfileImgBox>
													<img src={alert.senderProfileImageUrl} alt='보낸이 프로필' />
												</ProfileImgBox>
											</>
										)}
										<TextWrapper>
											<MemoBox>{`${alert.senderNickname}님으로부터 ${alert.message}`}</MemoBox>
											<AlertAtBox>{alert.createdAt}</AlertAtBox>
										</TextWrapper>
									</AlertSection>
								</>
							);
						})}
						{alertList?.data.length === 0 ? (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									height: "400px",
									gap: "10px",
									paddingBottom: "15px",
								}}>
								<img src={noAlertIcon} alt='무표정' style={{ width: "30px", height: "30px" }} />
								<div>새로운 알림이 없습니다.</div>
							</div>
						) : (
							<>
								<AllDeleteBox>
									<button onClick={allAlertDeleteBtn}>알림 전체 삭제</button>
								</AllDeleteBox>
							</>
						)}
					</AlertLayout>
				</ModalLayout>
			)}
		</div>
	);
};
export default AlertModal;
const AlertLayout = styled.div`
	position: absolute;
	right: 16%;
	top: 6%;
	width: 290px;
	height: 400px;
	border: 1px solid #d3d3d3;
	background-color: white;
	border-radius: 10px;
	overflow-y: auto;
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
	z-index: 998;
`;
const AlertSection = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	width: 290px;
	height: 60px;
	border-bottom: 0.5px solid #d3d3d3;
	&:hover {
		background-color: #efefef;
	}
`;
const ProfileImgBox = styled.div`
	padding-left: 13px;
	img {
		width: 45px;
		height: 45px;
		border-radius: 100%;
	}
`;

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 5px;
	gap: 5px;
`;

const MemoBox = styled.div`
	width: 220px;
	font-size: 12px;
`;
const AlertAtBox = styled.div`
	color: #7b7b7b;
	font-size: 12px;
`;

const AllDeleteBox = styled.div`
	display: flex;
	justify-content: center;
	height: 30px;
	font-size: 10px;
	button {
		cursor: pointer;
		color: #7b7b7b;
		&:hover {
			font-weight: bold;
		}
	}
`;
