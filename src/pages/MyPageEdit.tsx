import React, { useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { putMyPageEdit, putMyPageEditImage } from "../api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";

const MyPageEdit: React.FC = () => {
	const [nickName, setNickName] = useState("");
	const [password, setPassword] = useState("");
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

	// Put 닉네임, 비밀번호, 폰번호 수정
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// 타입 가져오기
		try {
			// API 호출로 닉네임, 비밀번호, 폰번호 수정
			await putMyPageEdit(userId, nickName, password, phoneNumber);

			// 수정된 이미지가 있다면 이미지 업로드 API 호출
			if (selectedFile) {
				let formData = new FormData();
				formData.append("file", selectedFile);
				try {
					await putMyPageEditImage(userId, formData);
					alert("이미지업로드 성공");
				} catch (error) {
					console.log("이미지업로드 실패", error);
				}
			}
			alert("수정되었습니다");
			navigate(-1);
		} catch (error) {
			console.log("수정 실패", error);
		}
	};

	//ToDo 유효성 검사 로직 추가할 것
	// 유효성 검사 로직
	// 비밀번호
	// const validatePassword = (password: string) => {
	//   const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
	//   return regex.test(password);
	// };
	// 핸드폰번호
	// const validatePhoneNumber = (PhoneNumber: string) => {
	//   const regex = /^010\d{8}$/;
	//   return regex.test(PhoneNumber);
	// };

	return (
		<section>
			<form onSubmit={submitHandler}>
				{/* 닉네임 수정 */}
				<div>
					<h4>유저 닉네임</h4>
					<input type='text' value={nickName} onChange={(e) => setNickName(e.target.value)} />
				</div>
				{/* 비밀번호 수정 */}
				<div>
					<h4>비밀번호</h4>
					<input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				{/* 전화번호 수정 */}
				<div>
					<h4>전화번호</h4>
					<input type='tel' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
				</div>
				<div>
					<h4>프로필 이미지</h4>
					<Avatar
						name='file'
						type='file'
						onChange={onChangeHandler}
						accept='image/jpg, image/png, image/jpeg'
						ref={imgRef}
					/>
					{selectedFile ? (
						<img src={URL.createObjectURL(selectedFile)} alt='업로드된 이미지' />
					) : (
						<span>이미지를 선택해주세요.</span>
					)}
					<button onClick={onImgUpdateHandler}>이미지 선택</button>
					<button
						type='button'
						onClick={() => {
							setSelectedFile(undefined);
						}}>
						초기화
					</button>
				</div>
				<button type='submit' onClick={() => {}}>
					수정 완료
				</button>
				<button
					type='button'
					onClick={() => {
						alert("수정 취소");
						navigate(-1);
					}}>
					취소
				</button>
			</form>
		</section>
	);
};

export default MyPageEdit;

const Avatar = styled.input`
	display: none;
`;
