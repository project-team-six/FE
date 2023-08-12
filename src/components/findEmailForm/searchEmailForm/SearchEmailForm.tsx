import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { findIdType } from "../../../types/findUser";
import { findUserEmail } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";
import * as Sf from "../../common/commonFormStyles";

const SearchEmailForm = ({setResult}: {setResult: (value: string) => void}) => {
    const [inputValue, setInputValue] = useState<findIdType>({
        username: "", // 이름
        phoneNumber: "", // 전화번호
    });

    const { username, phoneNumber } = inputValue;
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
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
            <Sf.InputDiv>
                <label>이름</label>
                <br />
                <Sf.Input name="username" onChange={handleInput}/>
            </Sf.InputDiv>
            <Sf.InputDiv>
                <label>전화번호</label>
                <br/>
                <Sf.Input name="phoneNumber" onChange={handleInput}/>
            </Sf.InputDiv>
            <Sf.MovePageDiv>
                <button type="button" onClick={() => navigate("/findpassword")}>비밀번호 찾기</button>
            </Sf.MovePageDiv>
            <Sf.FindDiv>
                <Sf.FindBtn type="button" onClick={()=>clickFindEmailBtn()}>찾기</Sf.FindBtn>
            </Sf.FindDiv>
        </form>
    )
}

export default SearchEmailForm;