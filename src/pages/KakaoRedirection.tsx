import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDecodeToken } from "../redux/modules/user";

const KakaoRedirection = () => {
	//인가코드 파싱하기
	const code = new URL(window.location.toString()).searchParams.get("code");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		//인가코드 서버로 보내서 액세스토큰 받기
		axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/kakao/login?code=${code}`).then((response) => {
			const token = response.headers.authorization;
			if (token) {
				document.cookie = `accessToken=${token}; path=/;`;
				dispatch(setDecodeToken(token));
			}
			navigate("/");
		});
	});

	return <div>로그인중입니다</div>;
};

export default KakaoRedirection;
