import styled from "styled-components";

export const ResultDiv = styled.div`
    display: grid;
    place-items: center;
    margin-top: 40px;
`;

export const ResultEmailSection = styled.section`
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    background-color: red;
`;

export const ResultEmailDiv = styled.div`
    width: 330px;
    height: 40px;
    background-color: #F3F3F3;
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const ResultSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px; 
    margin-bottom: 100px;
`;

type ButtonProps = {
    color: string;
    backgroundColor?: string;
    borderColor?: string;
}

export const ResultBtn = styled.button<ButtonProps>`
    width: 140px;
    height: 35px;
    border-radius: 20px;
    background-color: ${props => props.backgroundColor};
    border: ${props => props.borderColor};
    color: ${props => props.color};
`;