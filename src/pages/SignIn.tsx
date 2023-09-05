import React, { useState } from "react";
import { useMutation } from "react-query";
import { NavigateFunction, useNavigate } from "react-router";
import { signIn } from "../api/userApi";
import { pushNotification } from "../utils/notification";
import { User } from "../types/userType";
import axios from "axios";
import styled from "styled-components";
import { Flex } from "../components/common/GlobalStyle";
import { line } from "../asstes/asstes";
import { saveToken } from "../utils/saveToken";

const SignIn = () => {
	const navigate: NavigateFunction = useNavigate();
	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	// 구조 분해 할당으로 입력된 정보 저장
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
	});
	const { email, password } = userInfo;
	const onChangeLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setUserInfo({
			...userInfo,
			[name]: value,
		});
	};

	//로그인 성공하면 토큰 쿠키에 저장하고 리덕스로 토큰값 보내주는 곳
	const loginMutation = useMutation(signIn, {
		onSuccess: (res) => {
			const token = res.headers.authorization; // 엑세스토큰
			const refreshToken = res.headers.refreshtoken; // 리프레쉬토큰
			if (!token) {
				pushNotification("로그인 실패!", "warning");
			} else {
				saveToken("accessToken", token); // 세션에 accessToken 저장
				saveToken("refreshToken", refreshToken); // 세션에 refreshToken 저장 
			}
			navigate("/");
		},
		onError: (response) => {
			if (axios.isAxiosError(response) && response.response) {
				pushNotification(response.response.data.error.message, "error");
			} else {
				pushNotification("오류가 발생했습니다.", "error");
			}
		},
	});

	//이메일 형식 체크
	const isValidEmail = (email: string) => {
		const emailRegex =
			/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		return emailRegex.test(email);
	};

	//로그인 유효성 검사 후 통과하면 mutate 실행
	const onClickLoginBtnHandler = () => {
		const user: User = {
			email,
			password,
		};
		if (email.trim() === "") {
			return pushNotification("이메일을 입력해주세요", "warning");
		} else if (!isValidEmail(email)) {
			return pushNotification("올바른 이메일 형식이 아닙니다", "error");
		} else if (password.trim() === "") {
			return pushNotification("비밀번호를 입력해주세요", "warning");
		} else {
			loginMutation.mutate(user);
		}
	};

	//카카오로그인
	const kakaoLoginHandler = () => {
		window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
	};

	return (
		<LoginLayout>
			<LogoSection>로그인</LogoSection>
			<InputSection>
				<p>이메일</p>
				<input
					type="text"
					name="email"
					value={email}
					onChange={onChangeLoginHandler}
					style={{ marginBottom: "40px" }}
				/>
				<p>비밀번호</p>
				<input type="password" name="password" value={password} onChange={onChangeLoginHandler} />
			</InputSection>
			<FormSection>
				<FormButton onClick={onClickLoginBtnHandler} $backgroundColor="#4FBE9F" color="white">
					로그인
				</FormButton>
				<OrLine>
					<img src={line} alt="선" />
					<span>또는</span>
					<img src={line} alt="선" />
				</OrLine>
				<FormButton onClick={kakaoLoginHandler} $backgroundColor="#FCE224" color="black">
					카카오로 로그인/회원가입
				</FormButton>
			</FormSection>
			<FindSection>
				<button onClick={handleNavigate("/findemail")}>이메일 찾기</button>
				<span>ㅣ</span>
				<button onClick={handleNavigate("/findpassword")}>비밀번호 찾기</button>
				<span>ㅣ</span>
				<button onClick={handleNavigate("/signup")}>회원가입</button>
			</FindSection>
		</LoginLayout>
	);
};
export default SignIn;

const LoginLayout = styled.div`
	display: grid;
	place-items: center;
	margin: 0 auto;
	max-width: 1280px;
	margin-top: 125px;
`;
const LogoSection = styled.section`
	font-size: 35px;
	font-weight: 700;
	margin-bottom: 75px;
`;
const InputSection = styled.form`
	p {
		font-size: 17px;
		font-weight: 500;
		padding-bottom: 5px;
	}
	input {
		width: 400px;
		height: 55px;
		border: 1px solid #c5c5c5;
		border-radius: 10px;
		padding-left: 7px;
	}
`;
const FormSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	padding-top: 35px;
`;

type ButtonProps = {
	color: string;
	$backgroundColor?: string;
};

const FormButton = styled.button<ButtonProps>`
	${Flex}
	width: 400px;
	height: 55px;
	cursor: pointer;
	border-radius: 10px;
	background-color: ${(props) => props.$backgroundColor};
	color: ${(props) => props.color};
	font-size: 18px;
	font-weight: bold;
`;

const OrLine = styled.div`
	display: flex;
	align-items: center;
	gap: 25px;
	span {
		font-size: 15px;
		font-weight: 500;
		color: #9a9a9a;
	}
`;

const FindSection = styled.section`
	margin: 50px 0 290px 0;
	span {
		color: #9a9a9a;
	}
	button {
		cursor: pointer;
		font-size: 14px;
		color: #9a9a9a;
		font-weight: 500;
	}
`;
