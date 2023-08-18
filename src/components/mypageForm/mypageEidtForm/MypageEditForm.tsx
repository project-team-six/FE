import React, { ChangeEvent, useRef, useState } from "react";
import * as S from "./MypageEditStyle";
import { LayoutBox } from "../../common/GlobalStyle";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/config/configStore";
import { putMyPageEdit, putMyPageEditImage } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";

const MypageEditForm = () => {
	const [nickName, setNickName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [selectedFile, setSelectedFile] = useState<File | undefined>();
	const imgRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();

	// 토큰값으로 유저 아이디 불러오기
	const userId: number = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.userId;
	});

	// 클릭해서 이미지 업로더 만들기
	const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const onImgUpdateHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		imgRef.current?.click();
	};

	// 유효성 검사
	const isFormValid = () => {
		return nickName && password && confirmPassword && phoneNumber && password === confirmPassword;
	};

	// Put 닉네임, 비밀번호, 폰번호 수정
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isFormValid()) {
			try {
				// API 호출로 닉네임, 비밀번호, 폰번호 수정
				await putMyPageEdit(userId, nickName, password, phoneNumber);

				// 수정된 이미지가 있다면 이미지 업로드 API 호출
				if (selectedFile) {
					let formData = new FormData();
					formData.append("file", selectedFile);
					try {
						await putMyPageEditImage(userId, formData);
						pushNotification("이미지업로드 성공", "success");
					} catch (error) {
						pushNotification("이미지업로드 실패", "error");
					}
				}
				pushNotification("수정되었습니다", "success");
				navigate(-1);
			} catch (error) {
				pushNotification("수정 실패. 항목을 다시 봐주세요", "error");
			}
		}
	};

	const passwordMismatch = () => {
		if (password !== confirmPassword) {
			pushNotification("비밀번호와 일치하지 않습니다.", "error");
		}
	};

	return (
		<LayoutBox>
			<S.EditForm onSubmit={submitHandler}>
				<S.ProfileImg>
					<h1>프로필 이미지</h1>
					<S.Avatar
						name='file'
						type='file'
						onChange={onChangeHandler}
						accept='image/jpg, image/png, image/jpeg'
						ref={imgRef}
					/>
					{selectedFile ? (
						<img src={URL.createObjectURL(selectedFile)} alt='업로드된 이미지' />
					) : (
						<span></span>
					)}
					<div>
						<button onClick={onImgUpdateHandler}>업로드</button>
						<button
							type='button'
							onClick={() => {
								setSelectedFile(undefined);
							}}>
							초기화
						</button>
					</div>
				</S.ProfileImg>
				{/* 닉네임 수정 */}
				<S.Input>
					<h4>닉네임</h4>
					<input
						type='text'
						value={nickName}
						onChange={(e) => setNickName(e.target.value)}
						required
						placeholder='기존의 닉네임이 저장되어있지 않으므로 반드시 적어주세요.'
						minLength={5}
					/>
				</S.Input>
				{/* 비밀번호 수정 */}
				<S.Input>
					<h4>비밀번호</h4>
					<input
						type='password'
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
						placeholder='기존의 비밀번호가 저장되어있지 않으므로 반드시 적어주세요.'
						minLength={5}
					/>
				</S.Input>
				<S.Input>
					<h4>비밀번호 확인</h4>
					<input
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						onBlur={passwordMismatch}
						minLength={5}
					/>
				</S.Input>
				{/* 전화번호 수정 */}
				<S.Input>
					<h4>전화번호</h4>
					<input
						type='tel'
						value={phoneNumber}
						required
						onChange={(e) => setPhoneNumber(e.target.value)}
						placeholder='01012345678'
						minLength={11}
					/>
				</S.Input>
				<S.Btn>
					<button type='submit'>수정 완료</button>
					<button
						type='button'
						onClick={() => {
							pushNotification("수정 취소합니다", "success");
							navigate(-1);
						}}>
						취소
					</button>
				</S.Btn>
			</S.EditForm>
		</LayoutBox>
	);
};

export default MypageEditForm;
