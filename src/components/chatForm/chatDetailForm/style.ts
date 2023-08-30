import styled from "styled-components";

export const ModalLayout = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
`;

export const ChatLayout = styled.div`
	position: absolute;
	right: 16%;
	top: 6%;
	width: 375px;
	height: 70%;
	max-height: 812px;
	border: 1px solid #d3d3d3;
	background-color: white;
	border-radius: 15px;
	overflow-y: auto;
	/* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
	&::-webkit-scrollbar {
		display: none;
	}
	z-index: 998;
`;

export const HeaderSection = styled.section`
	position: sticky;
	top: 0;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	border-bottom: 1px solid #EEEEEE;
	background-color: white;
	z-index: 998;
`;

export const HeaderSpanDiv = styled.div`
	text-align: center;
`;

export const ParticipantDiv = styled.div`
	width: 150px;
	white-space: nowrap; 
	overflow: hidden;
	text-overflow: ellipsis; 
`;

type ButtonProps = {
	width?: number;
	height?: number;
};

export const Button = styled.button<ButtonProps>`
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	cursor: pointer;
`;

type SpanProps = {
	fontSize: number;
	fontWeight: string;
	fontColor?: string;
	MarginRight? : number;
};

export const Span = styled.span<SpanProps>`
	font-size: ${(props) => props.fontSize}px;
	font-weight: ${(props) => props.fontWeight};
	color: #${(props) => props.fontColor};
	margin-right: ${(props) => props.MarginRight}px;
`;

export const ContentSection = styled.section`
	margin-top: auto;
	padding: 20px;
	overflow-y: auto;
	height: 85%;
	max-height: 100%;
	min-height: 10%;
`;

export const InputSection = styled.section`
	position: sticky;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-left: 7px;
	background-color: #F1F1F1;
	height: 65px;
	z-index: 999;
`;

export const Input = styled.input`
	padding: 10px;
	width: 297px;
	height: 40px;
	border: 1px solid #D1D1D1;
	border-radius: 30px;
	background-color: #F1F1F1;
`;

export const InputButton = styled.button`
	cursor: pointer;	
`;

export const Li = styled.li`
	display: flex;
	margin-bottom: 20px;
`;

export const SendBox = styled.div`
	margin-left: auto;
`;

export const ReceiveBox = styled.div`
	margin-top: 5px;
	display: flex;
	align-items: center;
`;

export const TimeBox = styled.div`
	margin-top: 5px;
	margin-left: 10px;
`;

type DivProps = {
	$backgroundColor: string;
	borderRadius: string;
	width: number;
	padding: string;
};

export const MessageBox = styled.div<DivProps>`
	text-align: center;
	align-items: center;
	background-color: #${props => props.$backgroundColor};
	border-radius: ${props => props.borderRadius};
	padding: ${props => props.padding};
	width: ${props => props.width}px;
`;

export const ProfileImg = styled.img`
	width: 38px;
	height: 38px;
	border-radius: 50%;
	margin-right: 10px;
`;