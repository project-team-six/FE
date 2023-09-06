import { Flex, cursor } from "./../common/GlobalStyle";
import styled from "styled-components";

export const WrapperBox = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0%;
    right: 0%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const ModalForm = styled.form`
    background-color: #fff;
    width: 445px;
    height: 625px;
    position: absolute;
    top: 20%;
    right: 38%;
    ${Flex}
    flex-direction: column;
    border-radius: 10px;
    h2 {
        height: 60px;
        font-size: 1.6rem;
    }
`;

export const InputBox = styled.div`
    width: 350px;
    ${Flex};
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 35px;
    justify-items: center;
    
`;

export const ReasonBox = styled.div`
    width: 160px;
    height: 50px;
    position: relative;
    input[type="radio"] {
        ${cursor}
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }

    input[type="radio"] + label:before {
        ${cursor}
        content: '';
        position: absolute;
        left: -30px;
        top: -1px;
        width: 22px;
        height: 22px;
        border: 1px solid #d1d1d1;
        border-radius: 100%;
    }

    input[type="radio"]:checked + label:after {
        content: "";
        position: absolute;
        top: 4px;
        left: -25px;
        width: 14px;
        height: 14px;
        background: #4fbe9f;
        border-radius: 100%;
    }
    label {font-size: 1.2rem;
    ${cursor}
    }
`;

export const TextInput = styled.input`
    width: 380px;
    height: 75px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding-left: 1%;
    outline: none;
    &:focus {outline: 1px solid #4fbe9f}
`;

export const ReportSpan = styled.span`
font-size:1.2rem;
font-weight:700;
margin:30px 0 15px;
width:100%;
display:inline-block;
`

export const UpdateBox = styled.div`
    width: 380px;
    height: 115px;
    ${Flex}
    flex-direction: column;
    ${cursor}
    border : 1px solid #CFCFCF;
    border-radius: 10px;
    input {display: none}
    p {margin-top:5px}
`;

export const ButtonBox = styled.div`
margin-top:30px;
${Flex}
gap : 20px;
`


export const ReportButton = styled.button`
width:175px;
height:55px;
background-color:${(props) => props.color};
border-radius : 10px;
font-size:1.2rem;
color:#fff;
font-weight:800;
`

