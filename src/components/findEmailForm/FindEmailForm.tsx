import { useState } from "react";
import SearchEmailForm from "./searchEmailForm/SearchEmailForm";
import { useNavigate } from "react-router";
import * as S from "./style";
import { EmailFindIcon } from "../../asstes/asstes";
import Announcement from "../common/announcement/Announcement";

const FindEmailForm = () => {
	const [result, setResult] = useState<string>(""); // 찾은 이메일 유무 저장

	const navigate = useNavigate();
	const foundEmail = (
		<S.ResultDiv>
			<S.ResultImg src={EmailFindIcon} alt='이메일 찾기 로고' />
			<S.SpanDiv>
				<S.Span color='black'>회원님의 이메일은</S.Span>
				<S.Div />
				<S.Span color='2BB673'>{result}</S.Span>
				<S.Div />
				<S.Span color='black'>입니다</S.Span>
			</S.SpanDiv>
			<S.ResultSection>
				<S.ResultBtn $backgroundColor='#CDCDCD' onClick={() => navigate("/signin")}>
					로그인
				</S.ResultBtn>
				<S.ResultBtn $backgroundColor='#2BB673' onClick={() => navigate("/findpassword")}>
					비밀번호 찾기
				</S.ResultBtn>
			</S.ResultSection>
		</S.ResultDiv>
	);

	return (
		<S.MainContentWrapper>
			<Announcement content='이메일 찾기' />
			{result ? foundEmail : <SearchEmailForm setResult={setResult} />}
		</S.MainContentWrapper>
	);
};

export default FindEmailForm;
