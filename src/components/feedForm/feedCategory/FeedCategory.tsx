import { selectOptionType } from "../../../types/feedType";
import Select from 'react-select';
import * as S from "./style";

export const FeedCategory = ({category, setCategory}: {category: string, setCategory: (category: string) => void }) => {
    const options: selectOptionType[] = [
        {value: "FRESH_FOOD", label: "신선식품"},
        {value: "BEAUTY", label: "뷰티"},
        {value: "DAILY_NECESSITIES", label: "생필품"},
        {value: "ETC", label: "기타"}
    ];

    const handleChange = (selectedOption: selectOptionType | null) => {
        if (selectedOption) setCategory(selectedOption.value);
    };

    const customStyles = {
        control: (base: any) => ({
          ...base,
          width: "101.1%",
          height: "40px", // 높이 조절
          cursor: "pointer",
          paddingLeft: "10px",
        }),
    };
    
    // 수정 페이지의 경우 이미 선택되어 있기 때문에 초기 값으로 select 설정
    const initialValue = options.find(option => option.value === category);
    return (
        <S.MainDiv>
            <Select
            styles={customStyles}
            options={options}
            onChange={handleChange}
            value={initialValue}
            placeholder=""
            />
        </S.MainDiv>
    )
}