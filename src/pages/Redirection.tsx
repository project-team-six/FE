import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDecodeToken } from "../redux/modules/user";

const Redirection = () => {
	const code = new URL(window.location.toString()).searchParams.get("code");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/kakao/login?code=${code}`).then((r) => {
			const token = r.headers.authorization;
			document.cookie = `accessToken=${token}; path=/;`;
			console.log("token?", token);
			dispatch(setDecodeToken(token));
			// navigate("/");
			window.location.reload();
		});
	});

	return <div>로그인중입니다</div>;
};

export default Redirection;
