import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { findPassword } from "../../api/userApi";
import { findPwType } from "../../types/findUser";
import { pushNotification } from "../../utils/notification";
import mainlogo from "../../asstes/mainlogo.png"
import * as Sf from "../common/commonFormStyles";

const FindPwForm = () => {
    const [inputValue, setInputValue] = useState<findPwType>({
        username: "", // 이름
        phoneNumber: "", // 전화번호
        email: "" // 이메일
    });

    const { username, phoneNumber, email } = inputValue;
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const findPwMutation = useMutation(findPassword, {
		onSuccess: () => {
			pushNotification("이메일로 임시 비밀번호를 전송했습니다.", "success");
		},
		onError: (error) => {
			pushNotification("존재하지 않는 정보입니다", "warning");
		},
	});

	const clickFindPwBtn = () => {
		const userinfo: findPwType = {
			email,
			username,
			phoneNumber,
		};
		findPwMutation.mutate(userinfo);
	};

    const navigate = useNavigate();
    return (
        <Sf.MainContentWrapper>
            <Sf.LogoImg src={mainlogo} alt="mainlogo"/>
            <span>비밀번호 찾기</span>
            <form>
                <Sf.InputDiv>
                    <label>이메일</label>
                    <br />
                    <Sf.Input name="email" onChange={handleInput}/>
                </Sf.InputDiv>
                <Sf.InputDiv>
                    <label>이름</label>
                    <br />
                    <Sf.Input name="username" onChange={handleInput}/>
                </Sf.InputDiv>
                <Sf.InputDiv>
                    <label>전화번호</label>
                    <br />
                    <Sf.Input name="phoneNumber" onChange={handleInput}/>
                </Sf.InputDiv>
                <Sf.MovePageDiv>
                    <button type="button" onClick={() => navigate("/findemail")}>이메일 찾기</button>
                </Sf.MovePageDiv>
                <Sf.FindDiv>
                    <Sf.FindBtn type="button" onClick={clickFindPwBtn}>찾기</Sf.FindBtn>
                </Sf.FindDiv>
            </form>
        </Sf.MainContentWrapper>
    )
}

export default FindPwForm;