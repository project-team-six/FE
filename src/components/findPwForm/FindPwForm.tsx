import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { findPassword } from "../../api/userApi";
import { pushNotification } from "../../utils/notification";
import { findPwType } from "../../types/userType";
import TextInputForm from "../common/textInputForm/TextInputForm";
import Announcement from "../common/announcement/Announcement";
import * as S from "./style";

const FindPwForm = () => {
	const [username, setUsername] = useState<string>(""); // 이름
    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value) };

	const [email, setEmail] = useState<string>(""); // 이메일
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) };

    const [phoneNumber, setPhoneNumber] = useState<string>(""); // 전화번호
    const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => { setPhoneNumber(e.target.value) };


	const findPwMutation = useMutation(findPassword, {
		onSuccess: () => {
			pushNotification("이메일로 임시 비밀번호를 전송했습니다.", "success");
		},
		onError: (error) => {
			pushNotification("존재하지 않는 정보입니다", "warning");
		},
	});

	const clickFindPwBtn = () => {
		const userinfo: findPwType = {
			email,
			username,
			phoneNumber,
		};
		findPwMutation.mutate(userinfo);
	};

	const navigate = useNavigate();
	return (
		<S.MainContentWrapper>
			<Announcement content="비밀번호 찾기"/>
			<div>
				<S.Section>
					<TextInputForm label="이름" type="text" value={username} handleChange={handleChangeUsername} placeholder="이름을 입력해주세요. ex)홍길동" msg=""/>
				</S.Section>
				<S.Section>
					<TextInputForm label="이메일" type="text" value={email} handleChange={handleChangeEmail} placeholder="이메일을 입력해주세요." msg=""/>
				</S.Section>
				<S.Section>
					<TextInputForm label="핸드폰 번호" type="text" value={phoneNumber} handleChange={handleChangePhoneNumber} placeholder="'-'없이 숫자만 입력해주세요." msg=""/>
				</S.Section>
				<S.SectionButton>
					<S.Button onClick={clickFindPwBtn}>찾기</S.Button>
				</S.SectionButton>
				<section>
					<S.EmailButton onClick={() => navigate("/findemail")}>이메일이 기억나지 않으신가요?</S.EmailButton>
				</section>
			</div>
		</S.MainContentWrapper>
	);
};

export default FindPwForm;
