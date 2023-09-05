import React from "react";
import * as S from "../components/mypageForm/mypageEidtForm/MypageEditStyle";
import MypageEditForm from "../components/mypageForm/mypageEidtForm/ProfileEditForm";

const MyPageEdit: React.FC = () => {
    return (
        <S.LayoutBox>
            <S.LayoutInline>
                <MypageEditForm />
            </S.LayoutInline>
        </S.LayoutBox>
    );
};

export default MyPageEdit;
