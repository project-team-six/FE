// import { useMemo } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

export const FeedDay = ({
	label,
	range,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
}: {
	label: string;
	range: boolean;
	startDate: Date;
	setStartDate: (startDate: Date) => void;
	endDate?: Date;
	setEndDate?: (endDate: Date) => void;
}) => {
	const handleChange = (date: any) => {
		if (range && setEndDate) {
			// 범위
			const [start, end] = date;
			setStartDate(start);
			setEndDate(end);
		} else setStartDate(date);
	};

	const datePicker = (
		<DatePicker
			selectsRange={range}
			startDate={startDate}
			endDate={endDate}
			locale={ko}
			dateFormat='yyyy-MM-dd'
			shouldCloseOnSelect
			minDate={new Date("2000-01-01")}
			maxDate={new Date()}
			selected={startDate}
			onChange={handleChange}
		/>
	);

	return (
		<div>
			<label>{label}</label>
			{datePicker}
		</div>
	);
};
