import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { signUp } from "../../api/userApi";
import { newUser } from "../../types/signUp";
import InputForm from "./inputForm/InputForm";
import useInput from "../../hooks/useInput";
import { pushNotification } from "../../utils/notification";
import * as S from "./style";
import profileImageDefault from "../../asstes/profileImageDefault.png"

const SignUpForm: React.FC = () => {
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

		if (password != val) setMatchPinMsg("비밀번호가 일치하지 않습니다.");
		else {
			setMatchPinMsg("");
			setIsMatchPin(true);
		}
	};

	// 프로필 이미지
	const [profile, setProfile] = useState<File | undefined>();
    const [imagePreview, setImagePreview] = useState<string>(); // 썸네일
	const changeProfile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files){
            const file = e.target.files[0];
            setProfile(file);

            // 썸네일 저장
			const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
		else setProfile(undefined);
	};
    const clickDeleteProfileBtn = () => {
        setProfile(undefined);
        setImagePreview("");
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
		<S.MainContentWrapper>
            <S.TitleSpan>회원가입</S.TitleSpan>
            <S.ImgForm>
                {imagePreview?
                <S.Img src={imagePreview} alt="profile"/> : 
                <S.Img src={profileImageDefault} alt="profileImageDefault"/>
                }
                <S.ImgFormButton>
                    <S.CustomImgInput onChange={changeProfile} />
                    <S.ImgButton as="label" htmlFor="profile">업로드</S.ImgButton>
                    <S.ImgButton onClick={clickDeleteProfileBtn}>초기화</S.ImgButton>
                </S.ImgFormButton>
            </S.ImgForm>
            <InputForm
                label="이메일"
                type="text"
                inputVal={email}
                setInputVal={setEmail}
                setIsVal={setIsEmail}
                pattern={emailPattern}
            />
            <InputForm
                label="비밀번호"
                type="password"
                inputVal={password}
                setInputVal={setPassword}
                setIsVal={setIsPassword}
                pattern={passwordPattern}
            />
            <S.Form>
                <label>비밀번호 확인</label>
                <br />
                <S.Input
                    type="password"
                    required
                    value={matchPin}
                    onChange={handleChangeMatchPin}
                />
                <br />
                <S.InputForm>{matchPinMsg}</S.InputForm>
            </S.Form>
            <InputForm
                label="이름"
                type="text"
                inputVal={username}
                setInputVal={setUsername}
                setIsVal={setIsUsername}
                pattern={usernamePattern}
            />
            <InputForm
                label="닉네임"
                type="text"
                inputVal={nickname}
                setInputVal={setNickname}
                setIsVal={setIsNickname}
                pattern={nicknamePattern}
            />
            <InputForm
                label="전화번호"
                type="number"
                inputVal={phoneNumber}
                setInputVal={setPhoneNumber}
                setIsVal={setIsPhoneNumber}
                pattern={phoneNumberPattern}
            />
            <S.Button onClick={clickAddBtn}>가입 완료</S.Button>
		</S.MainContentWrapper>
	);
};

export default SignUpForm;