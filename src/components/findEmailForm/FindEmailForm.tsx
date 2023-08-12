import { useState } from "react";
import SearchEmailForm from "./searchEmailForm/SearchEmailForm";
import { useNavigate } from "react-router";
import mainlogo from "../../asstes/mainlogo.png";
import findEmailLogo from "../../asstes/findEmailLogo.png";
import * as S from "./style";
import * as Sf from "../common/commonFormStyles";

const FindEmailForm = () => {
    const [result, setResult] = useState<string>(""); // 찾은 이메일 유무 저장

    const navigate = useNavigate();
    const foundEmail = (
        <S.ResultDiv>
            <img src={findEmailLogo} alt="이메일 찾기 로고"/>
            <S.ResultEmailDiv>
                <span>{result}</span>
            </S.ResultEmailDiv>
            <S.ResultSection>
                <S.ResultBtn color="#6F8A6B" borderColor="1px solid #6F8A6B" onClick={() => navigate("/findpassword")}>비밀번호 찾기</S.ResultBtn>
                <S.ResultBtn color="#FFFFFF" backgroundColor="#6F8A6B" onClick={() => navigate("/signin")}>로그인</S.ResultBtn>
            </S.ResultSection>
        </S.ResultDiv>
    );

    return (
        <Sf.MainContentWrapper>
            <Sf.LogoImg src={mainlogo}/>
            <span>이메일 찾기</span>
            {result ? foundEmail : <SearchEmailForm setResult={setResult}/>}
        </Sf.MainContentWrapper>
    )
}

export default FindEmailForm;