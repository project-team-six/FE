import React, { ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useQueryClient } from "react-query";
import { RootState } from "../../../redux/config/configStore";
import { putMyPageEdit, putMyPageEditImage, putMyPagePasswordEdit } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";
import ProfileImgEdits from "./profileImgEditForm/ProfileImgEdit";
import TextInputForm from "../../common/textInputForm/TextInputForm";
import * as S from "./style";
import { setDecodeToken } from "../../../redux/modules/user";
import { deleteToken } from "../../../utils/deleteToken";
import { saveToken } from "../../../utils/saveToken";

const ProfileEdit = () => {
	const location = useLocation();
	const userInfo = location.state ? location.state.userInfo : {};

	// 토큰값으로 유저 아이디 불러오기
	const userId = useSelector((state: RootState) => state.tokenSlice.decodeToken.userId);
	const auth: string = useSelector((state: RootState) => state.tokenSlice.decodeToken.auth);

	const navigate = useNavigate();

	// 닉네임
	const [nickname, setNickname] = useState(userInfo.nickname || "");
	const [nicknameError, setNicknameError] = useState("");
	const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setNickname(value);

		const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,8}$/;
		let msg = "";
		if (!nicknameRegex.test(value)) msg = "*닉네임을 입력해주세요. (3~8자 사이)";
		setNicknameError(msg);
	};

	// 핸드폰 번호
	const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber || "");
	const [phoneNumberError, setPhoneNumberError] = useState("");
	const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPhoneNumber(value);

		const phoneNumberRegex = /^(\+?82|0)1[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
		let msg = "";
		if (!phoneNumberRegex.test(value)) msg = "*사용 할 수 없는 핸드폰 번호 입니다.";
		setPhoneNumberError(msg);
	};

	// 비밀번호
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);

		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
		let msg = "";
		if (!passwordRegex.test(value)) msg = "*특수문자 포함 8자 이상 25자 이하 비밀번호를 입력해주세요.";
		setPasswordError(msg);
	};

	// 비밀번호 확인
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setConfirmPassword(value);

		let msg = "";
		if (password !== value) msg = "*비밀번호가 일치하지 않습니다.";
		setConfirmPasswordError(msg);
	};

	// 프로필 이미지
	const [selectedFile, setSelectedFile] = useState<File | undefined>();

	// 유효성 검사
	const isInfoValid = React.useCallback(() => {
		if (nicknameError.trim() === "" && phoneNumberError.trim() === "") return true;
		return false;
	},[nickname, phoneNumber]);

	const isPasswordValid = React.useCallback(() => {
		if (password.trim() !== "" && confirmPassword.trim() !== "" && passwordError.trim() === "" && confirmPasswordError.trim() === "") return true;
		return false;
	},[password, confirmPassword]);

	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const submitHandler = (e: any) => {
		e.preventDefault(); // 새로고침 방지

		let isError = false; // API 통신 성공 유무 저장
		if (isInfoValid()) {
			putMyPageEdit(userId, nickname, phoneNumber)
				.then((response) => {
					const token = response.headers.authorization;
					deleteToken("accessToken"); // 기존 token 삭제
        			saveToken("accessToken", token); // 세션에 accessToken 저장
					dispatch(setDecodeToken(token)); // 리덕스에 토큰 정보 저장
					queryClient.invalidateQueries(["mypage", userId]);
				})
				.catch((error) => {
					isError = true;
					pushNotification("닉네임, 핸드폰 번호 변경에 실패했어요.", "error");
				});
		} else if (nickname.trim() !== "" || phoneNumber.trim() !== "") {
			pushNotification("닉네임, 전화번호를 다시 봐주세요.", "error");
			return;
		}

		// 비밀번호 변경
		if (isPasswordValid()) {
			putMyPagePasswordEdit(userId, password)
				.then((response) => {
					const token = response.headers.authorization;
					deleteToken("accessToken"); // 기존 token 삭제
        			saveToken("accessToken", token); // 세션에 accessToken 저장
					dispatch(setDecodeToken(token)); // 리덕스에 토큰 정보 저장
				})
				.catch((error) => {
					isError = true;
					pushNotification("비밀번호 변경에 살패했어요.", "error");
				});
		} else if (password.trim() !== "") {
			pushNotification("비밀번호와 비밀번호 확인을 다시 봐주세요.", "error");
			return;
		}

		// 프로필 이미지 수정
		if (selectedFile) {
			const formData = new FormData();
			formData.append("file", selectedFile);
			putMyPageEditImage(userId, formData)
				.then((response) => {
					const token = response.headers.authorization;
					deleteToken("accessToken"); // 기존 token 삭제
        			saveToken("accessToken", token); // 세션에 accessToken 저장
					dispatch(setDecodeToken(token)); // 리덕스에 토큰 정보 저장
				})
				.catch((error) => {
					isError = true;
					pushNotification("프로필 이미지 변경에 실패했어요.", "error");
				});
		}
		if (!isError) navigate(-1);
	};

	return (
		<S.LayoutBox>
            <S.LayoutInline>
				<S.EditForm onSubmit={submitHandler}>
				<ProfileImgEdits selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
				{/* 닉네임 수정 */}
				<TextInputForm label="닉네임" type="text" value={nickname} handleChange={handleChangeNickname} msg={nicknameError} placeholder=""/>
				{/* 핸드폰 번호 수정 */}
				<TextInputForm label="핸드폰 번호" type="tel" value={phoneNumber} handleChange={handleChangePhoneNumber} msg={phoneNumberError} placeholder=""/>
				{/* 비밀번호 수정 */}
				{auth !== "KAKAO" && (
				<div>
					<TextInputForm label="비밀번호" type="password" value={password} handleChange={handleChangePassword} msg={passwordError} placeholder="새로운 비밀번호를 입력해주세요."/>
					<TextInputForm label="비밀번호 확인" type="password" value={confirmPassword} handleChange={handleChangeConfirmPassword} msg={confirmPasswordError} placeholder="비밀번호를 다시 한 번 입력해주세요."/>
				</div>
				)}
				<S.BtnBox>
					<S.SubmitButton type="submit">
						수정 완료
					</S.SubmitButton>
					<S.BackButton type="button" onClick={() => navigate(-1)}>
						뒤로 가기
					</S.BackButton>
				</S.BtnBox>
			</S.EditForm>
            </S.LayoutInline>
        </S.LayoutBox>
	);
};

export default ProfileEdit;