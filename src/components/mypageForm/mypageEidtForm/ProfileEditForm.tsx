import { ChangeEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { RootState } from "../../../redux/config/configStore";
import { putMyPageEdit, putMyPageEditImage, putMyPagePasswordEdit } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";
import Input from "../../../theme/Input";
import * as S from "./MypageEditStyle";
import { phoneIcon, userIcon } from "../../../asstes/asstes";
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
			putMyPagePasswordEdit(userId, password)
				.then((response) => {
					updateToken(response, dispatch);
				})
				.catch((error) => {
					pushNotification("수정 실패. 비밀번호와 비밀번호 확인을 다시 봐주세요", "error");
				});
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
	};

	return (
		<S.EditForm onSubmit={submitHandler}>
			<ProfileImgEditForm selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
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
