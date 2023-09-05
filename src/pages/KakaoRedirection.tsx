import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/common/Loading";
import { saveToken } from "../utils/saveToken";

const KakaoRedirection = () => {
	//인가코드 파싱하기
	const code = new URL(window.location.toString()).searchParams.get("code");
	const navigate = useNavigate();
	useEffect(() => {
		//인가코드 서버로 보내서 액세스토큰 받기
		axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/kakao/login?code=${code}`).then((response) => {
			const token = response.headers.authorization;
			const refreshToken = response.headers.refreshtoken;
			if (token) {
				saveToken("accessToken", token); // 세션에 accessToken 저장
				saveToken("refreshToken", refreshToken); // 세션에 accessToken 저장
			}
			navigate("/");
		});
	});

	return (
		<div>
			<Loading />
		</div>
	);
};

export default KakaoRedirection;
