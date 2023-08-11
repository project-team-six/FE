import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router";
import styled from "styled-components";
import { signIn } from "../api/userApi";
import mainlogo from "../asstes/mainlogo.png";
import { LayoutBox } from "../components/common/GlobalStyle";
import { setDecodeToken } from "../redux/modules/user";
import { User } from "../types/signIn";
import { pushNotification } from "../utils/notification";

const SignIn = () => {
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
	});

	// 구조 분해 할당으로 입력된 정보 저장
	const { email, password } = userInfo;
	const onChangeLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setUserInfo({
			...userInfo,
			[name]: value,
		});
	};

	//로그인 성공하면 토큰 쿠키에 저장하고 리덕스로 토큰값 보내주는 곳
	const dispatch = useDispatch();
	const loginMutation = useMutation(signIn, {
		onSuccess: (res) => {
			const token = res.headers.authorization; // token 값 가져오기
			if (!token) {
				pushNotification("로그인 실패!", "warning");
			} // token 값이 없는 경우
			else {
				// token 값이 있는 경우
				document.cookie = `accessToken=${token}; path=/;`; // cookie에 token 저장
				dispatch(setDecodeToken(token));
				pushNotification("로그인 성공!", "success");
			}
			navigate("/");
		},
		onError: () => {
			pushNotification("로그인 실패!", "error");
		},
	});

	const onClickLoginBtnHandler = () => {
		const user: User = {
			email,
			password,
		};
		loginMutation.mutate(user);
	};

	const kakaoLoginHandler = () => {
		window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
	};

	return (
		<LayoutBox style={{ flexDirection: "column" }}>
			<LogoSection>
				<img src={mainlogo} alt='로고' />
			</LogoSection>
			<InputSection>
				<p>ID 또는 이메일주소</p>
				<input
					type='text'
					placeholder='ID또는 이메일주소를 입력해주세요'
					name='email'
					value={email}
					onChange={onChangeLoginHandler}
				/>
				<p>비밀번호</p>
				<input
					type='password'
					placeholder='비밀번호를 입력해주세요'
					name='password'
					value={password}
					onChange={onChangeLoginHandler}
				/>
			</InputSection>
			<ButtonSection>
				<button onClick={handleNavigate("/findemail")}>이메일 찾기</button>
				<button onClick={handleNavigate("/findpassword")}>비밀번호 찾기</button>
				<button onClick={onClickLoginBtnHandler}>로그인</button>
				<button onClick={handleNavigate("/signup")}>회원가입하기</button>
				<button onClick={kakaoLoginHandler}>카카오톡으로 로그인하기</button>
			</ButtonSection>
		</LayoutBox>
	);
};
export default SignIn;
const LogoSection = styled.section`
	width: 310px;
	height: 100px;
`;
const InputSection = styled.section``;
const ButtonSection = styled.section``;
