import styled from "styled-components";

type SpanProps = {
	fontSize: number;
	fontWeight: string;
	color?: string;
	MarginRight? : number;
};

export const Span = styled.span<SpanProps>`
	font-size: ${(props) => props.fontSize}px;
	font-weight: ${(props) => props.fontWeight};
	color: #${(props) => props.color};
	margin-right: ${(props) => props.MarginRight}px;
`;

export const MainContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-top: auto;
`;

export const Ul = styled.ul`
    padding: 20px;
`;

export const Li = styled.li`
    margin-bottom: 10px;
`;

export const SendBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const SendDiv = styled.div`
    width: auto;
    max-width: 210px;
    background-color: #2BB673;
    border-radius: 15px 0 15px 15px;
    padding: 10px;
    word-wrap: break-word;
`;

export const ReceiveBox = styled.div`
    display: flex;
    gap: 10px;
`;

export const ProfileImg = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 50%;
`;

export const ReceiveContentBox = styled.div`
    display: flex;
    flex-direction: column;
`;

type SpanBoxProps = {
    $backgroundColor: string;
    borderRadius: string;
};


export const SpanBox = styled.div<SpanBoxProps>`
    width: auto;
    max-width: 210px;
    background-color: #${props => props.$backgroundColor};
    border-radius: ${props => props.borderRadius};
    padding: 10px;
    word-wrap: break-word;
`;

export const MsgInfoBox = styled.div`
    display: flex;
    gap: 10px;
`;

export const TimeBox = styled.div`
    margin-top: auto;
`;

export const Img = styled.img`
    width: 170px;
    height: 170px;
`;