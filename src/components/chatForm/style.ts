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

export const HeaderDiv = styled.div`
	width: 100%;
	text-align: center;
	margin-left: 20px;
`;

export const HeaderButton = styled.button`
	cursor: pointer;
`;

export const CloseImg = styled.img`
	width: 14px;
	height: 14px;
`;

export const ContentSection = styled.section`
	height: 100%;
`;

export const Li = styled.li`
	height: 78px;
	display: flex;
	flex-direction: row;
	padding: 20px;
	border-bottom: 1px solid #EEEEEE;
	gap: 10px;
`;

export const LiButton = styled.button`
	width: 100%;
	height: 100%;
	display: flex;
	cursor: pointer;
`;

export const ProfileImg = styled.img`
	width: 38px;
	height: 38px;
	border-radius: 50%;
`;

export const Section = styled.section`
	margin-left: 15px;
`;

export const ContentDiv = styled.div`
	text-align: left;
	margin-top: 5px;
	width: 200px;
	overflow: hidden; 
	text-overflow: ellipsis; 
`;

export const DeleteButton = styled.button`
	cursor: pointer;
	position: absolute;
	left: 85%;
	margin-top: 10px;
`;

export const SpanDiv = styled.div`
	display: flex;
 	align-items: left;
	 text-align: left;
`;

export const TitleDiv = styled.div`
	width: auto;
	max-width: 100px;
	white-space: nowrap; 
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: left;
`;