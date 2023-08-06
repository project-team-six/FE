import React from "react";
import Postcode from "@actbase/react-daum-postcode";
import { NavigateFunction, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/modules/locationSet";

const LocationSetting = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch = useDispatch();

	const getAddressData = (data: any) => {
		navigate("/feedlist");
		alert(`지역이 ${data.sido} ${data.sigungu} ${data.bname}으로 설정되었습니다!`);

		const address = {
			sido: data.sido,
			sigungu: data.sigungu,
			dong: data.bname,
		};
		console.log("Address to dispatch:", address); // 디스패치 전에 주소값을 확인하기 위해 콘솔 출력
		dispatch(setLocation(address));
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
