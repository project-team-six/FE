import React, { ChangeEvent, useRef, useState } from "react";
import * as S from "./MypageEditStyle";
import { pencil, profileImg } from "../../../asstes/asstes";
import { deleteToken } from "../../../utils/deleteToken";
import { putMyPageEditImage } from "../../../api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/config/configStore";
import { setDecodeToken } from "../../../redux/modules/user";
import { pushNotification } from "../../../utils/notification";
import { useNavigate } from "react-router";

const ProfileImgEditForm = () => {
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const imgRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const userId: number = useSelector((state: RootState) => {
        return state.tokenSlice.decodeToken.userId;
    });

    const dispatch = useDispatch();

    const onImgUpdateHandler = () => {
        imgRef.current?.click();
    };

    // 클릭해서 이미지 업로더 만들기
    const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
            let formData = new FormData();
            formData.append("file", files[0]);
        }
    };

    const handleImageUpload = (e:any) => {
			e.preventDefault()
        if (selectedFile) {
            let formData = new FormData();
            formData.append("file", selectedFile);

            putMyPageEditImage(userId, formData)
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
                    pushNotification("이미지업로드 실패", "error");
                });
        } else {
            pushNotification("이미지를 선택해주세요", "error");
        }
    };

    return (
        <S.ProfileImg>
            <h1>회원정보 수정</h1>
            <form>
                <div onClick={onImgUpdateHandler}>
								<S.Avatar
                    name="file"
                    type="file"
                    onChange={onChangeHandler}
                    accept="image/jpg, image/png, image/jpeg"
                    ref={imgRef}
                />
                    <span>파일 업로드</span>
                </div>
                <div className="image-container">
                    {selectedFile ? (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="업로드된 이미지"
                        />
                    ) : (
                        <span>
                            <img src={profileImg} alt="기본 이미지" />
                        </span>
                    )}
                    <button onClick={handleImageUpload}>
                        <img src={pencil} alt="편집" />
                    </button>
                </div>
                {/* <input
          type="file"
          id="file-input"
          style={{ display: 'none' }}
          onChange={onChangeHandler}
          accept="image/jpg, image/png, image/jpeg"
        /> */}

                <S.ResetBtn
                    type="button"
                    onClick={() => setSelectedFile(undefined)}
                >
                    프로필 초기화
                </S.ResetBtn>

                {/* <button onClick={onChangeHandler}><img src={pencil} alt="편집"/></button>
						<S.ResetBtn
							type='button'
							onClick={() => {
								setSelectedFile(undefined);
							}}>
							프로필 초기화
						</S.ResetBtn> */}
            </form>
        </S.ProfileImg>
    );
};

export default ProfileImgEditForm;
