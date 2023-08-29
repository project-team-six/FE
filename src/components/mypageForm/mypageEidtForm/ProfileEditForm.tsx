import React, { ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { RootState } from "../../../redux/config/configStore";
import { putMyPageEdit, putMyPagePasswordEdit } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";
import Input from "../../../theme/Input";
import * as S from "./MypageEditStyle";
import { phoneIcon, userIcon } from "../../../asstes/asstes";
import { deleteToken } from "../../../utils/deleteToken";
import { setDecodeToken } from "../../../redux/modules/user";
import PasswordInput from "./PaswordInput";

const ProfileEditForm = () => {
	const location = useLocation();
	const userInfo = location.state ? location.state.userInfo : {};
	const [nickname, setNickname] = useState(userInfo.nickname || "");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber || "");

	const navigate = useNavigate();

	// 토큰값으로 유저 아이디 불러오기
	const userId: number = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.userId;
	});
	const auth: string = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.auth;
	});

	// 유효성 검사
	const isInfoValid = () => {
		return nickname && phoneNumber;
	};
	const isPasswordValid = () => {
		return password !== "" && confirmPassword !== "" && password === confirmPassword;
	};

	// Put 닉네임, 폰번호 수정
	const dispatch = useDispatch();
	const submitHandler = (e: any) => {
		e.preventDefault();
		if (isInfoValid()) {
			// API 호출로 닉네임, 폰번호 수정
			putMyPageEdit(userId, nickname, phoneNumber)
				.then((response) => {
					const token = response.headers.authorization;
					if (token) {
						deleteToken("accessToken"); // 기존 token 삭제
						document.cookie = `accessToken=${token.trim()}; path=/;`; // access token 갱신
						dispatch(setDecodeToken(token)); // redux 업데이트
					}
				})
				.catch((error) => {
					console.log(error);
					pushNotification("수정 실패. 닉네임, 전화번호를 다시 봐주세요", "error");
				});
		}
		if (isPasswordValid()) {
			putMyPagePasswordEdit(userId, password)
				.then((response) => {
					const token = response.headers.authorization;
					if (token) {
						deleteToken("accessToken"); // 기존 token 삭제
						document.cookie = `accessToken=${token.trim()}; path=/;`; // access token 갱신
						dispatch(setDecodeToken(token)); // redux 업데이트
					}
				})
				.catch((error) => {
					console.log(error);
					pushNotification("수정 실패. 비밀번호와 비밀번호 확인을 다시 봐주세요", "error");
				});
		}
	};

	return (
		<S.EditForm onSubmit={submitHandler}>
			{/* 닉네임 수정 */}
			<Input
				label={"닉네임"}
				type='text'
				value={nickname}
				handleChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
				placeholder=''
				width={35}
				message={""}
				icon={userIcon}
			/>
			{/* 전화번호 수정 */}
			<Input
				label={"전화번호"}
				type='tel'
				value={phoneNumber}
				handleChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
				placeholder='01012345678'
				width={35}
				message={""}
				icon={phoneIcon}
			/>
			{/* 비밀번호 수정 */}
			{auth === "USER" && (
				<PasswordInput
					password={password}
					setPassword={setPassword}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassword}
				/>
			)}
			<S.Btn>
				<S.SubmitBtn type='submit' onClick={() => navigate(-1)}>
					수정 완료
				</S.SubmitBtn>
				<S.BackBtn type='button' onClick={() => navigate(-1)}>
					뒤로 가기
				</S.BackBtn>
			</S.Btn>
		</S.EditForm>
	);
};

export default ProfileEditForm;
