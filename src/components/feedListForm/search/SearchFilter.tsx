import { ChangeEvent } from "react";
import { useState } from "react";
import { searchIcon } from "../../../asstes/asstes";
import * as S from "./style";

const SearchFilter = ({
	status,
	handleStatusChange,
	setTitleOrContent,
}: {
	status: string;
	handleStatusChange: (status: string) => void;
	setTitleOrContent: (titleOrContent: string) => void;
}) => {
	const [inputValue, setInputValue] = useState<string>("");
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	// 엔터 이벤트 관리
	const userInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault(); // 기본 엔터 행동방지
			setTitleOrContent(inputValue);
		}
	};

	return (
		<S.SearchFilterSection>
			<S.FilterBox>
				<S.InProgressButton
					onClick={() => handleStatusChange("IN_PROGRESS")}
					className={status === "IN_PROGRESS" ? "active" : ""}>
					소분진행중
				</S.InProgressButton>
				<S.FinishButton
					onClick={() => handleStatusChange("COMPLETED")}
					className={status === "COMPLETED" ? "active" : ""}>
					소분마감
				</S.FinishButton>
			</S.FilterBox>
			<S.SearchBox>
				<input type="text" value={inputValue} onChange={handleChange} onKeyPress={userInputHandler} />
				<img src={searchIcon} alt="돋보기아이콘" />
			</S.SearchBox>
		</S.SearchFilterSection>
	);
};

export default SearchFilter;
