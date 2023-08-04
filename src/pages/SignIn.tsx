import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { NavigateFunction, useNavigate } from "react-router";
import styled from "styled-components";
import { kakaoSignIn, signIn } from "../api/userApi";
import mainlogo from "../asstes/mainlogo.png";
import { User } from "../types/signIn";

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

	const loginMutation = useMutation(signIn, {
		onSuccess: (res) => {
			const token = res.headers.authorization; // token 값 가져오기
			if (!token) alert("로그인 실패!"); // token 값이 없는 경우
			else {
				// token 값이 있는 경우
				document.cookie = `accessToken=${token}; path=/;`; // cookie에 token 저장
				alert("로그인 성공!");
			}
			navigate("/");
		},
		onError: () => {
			alert(`로그인 실패!`);
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
		kakaoSignIn();
	};

	console.log("안녕하세욜");

	return (
		<LoginLayout>
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
					type='text'
					placeholder='비밀번호를 입력해주세요'
					name='password'
					value={password}
					onChange={onChangeLoginHandler}
				/>
			</InputSection>
			<ButtonSection>
				<button>ID/비밀번호찾기</button>
				<button onClick={onClickLoginBtnHandler}>로그인</button>
				<button onClick={handleNavigate("/signup")}>회원가입하기</button>
				<button onClick={() => kakaoLoginHandler()}>카카오톡으로 로그인하기</button>
			</ButtonSection>
		</LoginLayout>
	);
};
export default SignIn;
const LoginLayout = styled.div`
	width: 320px;
`;
const LogoSection = styled.section``;
const InputSection = styled.section``;
const ButtonSection = styled.section``;
