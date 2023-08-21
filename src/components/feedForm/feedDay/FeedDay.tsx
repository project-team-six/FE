import { ko } from "date-fns/locale";
import * as S from "./style";
import "react-datepicker/dist/react-datepicker.css";
import { feedDateType } from "../../../types/feedType";
import { useState } from "react";

// dateEntered={dateEntered} setDateEntered={setDateEntered}
export const FeedDay = ({label, name, range, dateEntered, setDateEntered}: { label: string, name: string, range: boolean, dateEntered: feedDateType, setDateEntered: (startDate: feedDateType) => void; }) => {
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
	
	const handleChange = (date: any) => {
		if (range) {
			const [start, end] = date;
			setStartDateTime(start);
			setEndDateTime(end);
		} else setStartDateTime(date);
	};

	return (
		<div>
			<S.MainContentWrapper>
				<S.Label>{label}</S.Label>
				<div>
					<S.StyledDatePicker
						selectsRange={range}
						startDate={startDateTime}
						endDate={endDateTime}
						locale={ko}
						dateFormat='yyyy-MM-dd'
						shouldCloseOnSelect
						minDate={new Date("2000-01-01")}
						selected={startDateTime}
						onChange={handleChange}
					/>
				</div>
			</S.MainContentWrapper>
			<S.Line />
		</div>
	);
};