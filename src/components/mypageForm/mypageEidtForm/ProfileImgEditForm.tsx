import React, { ChangeEvent, useRef, useState } from "react";
import * as S from "./MypageEditStyle";
import { pencil, profileImg } from "../../../asstes/asstes";
import { deleteToken } from "../../../utils/deleteToken";
import { putMyPageEditImage } from "../../../api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/config/configStore";
import { setDecodeToken } from "../../../redux/modules/user";
import { pushNotification } from "../../../utils/notification";



const ProfileImgEditForm:React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const imgRef = useRef<HTMLInputElement | null>(null);

    const userId: number = useSelector((state: RootState) => {
        return state.tokenSlice.decodeToken.userId;
    });
    const profileImageUrl: string = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.profileImageUrl;
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

    // const handleImageUpload = (e: any) => {
    //     e.preventDefault();
    //     if (selectedFile) {
    //         let formData = new FormData();
    //         formData.append("file", selectedFile);

    //         putMyPageEditImage(userId, formData)
    //             .then((response) => {
    //                 const token = response.headers.authorization;
    //                 if (token) {
    //                     deleteToken("accessToken"); // 기존 token 삭제
    //                     document.cookie = `accessToken=${token.trim()}; path=/;`; // access token 갱신
    //                     dispatch(setDecodeToken(token)); // redux 업데이트
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 pushNotification("이미지업로드 실패", "error");
    //             });
    //     } else {
    //         pushNotification("이미지를 선택해주세요", "error");
    //     }
    // };

    return (
        <S.ProfileImg>
            <h1>회원정보 수정</h1>
            <form>
                <S.ImgBox>
                    {selectedFile ? (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="업로드된 이미지"
                        />
                    ) : (
                        <span>
                            <img src={profileImageUrl} alt="현재 이미지" />
                        </span>
                    )}
                    <S.Avatar onClick={onImgUpdateHandler}>
                        <input
                            name="file"
                            type="file"
                            onChange={onChangeHandler}
                            accept="image/jpg, image/png, image/jpeg"
                            ref={imgRef}
                        />
                    </S.Avatar>
                    <S.EditBtn >
                        <img src={pencil} alt="편집 아이콘" />
                    </S.EditBtn>
                </S.ImgBox>
                <S.ResetBtn type="button" onClick={() => setSelectedFile(undefined)}>
                    프로필 초기화
                </S.ResetBtn>
            </form>
        </S.ProfileImg>
    );
};

export default ProfileImgEditForm;
