import styled from "styled-components";

export const RecentPostsSection = styled.section`
	width: 1280px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	gap: 3%;
	flex-wrap: wrap;
`;

export const MainTextBox = styled.div`
	display: flex;
	justify-content: center;
	margin: 110px 0 70px 0;
	font-family: "NEXON Lv1 Gothic OTF";
	font-size: 35px;
	font-weight: 900;
`;

export const ShowAllButton = styled.button`
	cursor: pointer;
	margin-bottom: 130px;
	font-size: 17px;
	color: #9a9a9a;
	border-bottom: 2.5px solid #9a9a9a;
	&:hover {
		font-weight: bold;
	}
`;
