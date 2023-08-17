import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import TextForm from "./textForm/TextForm";
import { signUp } from "../../api/userApi";
import { pushNotification } from "../../utils/notification";
import ProfileForm from "./profileForm/ProfileForm";
import * as S from "./style";
import {  newUser } from "../../types/userType";
import { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [textUserInfo, setTextUserInfo] = useState<newUser>(
        {
            email: "",    // 이메일
            username: "", // 이름
            nickname: "", // 별명
            phoneNumber: "", // 전화번호
            password: "", // 비밀번호
        }
    );
    const [profile, setProfile] = useState<File | undefined>(); // 프로필 이미지

    // 회원가입
	const navigate = useNavigate();
	const signUpMutation = useMutation(signUp, {
		onSuccess: () => {
			pushNotification("회원 가입에 성공했습니다!", "success");
			navigate("/signin");
		},
		onError: (response) => {
			if (axios.isAxiosError(response) && response.response) pushNotification(response.response.data.error.message, "error");
			else pushNotification("회원 가입이 실패했습니다", "error");
		},
	});

	const clickAddBtn = () => {
		if (textUserInfo) {
			let formData = new FormData();

			formData.append("data", new Blob([JSON.stringify(textUserInfo)], { type: "application/json" }));
			if (profile) formData.append("file", profile); // 프로필 이미지

			signUpMutation.mutate(formData);
		}
	};

    return (
        <S.MainContentWrapper>
            <ProfileForm setProfile={setProfile}/>
			<TextForm setTextUserInfo={setTextUserInfo}/>
            <S.Button onClick={clickAddBtn}>가입 완료</S.Button>
        </S.MainContentWrapper>
    )
}

export default SignUpForm;