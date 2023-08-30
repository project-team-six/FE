import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { findUserEmail } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";
import { findEmailType } from "../../../types/userType";
import TextInputForm from "../../common/textInputForm/TextInputForm";
import * as S from "./style";

const SearchEmailForm = ({ setResult }: { setResult: (value: string) => void }) => {
	const [username, setUsername] = useState<string>(""); // 이름
	const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const [phoneNumber, setPhoneNumber] = useState<string>(""); // 전화번호
	const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	};

	const findEmailMutation = useMutation(findUserEmail, {
		onSuccess: (res) => {
			setResult(res.data.data.email);
		},
		onError: (error) => {
			if (error) pushNotification(`${error}`, "error");
			else pushNotification("에러가 발생했습니다. 나중에 다시 시도해주세요.", "error");
		},
	});

	const clickFindEmailBtn = () => {
		const userInfo: findEmailType = {
			username,
			phoneNumber,
		};
		findEmailMutation.mutate(userInfo);
	};

	const navigate = useNavigate();
	return (
		<S.MainContentWrapper>
			<S.Section>
				<TextInputForm label="이름" type="text" value={username} handleChange={handleChangeUsername} placeholder="이름을 입력해주세요. ex)홍길동" msg=""/>
			</S.Section>
			<S.Section>
				<TextInputForm label="휴대폰 번호" type="text" value={phoneNumber} handleChange={handleChangePhoneNumber} placeholder="'-'없이 숫자만 입력해주세요." msg=""/>
			</S.Section>
			<S.SectionButton>
				<S.Button onClick={() => clickFindEmailBtn()}>찾기</S.Button>
			</S.SectionButton>
			<section>
				<S.PwButton onClick={() => navigate("/findpassword")}>비밀번호가 기억나지 않으신가요?</S.PwButton>
			</section>
		</S.MainContentWrapper>
	);
};

export default SearchEmailForm;
