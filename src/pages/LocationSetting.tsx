
import Postcode from "@actbase/react-daum-postcode";
import { NavigateFunction, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/modules/locationSet";
import { setUserLocation } from "../api/feedApi";
import { locationType } from "../types/feedType";

const LocationSetting = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch = useDispatch();

	const getAddressData = (data: any) => {
		navigate("/feedlist");
		alert(`지역이 ${data.sido} ${data.sigungu} ${data.bname}으로 설정되었습니다!`);

		const sido: string = data.sido;
		const sigungu: string = data.sigungu;
		const dong: string = data.bname;

		const address: locationType = {
			sido,
			sigungu,
			dong,
		};

		// 서버에서 설정한 위치 정보 전달
		setUserLocation(address).then(() => {
			alert("지역이 등록 되었습니다.");
		}).catch(error => {
			alert("지역 등록을 실패했습니다. 다시 시도해주세요.");
		});
		
		dispatch(setLocation(address)); // 리덕스에 저장
	};

	return (
		<div>
			<Postcode
				style={{ flex: 1, width: "95%", margin: "0 auto", zIndex: 999 }}
				jsOptions={{ animation: true }}
				// onSelected 옵션은 결과값을 클릭할때 실행되는 함수
				onSelected={(data: any) => getAddressData(data)}
				onError={function (error: unknown): void {
					throw new Error("Function not implemented.");
				}}
			/>
		</div>
	);
};

export default LocationSetting;
