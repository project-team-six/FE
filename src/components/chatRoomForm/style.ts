import styled from "styled-components/";

export const MessageBox = styled.div`
    max-width : 380px;
    margin : 0 auto;
`

type DivProps = {
	textAlign: string;
};

export const MessageDiv = styled.div<DivProps>`
    text-align: ${(props) => props.textAlign};
    margin-bottom: 10px;
`;