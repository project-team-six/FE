import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavigateFunction, useNavigate } from "react-router";
import styled from "styled-components";
import { deleteAlert, fetchAlert } from "../../api/alertApi";
import { AlertList } from "../../types/alertType";
import { ModalLayout } from "../common/commonFormStyles";
import SseAlert from "./SseAlert";
type AlertModalProps = {
	modalState: boolean;
	modalHandle: React.MouseEventHandler<HTMLDivElement>;
	setAlertCount: React.Dispatch<React.SetStateAction<number>>;
};
const AlertModal: React.FC<AlertModalProps> = ({ modalState, modalHandle, setAlertCount }) => {
	SseAlert();
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	//알림 조회
	const { data: alertList, isLoading, isError } = useQuery(["alertList"], () => fetchAlert());

	setAlertCount(alertList?.data.length);

	//알림 삭제
	const deleteAlertClient = useQueryClient();
	const SingleAlertDeleteBtn = (notificationId: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		deleteAlert(notificationId)
			.then(() => {
				deleteAlertClient.invalidateQueries(["alertList"]);
			})
			.catch(() => {
				console.log("알림삭제 실패 무슨 연휴일까나!");
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
								<AlertSection key={alert.notificationId}>
									<ProfileImgBox>
										<img src={alert.senderProfileImageUrl} alt='보낸이 프로필' />
									</ProfileImgBox>
									<TextWrapper>
										<MemoBox>{`${alert.senderNickname}님으로부터 ${alert.message}`}</MemoBox>
										<AlertAtBox>{alert.createdAt}</AlertAtBox>
									</TextWrapper>
									<SingleDeleteButton onClick={SingleAlertDeleteBtn(alert.notificationId)}>
										알림삭제
									</SingleDeleteButton>
								</AlertSection>
							);
						})}
						<AllDeleteBox>
							<button>알림 전체 삭제</button>
						</AllDeleteBox>
					</AlertLayout>
				</ModalLayout>
			)}
		</div>
	);
};
export default AlertModal;
const AlertLayout = styled.div`
	width: 290px;
	height: 400px;
	background-color: white;
	border-radius: 10px;
	overflow-y: auto;
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
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
const SingleDeleteButton = styled.button`
	cursor: pointer;
	position: absolute;
	bottom: 5px;
	color: #7b7b7b;
	right: 10px;
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
