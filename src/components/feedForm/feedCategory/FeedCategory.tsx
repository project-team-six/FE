import { selectOption } from "../../../types/feedType";
import Select from 'react-select';

export const FeedCategory = ({setCategory}: {setCategory: (category: string) => void }) => {
    const options: selectOption[] = [
        {value: "freshFood", label: "신선식품"},
        {value: "beauty", label: "뷰티"},
        {value: "dailyNecessity", label: "생필품"},
        {value: "etx", label: "기타"}
    ];

    const handleChange = (selectedOption: selectOption | null) => {
        if (selectedOption) setCategory(selectedOption.label);
    };

    return (
        <Select
            options={options}
            onChange={handleChange}
            placeholder="카테고리를 선택해주세요."
        />
    )
}