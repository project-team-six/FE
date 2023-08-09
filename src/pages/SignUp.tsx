import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { signUp } from "../api/userApi";
import { newUser } from "../types/signUp";
import InputForm from "../utils/InputForm";
import useInput from "../hooks/useInput";
import { pushNotification } from "../utils/notification";

const SignUp: React.FC = () => {
	// 이메일
	const [email, setEmail, isEmail, setIsEmail] = useInput();
	const emailPattern =
		/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

	// 이름
	const [username, setUsername, isUsername, setIsUsername] = useInput();
	const usernamePattern = /^[A-Za-z가-힣]+$/;

	// 별명
	const [nickname, setNickname, isNickname, setIsNickname] = useInput();
	const nicknamePattern = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;

	// 전화번호
	const [phoneNumber, setPhoneNumber, isPhoneNumber, setIsPhoneNumber] = useInput();
	const phoneNumberPattern = /^(\+?82|0)1[0-9]{1}[0-9]{3,4}[0-9]{4}$/;

	// 비밀번호
	const [password, setPassword, isPassword, setIsPassword] = useInput();
	const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

	// 비밀번호 확인
	const [matchPin, setMatchPin, isMatchPin, setIsMatchPin] = useInput();
	const [matchPinMsg, setMatchPinMsg] = useState(""); // 유효성 메시지
	const handleChangeMatchPin = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setMatchPin(val);

		if (password !== val) setMatchPinMsg("비밀번호가 일치하지 않습니다.");
		else {
			setMatchPinMsg("");
			setIsMatchPin(true);
		}
	};

	// 프로필 이미지
	const [profile, setProfile] = useState<File | undefined>();
	const changeProfile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setProfile(e.target.files[0]);
		else setProfile(undefined);
	};

	// 회원가입
	const navigate = useNavigate();
	const signUpMutation = useMutation(signUp, {
		onSuccess: () => {
			pushNotification("회원 가입에 성공했습니다!", "success");
			navigate("/");
		},
		onError: (error) => {
			pushNotification("회원 가입이 실패했습니다", "error");
		},
	});

	const clickAddBtn = () => {
		if (isEmail && isUsername && isNickname && isPhoneNumber && isPassword && isMatchPin) {
			let formData = new FormData();
			const user: newUser = {
				email,
				username,
				nickname,
				phoneNumber,
				password,
			};
			formData.append("data", new Blob([JSON.stringify(user)], { type: "application/json" }));
			if (profile) formData.append("file", profile); // 프로필 이미지

			signUpMutation.mutate(formData);
		}
	};

	return (
		<div>
			<section>
				<InputForm
					label='이메일'
					type='text'
					inputVal={email}
					setInputVal={setEmail}
					setIsVal={setIsEmail}
					pattern={emailPattern}
				/>
				<InputForm
					label='이름'
					type='text'
					inputVal={username}
					setInputVal={setUsername}
					setIsVal={setIsUsername}
					pattern={usernamePattern}
				/>
				<InputForm
					label='닉네임'
					type='text'
					inputVal={nickname}
					setInputVal={setNickname}
					setIsVal={setIsNickname}
					pattern={nicknamePattern}
				/>
				<InputForm
					label='전화번호'
					type='number'
					inputVal={phoneNumber}
					setInputVal={setPhoneNumber}
					setIsVal={setIsPhoneNumber}
					pattern={phoneNumberPattern}
				/>
				<InputForm
					label='비밀번호'
					type='password'
					inputVal={password}
					setInputVal={setPassword}
					setIsVal={setIsPassword}
					pattern={passwordPattern}
				/>
				<form>
					<label>비밀번호 확인</label>
					<input
						type='password'
						required
						placeholder='비밀번호를 입력해주세요.'
						value={matchPin}
						onChange={handleChangeMatchPin}
					/>
					<span>{matchPinMsg}</span>
				</form>
				<form>
					<label>프로필 이미지</label>
					<input type='file' onChange={changeProfile} />
				</form>
				<button onClick={clickAddBtn}>가입하기</button>
			</section>
		</div>
	);
};

export default SignUp;
