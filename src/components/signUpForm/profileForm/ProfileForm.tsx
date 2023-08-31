import React, { ChangeEvent, useState } from 'react';
import * as S from "./style";
import { userProfile, signUpCamera } from "../../../asstes/asstes";

const ProfileForm = ({setProfile}: {setProfile: React.Dispatch<React.SetStateAction<File | undefined>>}) => {
    const [imagePreview, setImagePreview] = useState<string>(); // 썸네일
	const changeProfile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files){
            const file = e.target.files[0];
            setProfile(file);

            // 썸네일 저장
			const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
		else setProfile(undefined);
	};

    const clickDeleteProfileBtn = () => {
        setProfile(undefined);
        setImagePreview("");
    };

    return (
        <S.ImgForm>
            {imagePreview?
            <S.Img src={imagePreview} alt="profile"/> : 
            <S.Img src={userProfile} alt="profileImageDefault"/>
            }
            <S.ImgFormButton>
                <S.CustomImgInput onChange={changeProfile} />
                <S.ImgButton as="label" htmlFor="profile"><img src={signUpCamera} alt="edit"/></S.ImgButton>
                <S.ResetButton onClick={clickDeleteProfileBtn}>초기화하기</S.ResetButton>
                <S.Line />
            </S.ImgFormButton>
        </S.ImgForm>
    )
}

export default ProfileForm;