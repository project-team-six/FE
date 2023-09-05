import React, { ChangeEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/config/configStore";
import * as S from "./style";
import { pencil, profileImg } from "../../../../asstes/asstes";

interface ProfileImgEditFormProps{
    selectedFile: File | undefined,
    setSelectedFile : React.Dispatch<React.SetStateAction<File | undefined>>,
}

const ProfileImgEdit:React.FC<ProfileImgEditFormProps> = ({selectedFile, setSelectedFile}) => {
    const imgRef = useRef<HTMLInputElement | null>(null);

    const profileImageUrl: string = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.profileImageUrl;
	});

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

    return (
        <S.ProfileImg>
            <h1>회원정보 수정</h1>
            <div>
                <S.ImgBox>
                    {selectedFile ? (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="업로드된 이미지"
                        />
                    ) : (
                        <span>
                            <img src={profileImageUrl === "nonImage" ? profileImg : profileImageUrl} alt="현재 이미지" />
                        </span>
                    )}
                    <S.Avatar >
                        <input
                            name="file"
                            type="file"
                            onChange={onChangeHandler}
                            accept="image/jpg, image/png, image/jpeg"
                            ref={imgRef}
                        />
                    </S.Avatar>
                    <S.EditBtn onClick={onImgUpdateHandler}>
                        <img src={pencil} alt="편집 아이콘" />
                    </S.EditBtn>
                </S.ImgBox>
                <S.ResetBtn type="button" onClick={() => setSelectedFile(undefined)}>
                    프로필 초기화
                </S.ResetBtn>
            </div>
        </S.ProfileImg>
    );
};

export default ProfileImgEdit;