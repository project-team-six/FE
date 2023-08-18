import { useEffect, useState } from "react";
import { newUser, textInfoType } from "../../../types/userType";
import InputForm from "./inputForm/InputForm";

const TextForm = ({ setTextUserInfo }: { setTextUserInfo: React.Dispatch<React.SetStateAction<newUser>> }) => {
	const [email, setEmail] = useState<string>("");
	const emailInfo: textInfoType = {
		kind: "이메일",
		type: "text",
		errorMsg: "사용 할 수 없는 이메일 입니다.",
		condition: /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
	};

	const [password, setPassword] = useState<string>("");
	const passwordInfo: textInfoType = {
		kind: "비민번호",
		type: "password",
		errorMsg: "사용 할 수 없는 비민번호 입니다.",
		condition: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
	};

	const [matchPassword, setMatchPassword] = useState<string>("");
	const matchPasswordInfo: textInfoType = {
		kind: "비민번호 확인",
		type: "password",
		errorMsg: "비밀번호가 일치하지 않습니다.",
		condition: password,
	};

	const [username, setUsername] = useState<string>("");
	const usernameInfo: textInfoType = {
		kind: "이름",
		type: "text",
		errorMsg: "사용 할 수 없는 이름 입니다.",
		condition: /^[A-Za-z가-힣]+$/,
	};

	const [nickname, setNickname] = useState<string>("");
	const nicknameInfo: textInfoType = {
		kind: "닉네임",
		type: "text",
		errorMsg: "사용 할 수 없는 닉네임 입니다.",
		condition: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
	};

	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const phoneNumberInfo: textInfoType = {
		kind: "전화번호",
		type: "text",
		errorMsg: "사용 할 수 없는 전화번호 입니다.",
		condition: /^(\+?82|0)1[0-9]{1}[0-9]{3,4}[0-9]{4}$/,
	};

	let isSuccess = false;
	if (email && password && matchPassword && username && nickname && phoneNumber) {
		isSuccess = true;
	}

	useEffect(() => {
		const newInfo: newUser = {
			email,
			password,
			username,
			nickname,
			phoneNumber,
		};
		setTextUserInfo(newInfo);
	}, [isSuccess]);

	return (
		<section>
			<InputForm textInfo={emailInfo} setValue={setEmail} placeholder={"이메일을 입력해주세요"} />
			<InputForm
				textInfo={passwordInfo}
				setValue={setPassword}
				placeholder={"특수문자포함 8자이상 비밀번호를 입력해주세요"}
			/>
			<InputForm
				textInfo={matchPasswordInfo}
				setValue={setMatchPassword}
				placeholder={"비밀번호를 다시 한 번 입력해주세요"}
			/>
			<InputForm textInfo={usernameInfo} setValue={setUsername} placeholder={"이름을 입력해주세요 ex)홍길동"} />
			<InputForm
				textInfo={nicknameInfo}
				setValue={setNickname}
				placeholder={"닉네임은 최소 3자 이상 입력해주세요"}
			/>
			<InputForm
				textInfo={phoneNumberInfo}
				setValue={setPhoneNumber}
				placeholder={"'-'는 제외하고 숫자만 입력해주세요"}
			/>
		</section>
	);
};

export default TextForm;
