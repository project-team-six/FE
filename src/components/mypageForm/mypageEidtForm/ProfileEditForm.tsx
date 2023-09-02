import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { RootState } from "../../../redux/config/configStore";
import { putMyPageEdit, putMyPageEditImage, putMyPagePasswordEdit } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";
import Input from "../../../theme/Input";
import * as S from "./MypageEditStyle";
import PasswordInput from "./PaswordInput";
import ProfileImgEditForm from "./ProfileImgEditForm";
import { updateToken } from "../../../utils/updateToken";
import { useQueryClient } from "react-query";

const ProfileEditForm = () => {
	const location = useLocation();
	const userInfo = location.state ? location.state.userInfo : {};
	const [nickname, setNickname] = useState(userInfo.nickname || "");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber || "");
	const [selectedFile, setSelectedFile] = useState<File | undefined>();
	const [nicknameError, setNicknameError] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState("");
	const [_, setPasswordError] = useState("");
	const [isInfoFormValid, setIsInfoFormValid] = useState(false);
	const [isPWFormValid, setIsPWFormValid] = useState(false);
	const navigate = useNavigate();

	// 토큰값으로 유저 아이디 불러오기
	const userId = useSelector((state: RootState) => state.tokenSlice.decodeToken.userId);
	const auth: string = useSelector((state: RootState) => state.tokenSlice.decodeToken.auth);
	console.log(auth)
	// 유효성 검사
	const isInfoValid = React.useCallback(() => {
		const nicknameRegex = /^.{1,8}$/;
		const phoneNumberRegex = /^010\d{8}$/;
		if (!nicknameRegex.test(nickname)) {
			setNicknameError("닉네임은 8자 이하이어야 합니다.");
			return false;
		}
		
		if (!phoneNumberRegex.test(phoneNumber)) {
			setPhoneNumberError("전화번호는 '010'으로 시작하여 총 11자리여야 합니다.");
			return false;
		}
		
		return true;
		
	},[nickname, phoneNumber]);

		const isPasswordValid = React.useCallback(() => {
			const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
		
			if (!passwordRegex.test(password)) {
				return false;
			}
		
			if (password !== confirmPassword) {
				return false;
			}
		
			return true;
		},[password, confirmPassword]);

	// Put
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const submitHandler = (e: any) => {
		e.preventDefault();
		if (isInfoValid()) {
			// API 호출로 닉네임, 폰번호 수정
			putMyPageEdit(userId, nickname, phoneNumber)
				.then((response) => {
					updateToken(response, dispatch);
					queryClient.invalidateQueries(["mypage", userId]);
				})
				.catch((error) => {
					pushNotification("수정 실패. 닉네임, 전화번호를 다시 봐주세요", "error");
				});
		}
		if (isPasswordValid()) {
			try {
				putMyPagePasswordEdit(userId, password)
				.then((response) => {
					updateToken(response, dispatch);
				})
				.catch((error) => {
					pushNotification("수정 실패. 비밀번호와 비밀번호 확인을 다시 봐주세요", "error");
				});
			} catch (error) {
				pushNotification("비밀번호 수정실패", "error");
			}
			
		}
		if (selectedFile) {
			let formData = new FormData();
			formData.append("file", selectedFile);
			putMyPageEditImage(userId, formData)
				.then((response) => {
					updateToken(response, dispatch);
				})
				.catch((error) => {
					pushNotification("이미지업로드 실패", "error");
				});
		}
		if(!isInfoValid() || !isPasswordValid()){
			return;
		}
	};

	useEffect(() => {
		// 모든 필드의 유효성 검사가 통과하면 isFormValid를 true로 설정
		setIsInfoFormValid(isInfoValid());
	}, [nickname, phoneNumber, isInfoValid]);  // 의존성 배열에 각 필드의 상태 값을 넣어줍니다.
	
	useEffect(()=>{
		setIsPWFormValid(isPasswordValid());
	},[password, confirmPassword, isPasswordValid]);
	const clickHandler = () => {
		console.log('password', password)
		console.log('isInfoFormValid', isInfoFormValid)
		console.log('isPasswordValid', isPWFormValid)
		if(!isInfoFormValid){
			pushNotification('항목을 다시 살펴주시길 바랍니다', 'warning');
			return
		}
		else if((password || confirmPassword)&&
			!isPWFormValid){
			pushNotification('비밀번호와 비밀번호 확인을 다시 봐주세요', 'warning');
			return
		}
		navigate(-1)
		
	}
	
	return (
		<S.EditForm onSubmit={submitHandler}>
			<ProfileImgEditForm selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
			{/* 닉네임 수정 */}
			<Input
				label={"닉네임"}
				type='text'
				value={nickname}
				handleChange={(e: ChangeEvent<HTMLInputElement>) => {setNickname(e.target.value); setNicknameError("")}}
				placeholder=''
				width={35}
				message={nicknameError}
			/>
			{/* 전화번호 수정 */}
			<Input
				label={"전화번호"}
				type='tel'
				value={phoneNumber}
				handleChange={(e: ChangeEvent<HTMLInputElement>) => {setPhoneNumber(e.target.value); setPhoneNumberError("")}}
				placeholder='01012345678'
				width={35}
				message={phoneNumberError}
			/>
			{/* 비밀번호 수정 */}
			{auth !== "KAKAO" && (
				<PasswordInput
					password={password}
					setPassword={(value:string)=>{setPassword(value); setPasswordError("")}}
					confirmPassword={confirmPassword}
					setConfirmPassword={(value:string)=>{setConfirmPassword(value); setPasswordError("")}}
				/>
			)}
			<S.Btn>
				<S.SubmitBtn type='submit' onClick={clickHandler}>
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
