import { selectOptionType } from "../../../types/feedType";
import Select from 'react-select';

export const FeedCategory = ({setCategory}: {setCategory: (category: string) => void }) => {
    const options: selectOptionType[] = [
        {value: "FRESH_FOOD", label: "신선식품"},
        {value: "BEAUTY", label: "뷰티"},
        {value: "DAILY_NECESSITIES", label: "생필품"},
        {value: "ETC", label: "기타"}
    ];

    const handleChange = (selectedOption: selectOptionType | null) => {
        if (selectedOption) setCategory(selectedOption.value);
    };

    return (
        <Select
            options={options}
            onChange={handleChange}
            placeholder="카테고리를 선택해주세요."
        />
    )
}