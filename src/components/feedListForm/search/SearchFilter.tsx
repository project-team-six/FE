import { searchIcon } from "../../../asstes/asstes";
import * as S from "./style";

const SearchFilter = ({
	titleOrContent,
	status,
	userInputHandler,
	handleStatusChange,
}: {
	titleOrContent: string;
	status: string;
	userInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleStatusChange: (status: string) => void;
}) => {
	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault(); 
			
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
				<input type='text' value={titleOrContent} onChange={userInputHandler} onKeyPress={handleKeyPress}/>
				<img src={searchIcon} alt='돋보기아이콘' />
			</S.SearchBox>
		</S.SearchFilterSection>
	);
};

export default SearchFilter;
