import * as S from "./style";
import { precautions1, precautions2, precautions3, precautions4, precautions5 } from "../../../asstes/asstes";

const FeedModal = ({modalState, setModalState}: {modalState: boolean, setModalState: (modalState: boolean) => void}) => {
    const precautions = [
        {icon: precautions1, title: "이쁜 말로 소통해주세요.", content: "인신공격, 혐오 표현, 비방 등 부적절한 내용은 피해 주세요."},
        {icon: precautions2, title: "소분 물품 정보를 상세하게 입력해주세요." , content: "구매 영수증이 있다면 첨부해주세요."},
        {icon: precautions3, title: "잘못된 상품 정보를 입력하지 말아주세요.", content: "잘못된 정보는 사용자들에게 혼돈을 줄 수 있어요."},
        {icon: precautions4, title: "스팸 및 광고 게시를 하지 말아주세요.", content: "상업적이나 광고성 내용을 게시하면 무통보 삭제될 수 있어요."},
        {icon: precautions5, title: "개인 정보를 지켜주세요.", content: "다른 사용자들의 개인 정보를 무단으로 공개하지 마세요."}
    ]; 
    
    return (
        <div>
            {modalState && (
                <S.ModalLayout>
                    <S.PrecautionsLayout>
                        <S.PrecautionsDiv>
                            <S.TitleDiv>
                                <S.Span fontSize={22} fontWeight="700">아래 주의 사항을 확인해주세요!</S.Span>
                            </S.TitleDiv>
                            <ul>
                                {precautions.map((p, index) => {
                                    return (
                                        <S.Li key={index}>
                                            <S.Icon src={p.icon} alt={index.toString()}/>
                                            <div>
                                                <S.Span fontSize={16} fontWeight="700">{p.title}</S.Span>
                                                <br />
                                                <S.Span fontSize={12} fontWeight="400">{p.content}</S.Span>
                                            </div>
                                        </S.Li>
                                    )
                                })}
                            </ul>
                        </S.PrecautionsDiv>
                        <S.ButtonDiv>
                            <S.Button onClick={() => {setModalState(!modalState)}}>확인</S.Button>
                        </S.ButtonDiv>
                    </S.PrecautionsLayout>
                </S.ModalLayout>
            )
            }
        </div>
    )
}

export default FeedModal;