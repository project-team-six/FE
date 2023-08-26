import React from "react";
import { NavigateFunction, useNavigate } from "react-router";
import * as S from "./style";

const BannerForm = () => {
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	return (
		<S.BannerSection>
			<h1 style={{ paddingTop: "120px" }}>나누고 나눠지는</h1>
			<h1 style={{ paddingBottom: "50px" }}>1인가구를 위한 소분 커뮤니티</h1>
			<p>
				<span>소분소분</span>은 제품 종류와 상관없이 사용자들이 함께 나누고 소통하는 공간을 제공합니다.
			</p>
			<p>식품부터 일회용품까지, 소비의 의미를 새롭게 만나보세요.</p>
			<S.StartBtn onClick={handleNavigate("/feedlist")}>시작하기</S.StartBtn>
		</S.BannerSection>
	);
};

export default BannerForm;
