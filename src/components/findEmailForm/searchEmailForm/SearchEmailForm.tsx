import { useNavigate } from "react-router";
import * as S from "./style";
import { ChangeEvent, useState } from "react";
import { findIdType } from "../../../types/findUser";
import { useMutation } from "react-query";
import { findUserEmail } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";

const SearchEmailForm = ({setResult}: {setResult: (value: string) => void}) => {
    // 이름
	const [username, setUsername] = useState<string>("");
	const changeUsername = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	// 전화번호
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const changePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(e.target.value);
	};

    const findEmailMutation = useMutation(findUserEmail, {
		onSuccess: (res) => {
            setResult(res.data.data.email);
		},
		onError: (error) => {
			if (error) pushNotification(`${error}`, "error");
			else pushNotification("에러가 발생했습니다. 나중에 다시 시도해주세요.", "error");
		},
	});

    const clickFindEmailBtn = () => {
		const userInfo: findIdType = {
			username,
			phoneNumber,
		};
		findEmailMutation.mutate(userInfo);
	};

    const navigate = useNavigate();
    return (
        <form >
            <S.InputDiv>
                <label>이름</label>
                <br />
                <S.Input type="text" required value={username} onChange={changeUsername}/>
            </S.InputDiv>
            <S.InputDiv>
                <label>전화번호</label>
                <br/>
                <S.Input type="number" required value={phoneNumber} onChange={changePhoneNumber}/>
            </S.InputDiv>
            <S.FindPwDiv>
                <button onClick={() => navigate("/findpassword")}>비밀번호 찾기</button>
            </S.FindPwDiv>
            <S.FindEmailDiv>
                <S.FindEmailBtn type="button" onClick={()=>clickFindEmailBtn()}>찾기</S.FindEmailBtn>
            </S.FindEmailDiv>
        </form>
    )
}

export default SearchEmailForm