import styled from "styled-components";

export const MainContentWrapper = styled.div`
    display: grid;
    place-items: center;
    margin: 0 auto;
    width: 57%;
    margin-top: 100px;
    margin-bottom: 165px;
`;

type InputSpanProps = {
    fontSize: number;
    fontWeight: string;
};

export const Span = styled.span<InputSpanProps>`
    font-size: ${(props) => props.fontSize}px;
    font-weight: ${(props) => props.fontWeight};
`;

export const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #D9D9D9;
    margin-top: 25px;
    margin-bottom: 25px;
`;

export const TitleDiv = styled.div`
    text-align: left;
    width: 100%;
`;

export const FormSection = styled.section`
    width: 100%;
`;

export const CategoryDiv = styled.div`
    display: flex;
    align-items: center; 
`;

export const CategoryLabel = styled.label`
    white-space: nowrap; 
    margin-right: 13%;
`;

export const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const LocationLabel = styled.label`
    white-space: nowrap; 
    margin-right: 16%;
`;

export const LocationDiv = styled.div`
    width: 79%;
    height: 40px;
    background-color: #6F8A6B;
    display: grid;
    place-items: center;
    border-radius: 4px;
`;

export const LocationSpan = styled.span`
    color: #FFFFFF;
`;

export const PrecautionContentWrapper = styled.section`
    display: flex;
    width: 100%;
`;

export const PrecautionsLabel = styled.label`
    white-space: nowrap; 
    margin-right: 13%;
`;

export const PrecautionsDiv = styled.div`
    font-size: 15px;
    width: 98%;
    height: 125px;
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 80%);
    padding: 8px 8px;
`;

export const CheckboxDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-right: 13px;
`;

export const CheckboxLabel = styled.label`
    margin-right: 10px;
`;

export const ButtonSection = styled.section`
    display: flex;
    justify-content: center;
    margin-top: 100px;
    gap: 100px;
`;

export const Button = styled.button`
    width: 130px;
    height: 30px;
    border-radius: 20px;
    color: #FFFFFF;
    background-color: #6F8A6B;
`;