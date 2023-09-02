import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as S from "./style";
import { congratulatory } from "../../../asstes/asstes";
import Realistic from "./realistic/Realistic";

const CongratulatoryForm = () => {
    const navigate = useNavigate();
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setRenderCount((prevRenderCount) => prevRenderCount + 1);
        }, 3000); // 3초마다 실행

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <S.MainContentWrapper>
            <Realistic key={renderCount} />
            <S.Img src={congratulatory} alt="congratulatory" />
            <S.SpanBox>
                <S.Span fontSize={2.2} fontWeight="bold">소분소분 회원가입이 완료되었습니다!</S.Span>
                <S.SpanContentBox>
                    <S.Span fontSize={1} fontWeight="400" color="464646">안녕하세요, 회원가입을 진심으로 축하드려요!</S.Span>
                    <S.Span fontSize={1} fontWeight="400" color="464646">이제 소분소분의 모든 서비스를 이용하실 수 있습니다.</S.Span>
                </S.SpanContentBox>
            </S.SpanBox>
            <S.Button onClick={() => navigate("/signin")} id="stopButton">로그인하기</S.Button>
        </S.MainContentWrapper>
    );
}

export default CongratulatoryForm;