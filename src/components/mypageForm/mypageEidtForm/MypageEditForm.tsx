import { LayoutBox } from "../../common/GlobalStyle";
import ProfileImgEditForm from "./ProfileImgEditForm";
import ProfileEditForm from "./ProfileEditForm";
import * as S from './MypageEditStyle'

const MypageEditForm = () => {
    
    return (
        <S.LayoutBox>
            <S.LayoutInline>
                <ProfileImgEditForm />
                <ProfileEditForm/>
            </S.LayoutInline>
        </S.LayoutBox>
    );
};

export default MypageEditForm;
