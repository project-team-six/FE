import { setUserLocation } from "../../api/userApi";
import { locationType } from "../../types/feedType";
import { pushNotification } from "../../utils/notification";
import { deleteToken } from "../../utils/deleteToken";
import styled from "styled-components";
import { BsXLg } from "react-icons/bs";
import DaumPostcodeEmbed from "react-daum-postcode";
import { saveToken } from "../../utils/saveToken";
import { useDispatch } from "react-redux";

type LocationModalProps = {
	isLocationModal: boolean;
	toggleLocationModal: React.MouseEventHandler<HTMLDivElement>;
	setIsLocationModal: (prevModalState: boolean) => void;
};

const LocationSetting: React.FC<LocationModalProps> = ({
	isLocationModal,
	toggleLocationModal,
	setIsLocationModal,
}) => {
	const dispatch = useDispatch();
	const getAddressData = (data: any) => {
		const sido: string = data.sido;
		const sigungu: string = data.sigungu;
		const dong: string = data.bname;

		const address: locationType = {
			sido,
			sigungu,
			dong,
		};

		// 서버로 위치정보 전달
		setUserLocation(address)
			.then((response) => {
				const token = response.headers.authorization;
				if (token) {
					// 토큰이 있는 경우
					deleteToken("accessToken"); // 기존 token 삭제
					saveToken("accessToken", token, dispatch); // 세션에 accessToken 저장
				}
				pushNotification(`지역이 ${data.sido} ${data.sigungu} ${data.bname}으로 설정되었습니다!`, "success");
			})
			.catch((error) => {
				pushNotification("지역 등록을 실패했습니다. 다시 시도해주세요.", "error");
			});

		setIsLocationModal(false);
	};

	return (
		<>
			{isLocationModal && (
				<LocationModal>
					<PostcodeWrapper onClick={toggleLocationModal}>
						<BsXLg style={{ width: "25px", height: "25px", color: "white" }} />
						<BorderBox onClick={(e: any) => e.stopPropagation()}>
							<DaumPostcodeEmbed
								onComplete={getAddressData}
								style={{ height: "400px", padding: "20 20 20 20" }}
							/>
							;
						</BorderBox>
					</PostcodeWrapper>
				</LocationModal>
			)}
		</>
	);
};

export default LocationSetting;

const LocationModal = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.2);
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;

const PostcodeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const BorderBox = styled.div`
	width: 700px;
	@media (max-width: 700px) {
		width: 385px;
	}
`;
