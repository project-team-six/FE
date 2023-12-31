import { ChangeEvent, useState } from "react";
import { textInfoType } from "../../../../types/userType";
import TextInputForm from "../../../common/textInputForm/TextInputForm";
import * as S from "./style";

const InputForm = ({ textInfo, setValue }: { textInfo: textInfoType, setValue: (value: string) => void }) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [valMsg, setValMsg] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setInputValue(val);

		let isOk = false;
		const condition = textInfo.condition; // 조건
		const errorMsg = textInfo.errorMsg; // 에러 메시지
		if (val.trim() === "") {
			// 입력된 값이 없는 경우
			setValMsg("");
		} else if (typeof condition === "string") {
			// 비밀번호 확인
			if (condition === val) {
				isOk = true;
				setValMsg("");
			} else {
				setValMsg(errorMsg);
			}
		} else {
			// 패턴 확인이 필요한 값
			if (condition.test(val)) {
				isOk = true;
				setValMsg("");
			} else {
				setValMsg(errorMsg);
			}
		}
		if (isOk) setValue(val);
		else setValue("");
	};

	return (
		<S.MainContentWrapper>
			<TextInputForm label={textInfo.kind} type={textInfo.type} value={inputValue} handleChange={handleChange} msg={valMsg} placeholder={textInfo.placeholder}/>
		</S.MainContentWrapper>
	);
};

export default InputForm;