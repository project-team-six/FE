import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { findUserEmail } from "../../../api/userApi";
import { pushNotification } from "../../../utils/notification";
import { findEmailType } from "../../../types/userType";
import Input from "../../../theme/Input";
import * as S from "./style";
import { userIcon, phoneIcon } from "../../../asstes/asstes";

const SearchEmailForm = ({setResult}: {setResult: (value: string) => void}) => {
    const [username, setUsername] = useState<string>(""); // 이름
    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value) };

    const [phoneNumber, setPhoneNumber] = useState<string>(""); // 전화번호
    const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => { setPhoneNumber(e.target.value) };

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
		const userInfo: findEmailType = {
			username,
			phoneNumber,
		};
        console.log(userInfo)
		findEmailMutation.mutate(userInfo);
	};



    const navigate = useNavigate();
    return (
        <S.MainContentWrapper>
            <S.Section>
                <Input label={"이름"} icon={userIcon} type={"text"} value={username} handleChange={handleChangeUsername} width={33} placeholder={"이름을 입력해주세요. ex)홍길동"} message={""}/>
            </S.Section>
            <S.Section>
                <Input label={"전화번호"} icon={phoneIcon} type={"text"} value={phoneNumber} handleChange={handleChangePhoneNumber} width={33} placeholder={"'-'는 제외하고 숫자만 입력해주세요."} message={""}/>
            </S.Section>
            <S.SectionButton>
                <S.Button onClick={()=>clickFindEmailBtn()}>찾기</S.Button>
            </S.SectionButton>
            <section>
                <S.PwButton onClick={() => navigate("/findpassword")}>비밀번호가 기억나지 않으신가요?</S.PwButton>
            </section>
        </S.MainContentWrapper>
    )
}

export default SearchEmailForm;