import styled from "styled-components";

type InputProps = {
    width: string;
};

export const Input = styled.input<InputProps>`
    white-space: nowrap;     
    width: ${(props) => props.width};
    min-width: 215px;
    max-width: 760px;
    height: 45px;
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 80%);
    padding-left: 20px;
`;

export const TextArea = styled.textarea<InputProps>`
    width: ${(props) => props.width};
    min-width: 215px;
    max-width: 760px;
    height: 200px;
    max-height: 200px;
    resize: none;
    border: 1px solid hsl(0, 0%, 80%);  
    border-radius: 4px;
    padding: 12px;
    padding-left: 20px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: Arial, sans-serif;
    overflow-y: auto;
`;