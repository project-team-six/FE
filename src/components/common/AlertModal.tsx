import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavigateFunction, useNavigate } from "react-router";
import styled from "styled-components";
import { deleteAlert, fetchAlert } from "../../api/alertApi";
import { AlertList } from "../../types/alertType";
import { ModalLayout } from "./commonFormStyles";

type AlertModalProps = {
	modalState: boolean;
	modalHandle: React.MouseEventHandler<HTMLDivElement>;
};

const AlertModal: React.FC<AlertModalProps> = ({ modalState, modalHandle }) => {
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};
	//알림 조회
	const { data: alertList, isLoading, isError } = useQuery("alertList", () => fetchAlert());
	console.log(alertList);

	//알림 삭제
	const deleteAlertClient = useQueryClient();
	const SingleAlertDeleteBtn = (notificationId: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		deleteAlert(notificationId)
			.then(() => {
				deleteAlertClient.invalidateQueries(["alert"]);
			})
			.catch(() => {
				console.log("댓글삭제 실패 무슨 연휴일까나!");
			});
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error...</div>;
	return (
		<div>
			{modalState && (
				<ModalLayout onClick={modalHandle}>
					<AlertLayout onClick={(e: any) => e.stopPropagation()}>
						{alertList.data.map((alert: AlertList, index: number) => {
							<AlertSection key={index}>
								<ProfileImgBox>
									<img src={alert.senderProfileImageUrl} alt='보낸이 프로필' />
								</ProfileImgBox>
								<MemoBox>{alert.message}</MemoBox>
								<div>
									<AlertAtBox>{alert.createdAt}</AlertAtBox>
									<SingleDeleteButton onClick={SingleAlertDeleteBtn(alert.notificationId)}>
										알림삭제
									</SingleDeleteButton>
								</div>
							</AlertSection>;
						})}

						<AllDeleteBox>
							<button>알림 전체 삭제</button>3
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
	background-color: aliceblue;
`;
const AlertSection = styled.div`
	width: 290px;
	height: 60px;
	border-bottom: 0.5px solid #d3d3d3;
	&:hover {
		background-color: #efefef;
	}
`;

const ProfileImgBox = styled.div`
	img {
		width: 45px;
		height: 45px;
		border-radius: 100%;
	}
`;

const MemoBox = styled.div`
	width: 220px;
`;

const AlertAtBox = styled.div``;

const SingleDeleteButton = styled.button``;

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
