import DatePicker from "react-datepicker";
import styled from "styled-components";

export const MainContentWrapper = styled.div`
    position: relative;
    align-items: center;
`;

export const MainDatePickerDiv = styled.div`
    display: flex;
`;

export const DatePickerDiv = styled.div`
    display: flex;
    position: relative;
    align-items: center;
`;

export const StyledDatePicker = styled(DatePicker)`
    width: 215px;
    height: 45px;
    box-sizing: border-box;
    padding: 8px 20px;
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 80%);
`;

export const DashSpanDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
`;

export const DashSpan = styled.span`
    font-size: 16px;
    font-weight: 700;  
`;

export const Icon = styled.img`
    width: 24px;
    height: 22px;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
`;