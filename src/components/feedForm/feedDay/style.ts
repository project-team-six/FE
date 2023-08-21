import DatePicker from "react-datepicker";
import styled from "styled-components";

export const MainContentWrapper = styled.div`
    display: flex;
    align-items: center; 
`;

export const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #D9D9D9;
    margin-top: 25px;
    margin-bottom: 25px;
`;

export const Label = styled.label`
    width: 100px;
    margin-right: 4.7%;
`;

export const StyledDatePicker = styled(DatePicker)`
    width: 200px;
    height: 40px;
    box-sizing: border-box;
    padding: 8px 20px;
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 80%);
`;