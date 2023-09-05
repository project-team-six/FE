import { feedDateType } from "../../../types/feedType";
import { useState } from "react";
import { ko } from "date-fns/locale";
import * as S from "./style";
import "react-datepicker/dist/react-datepicker.css";
import { calendarIcon } from "../../../asstes/asstes";

export const FeedDay = ({name, range, dateEntered, setDateEntered}: { name: string, range: boolean, dateEntered: feedDateType, setDateEntered: (startDate: feedDateType) => void; }) => {
	let [initialValue1, initialValue2] = ["", ""]; // 초기 값
    switch (name) {
        case "dealable": // 거래 가능 날짜
            initialValue1 = dateEntered.transactionStartDate;
			initialValue2 = dateEntered.transactionEndDate;
            break;
        case "consumerPeriod": // 소비기한
            initialValue1 = dateEntered.consumerPeriod;
            break;
        case "purchase": // 구매 날짜
            initialValue1 = dateEntered.purchaseDate;
            break;
    }
	
	const [startDateTime, setStartDateTime] = useState(new Date(initialValue1)); // 시작
	const [endDateTime, setEndDateTime] = useState(new Date(initialValue2));	 // 종료

	return (
		<S.MainContentWrapper>
			{range ? 
			<S.MainDatePickerDiv>
				<S.DatePickerDiv>
					<S.StyledDatePicker
						locale={ko}
						dateFormat="yyyy.MM.dd"
						selected={startDateTime}
						closeOnScroll={true} 
						onChange={(date: Date) => setStartDateTime(date)}
					/>
					<S.Icon src={calendarIcon} alt="달력"/>
				</S.DatePickerDiv>
				<S.DashSpanDiv>
					<S.DashSpan> ~ </S.DashSpan>
				</S.DashSpanDiv>
				<S.DatePickerDiv>
					<S.StyledDatePicker
						locale={ko}
						dateFormat="yyyy.MM.dd"
						selected={endDateTime}
						closeOnScroll={true} 
						onChange={(date: Date) => setEndDateTime(date)}
					/>
					<S.Icon src={calendarIcon} alt="달력"/>
				</S.DatePickerDiv>
			</S.MainDatePickerDiv>
			:
			<div>
				<S.StyledDatePicker
					selectsRange={range}
					startDate={startDateTime}
					endDate={endDateTime}
					locale={ko}
					dateFormat="yyyy-MM-dd"
					shouldCloseOnSelect
					minDate={new Date("2000-01-01")}
					selected={startDateTime}
					onChange={(date: Date) => setStartDateTime(date)}
				/>
				<S.Icon src={calendarIcon} alt="달력"/>
			</div> 
			}
		</S.MainContentWrapper>
	);
};