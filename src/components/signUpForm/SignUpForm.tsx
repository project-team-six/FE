import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { signUp } from "../../api/userApi";
import { newUser } from "../../types/userType";
import { pushNotification } from "../../utils/notification";
import TextForm from "./textForm/TextForm";
import Announcement from "../common/announcement/Announcement";
import * as S from "./style";
import CongratulatoryForm from "./congratulatoryForm/CongratulatoryForm";

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

	const [isSuccess, setIsSuccess] = useState<boolean>(false); // 회원가입 성공 여부

    // 회원가입
	const signUpMutation = useMutation(signUp, {
		onSuccess: () => {
			setIsSuccess(true);
		},
		onError: (response) => {
			if (axios.isAxiosError(response) && response.response) pushNotification(response.response.data.error.message, "error");
			else pushNotification("회원 가입이 실패했습니다", "error");
		},
	});

	const clickAddBtn = () => {
		const isAllValuesEmpty = Object.values(textUserInfo).every(value => value !== "");
		if (isAllValuesEmpty) {
			let formData = new FormData();
			formData.append("data", new Blob([JSON.stringify(textUserInfo)], { type: "application/json" }));
			signUpMutation.mutate(formData);
		} else {
			pushNotification("필수 항목을 모두 입력해주세요.", "warning");
		}
	};

    return (
        <S.MainContentWrapper>
			{isSuccess?
			<CongratulatoryForm />
			:<S.SignUpBox>
				<Announcement content="회원가입"/>
				<TextForm setTextUserInfo={setTextUserInfo}/>
				<S.Button onClick={clickAddBtn}>회원가입</S.Button>
			</S.SignUpBox>}
        </S.MainContentWrapper>
    )
}

export default SignUpForm;