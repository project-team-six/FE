import { useState } from "react";
import SearchEmailForm from "./searchEmailForm/SearchEmailForm";
import { useNavigate } from "react-router";
import mainlogo from "../../asstes/mainlogo.png";
import findEmailLogo from "../../asstes/findEmailLogo.png";
import * as S from "./style";

const FindEmailForm = () => {
    const [result, setResult] = useState<string>(""); // 찾은 이메일 유무 저장

    const navigate = useNavigate();
    const foundEmail = (
        <S.ResultDiv>
            <section>
                <img src={findEmailLogo} alt="이메일 찾기 로고"/>
            </section>
            <section>
                <S.ResultEmailDiv>
                    <span>{result}</span>
                </S.ResultEmailDiv>
            </section>
            <S.ResultSection>
                <S.ResultBtn color="#6F8A6B" borderColor="1px solid #6F8A6B" onClick={() => navigate("/findpassword")}>비밀번호 찾기</S.ResultBtn>
                <S.ResultBtn color="#FFFFFF" backgroundColor="#6F8A6B" onClick={() => navigate("/signin")}>로그인</S.ResultBtn>
            </S.ResultSection>
        </S.ResultDiv>);

    return (
        <S.MainContentWrapper>
            <section>
                <S.LogoImg src={mainlogo}/>
            </section>
            <section>
                <span>이메일 찾기</span>
            </section>
            <section>
                {result ? foundEmail : <SearchEmailForm setResult={setResult}/>}
            </section>
        </S.MainContentWrapper>
    )
}

export default FindEmailForm;