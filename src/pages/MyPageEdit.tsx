import React from "react";
import * as S from "../components/mypageForm/mypageEidtForm/MypageEditStyle";
import ProfileImgEditForm from "../components/mypageForm/mypageEidtForm/ProfileImgEditForm";
import ProfileEditForm from "../components/mypageForm/mypageEidtForm/ProfileEditForm";

const MyPageEdit: React.FC = () => {
    return (
        <S.LayoutBox>
            <S.LayoutInline>
                <ProfileImgEditForm />
                <ProfileEditForm />
            </S.LayoutInline>
        </S.LayoutBox>
    );
};

export default MyPageEdit;
