import * as S from "./style";
import { precautionsIcon, oneIcon, twoIcon, threeIcon, fourIcon, fiveIcon } from "../../../asstes/asstes";

const FeedModal = ({modalState, setModalState}: {modalState: boolean, setModalState: (modalState: boolean) => void}) => {
    return (
        <div>
            {modalState && (
                <S.ModalLayout>
                    <S.PrecautionsLayout>
                        <S.PrecautionsDiv>
                            <S.Span fontSize={20} fontWeight="700">아래 주의 사항을 확인해주세요! <S.PrecautionsIcon src={precautionsIcon} alt="precautionsIcon"/></S.Span>
                            <S.Ul>
                                <S.Li>
                                    <S.Icon src={oneIcon} alt="one" style={{width:"8px"}}/>
                                    <div>
                                        <S.Span fontSize={16} fontWeight="700">이쁜 말로 소통해주세요.</S.Span>
                                        <S.Line />
                                        <S.Span fontSize={13} fontWeight="400">인신공격, 혐오 표현, 비방 등 부적절한 내용은 피해 주세요.</S.Span>
                                    </div>
                                </S.Li>
                                <S.Li>
                                    <S.Icon src={twoIcon} alt="two"/>
                                    <div>
                                        <S.Span fontSize={16} fontWeight="700">소분 물품 정보를 상세하게 입력해주세요.</S.Span>
                                        <S.Line />
                                        <S.Span fontSize={13} fontWeight="400">구매 영수증이 있다면 첨부해주세요.</S.Span>
                                    </div>
                                </S.Li>
                                <S.Li>
                                    <S.Icon src={threeIcon} alt="three"/>
                                    <div>
                                        <S.Span fontSize={16} fontWeight="700">잘못된 상품 정보를 입력하지 말아주세요.</S.Span>
                                        <S.Line />
                                        <S.Span fontSize={13} fontWeight="400">잘못된 정보는 사용자들에게 혼돈을 줄 수 있어 신고의 대상이 될 수도 있어요.</S.Span>
                                    </div>
                                </S.Li>
                                <S.Li>
                                    <S.Icon src={fourIcon} alt="four"/>
                                    <div>
                                        <S.Span fontSize={16} fontWeight="700">스팸 및 광고 게시 금지예요.</S.Span>
                                        <S.Line />
                                        <S.Span fontSize={13} fontWeight="400">상업적인 목적으로 게시글을 남기거나 스팸 및 광고성 내용을 게시하는 것은 허용되지 않아 무통보 삭제될 수 있어요.</S.Span>
                                    </div>
                                </S.Li>
                                <S.Li>
                                    <S.Icon src={fiveIcon} alt="five"/>
                                    <div>
                                        <S.Span fontSize={16} fontWeight="700">개인 정보를 지켜주세요.</S.Span>
                                        <S.Line />
                                        <S.Span fontSize={13} fontWeight="400">다른 사용자의 개인정보를 무단으로 공개하지 마세요. 개인정보보호 및 사생활을 존중해 주세요.</S.Span>
                                    </div>
                                </S.Li>
                            </S.Ul>
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