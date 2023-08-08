import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { findID, findPassword } from "../api/userApi";
import { findIdType, findPwType } from "../types/findUser";
import { pushNotification } from "../utils/notification";

const FindUserInfo = () => {
	// 이름
	const [username, setUsername] = useState<string>("");
	const changeUsername = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	// 전화번호
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const changePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	};

	// 이메일
	const [email, setEmail] = useState<string>("");
	const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const navigate = useNavigate();
	const findIdMutation = useMutation(findID, {
		onSuccess: (res) => {
			pushNotification(`${res.data.data.email}`, "success");
		},
		onError: (error) => {
			if (error) {
				pushNotification(`${error}`, "error");
			} else {
				pushNotification("에러가 발생했습니다. 나중에 다시 시도해주세요.", "error");
			}
		},
	});

	const clickFindIdBtn = () => {
		const userInfo: findIdType = {
			username,
			phoneNumber,
		};
		findIdMutation.mutate(userInfo);
	};

	const findPwMutation = useMutation(findPassword, {
		onSuccess: () => {
			pushNotification("이메일을 확인해주세요", "success");
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

	return (
		<div>
			<section>
				<label>아이디</label>
				<input
					type='text'
					required
					value={username}
					onChange={changeUsername}
					placeholder='이름을 입력해주세요.'
				/>
				<input
					type='text'
					required
					value={phoneNumber}
					onChange={changePhoneNumber}
					placeholder='전화번호를 입력해주세요.'
				/>
				<button onClick={clickFindIdBtn}>아이디 찾기</button>
			</section>
			<section>
				<label>비밀번호</label>
				<input
					type='text'
					required
					value={username}
					onChange={changeUsername}
					placeholder='이름을 입력해주세요.'
				/>
				<input
					type='text'
					required
					value={phoneNumber}
					onChange={changePhoneNumber}
					placeholder='전화번호를 입력해주세요.'
				/>
				<input type='text' required value={email} onChange={changeEmail} placeholder='이메일을 입력해주세요.' />
				<button onClick={clickFindPwBtn}>비밀번호 찾기</button>
			</section>
		</div>
	);
};

export default FindUserInfo;
