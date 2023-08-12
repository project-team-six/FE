import DatePicker from "react-datepicker";
import styled from "styled-components";

export const MainContentWrapper = styled.div`
    display: flex;
    align-items: center; 
`;

export const Label = styled.label`
    width: 100px;
    margin-right: 6%;
`;

export const StyledDatePicker = styled(DatePicker)`
    width: 200px;
    height: 40px;
    box-sizing: border-box;
    padding: 8px 20px;
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 80%);
`;