import { useSelector } from "react-redux";
import { LocationGuide, LocationGuideCancel } from "../../../asstes/asstes";
import * as S from "./style";
import { RootState } from "../../../redux/config/configStore";

const LocationSettingsGuideModal = ({modalState, setModalState}:{modalState: boolean, setModalState: (value: boolean)=>void}) => {
    const modalHandle = () => {
        setModalState(false);
    };
    
    // 토큰 디코드한 값 가져오기
	const tokenInfo = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken;
	});
    const nickname = tokenInfo.nickname; // 닉네임
    const location = tokenInfo.location; // 지역

    return (
        <div>
            {modalState && (
            <S.GuideLayout>
                <S.GuideSection>
                    <S.CancelButton onClick={modalHandle}><img src={LocationGuideCancel} alt="LocationGuideCancel"/></S.CancelButton>
                    <S.SpanBox>
                        <S.NicknameBox>
                        <S.Span fontSize="27px" fontWeight="bold" color="black">반갑습니다 {<S.Span fontSize="27px" fontWeight="bold" color="4FBE9F">{nickname}님!</S.Span>}</S.Span>
                        </S.NicknameBox>
                        <S.Span fontSize="15px" fontWeight="400" color="7C7C7C">현재 지역설정은 {<S.Span fontSize="15px" fontWeight="bold" color="484848">{location}</S.Span>}으로 설정되어 있습니다.</S.Span>
                        <S.Span fontSize="15px" fontWeight="400" color="7C7C7C">다른 지역 소분목록을 보고싶으시면 아래 버튼을 클릭해주세요.</S.Span>
                    </S.SpanBox>
                    <S.ImageContainer>
                        <S.Img src={LocationGuide} alt="LocationGuide"/>
                        <S.GradientOverlay />
                    </S.ImageContainer>
                    <S.ButtonBox>
                        <S.Button onClick={modalHandle} $backgroundColor="EEEEEE" color="6C6C6C">취소</S.Button>
                        <S.Button $backgroundColor="4FBE9F" color="FFFFFF">지역설정</S.Button>
                    </S.ButtonBox>
                </S.GuideSection>
            </S.GuideLayout>)}        
        </div>
    )
}

export default LocationSettingsGuideModal;