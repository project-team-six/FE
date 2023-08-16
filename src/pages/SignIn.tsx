import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router";
import styled from "styled-components";
import { signIn } from "../api/userApi";
import mainlogo from "../asstes/mainlogo.png";
import { Flex } from "../components/common/GlobalStyle";
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
		<LoginLayout>
			<LogoSection>
				<img src={mainlogo} alt='로고' />
			</LogoSection>
			<InputSection>
				<p>이메일주소</p>
				<input
					type='text'
					name='email'
					value={email}
					onChange={onChangeLoginHandler}
					style={{ marginBottom: "30px" }}
				/>
				<p>비밀번호</p>
				<input type='password' name='password' value={password} onChange={onChangeLoginHandler} />
			</InputSection>
			<FindSection>
				<button onClick={handleNavigate("/signup")}>회원가입</button>
				<span>ㅣ</span>
				<button onClick={handleNavigate("/findemail")}>이메일 찾기</button>
				<span>ㅣ</span>
				<button onClick={handleNavigate("/findemail")}>비밀번호 찾기</button>
			</FindSection>
			<FormSection>
				<FormButton onClick={onClickLoginBtnHandler} backgroundColor='#6F8A6B' color='white'>
					로그인
				</FormButton>
				<p>또는</p>
				<FormButton onClick={kakaoLoginHandler} backgroundColor='#FFEB3B' color='black' style={{ gap: "10px" }}>
					<img src={require(`../asstes/kakaologin.png`)} alt='카카오로고' />
					<span>카카오톡</span>
				</FormButton>
			</FormSection>
		</LoginLayout>
	);
};
export default SignIn;
const LoginLayout = styled.div`
	display: grid;
	place-items: center;
	margin: 0 auto;
	max-width: 1280px;
	margin-top: 100px;
`;
const LogoSection = styled.section`
	img {
		width: 200px;
		height: 100px;
		margin-bottom: 30px;
	}
	padding-bottom: 30px;
`;
const InputSection = styled.form`
	p {
		padding-bottom: 5px;
	}
	input {
		width: 330px;
		height: 40px;
		background-color: #f3f3f3;
		border-radius: 5px;
		margin-bottom: 5px;
	}
`;
const FindSection = styled.section`
	margin-left: 100px;
	button {
		cursor: pointer;
	}
`;
const FormSection = styled.section`
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 70px 0 100px 0;
`;

type ButtonProps = {
	color: string;
	backgroundColor?: string;
};

const FormButton = styled.button<ButtonProps>`
	${Flex}
	width: 139px;
	height: 33px;
	cursor: pointer;
	border-radius: 21px;
	background-color: ${(props) => props.backgroundColor};
	color: ${(props) => props.color};
	font-size: 15px;
	img {
		width: 19px;
		height: 36px;
	}
`;