import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { footerLogo, footerEmail } from "../asstes/asstes";
import { Flex, cursor } from "../components/common/GlobalStyle";

function Footer() {
	const navigate: NavigateFunction = useNavigate();

	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	return (
		<FooterLayout>
			<FooterBox>
				<SummarySection>
					<img src={footerLogo} alt="footerLogo" />
				</SummarySection>
				<DetailSection>
					<ul className="front-member-list">
						<h6>Front-end developer</h6>
						<MemberItem>Lee Ha-eun</MemberItem>
						<MemberItem>Lee Chaeyeon</MemberItem>
						<MemberItem>Choi Eunji</MemberItem>
					</ul>
					<ul className="back-member-list">
						<h6>Back-end developer</h6>
						<MemberItem>Jung Gil Kyu </MemberItem>
						<MemberItem>Jeong Yu-jin</MemberItem>
						<MemberItem>Kim Kwang Gyun</MemberItem>
						<MemberItem>Kim Kyung Hwan</MemberItem>
					</ul>
					<ul className="designer-member-list">
						<h6>Designer</h6>
						<MemberItem>Kim Se Young</MemberItem>
					</ul>
					<ul className="page-list">
						<h6>Pages</h6>
						<PageNavBtn onClick={handleNavigate("/")}>Home</PageNavBtn>
						<PageNavBtn onClick={handleNavigate("/feedlist")}>FeedList</PageNavBtn>
						<PageNavBtn onClick={handleNavigate("/signin")}>SignIn</PageNavBtn>
						<PageNavBtn onClick={handleNavigate("/signup")}>SignUp</PageNavBtn>
					</ul>
					<ul className="contact-member-list">
						<h6>Contact Us</h6>
						<MemberItem>sobunsobunProject@gmail.com</MemberItem>
					</ul>
				</DetailSection>
			</FooterBox>
			<PageInfoBox>
				<PageSpanBox>
					<img src={footerEmail} alt="footerEmail"/>
					<PageInfoSpan>2023 Sobun Sobun Inc. All rights reserved</PageInfoSpan>
				</PageSpanBox>
			</PageInfoBox>
		</FooterLayout>
	);
}

export default Footer;

const FooterLayout = styled.div`
	width: 100%;
	height: 348px;
	${Flex};
	flex-direction: column;
	background-color: #333333;
	margin : 0 auto;
	h6 {
		color: white;
		font-size: 15px;
		margin-bottom: 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (max-width: 800px) {
		height: 850px;
	}

	@media (max-width: 600px) {
		display: none;
	}
`;

const FooterBox = styled.div`
	width: 81%;
	min-width:600px;
	margin-top: 50px;
	display: flex;

	@media (max-width: 1279px) {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 800px) {
		display: flex;
		align-items: center;
		text-align: center;
	}
`;

const SummarySection = styled.section`
	width: 22%;
	display: flex;
	flex-direction: row;
	text-align: justify;
	margin-right:5%;
	img {
		width: 115px;
		height: 39px;
	}

	@media (max-width: 800px) {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
  		padding: 0;
		margin-bottom: 10px;
	}
`;
const DetailSection = styled.section`
	width:100%;
	display: flex;
	padding-top: 20px;
	gap: 5%;
	ul{
		width:80%;
	}
	@media (max-width: 800px) {
		display: flex;
		align-items: center;
		flex-direction: column;

		ul{
			margin-bottom: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
	}
`;

const MemberItem = styled.li`
	font-size: 12px;
	margin-bottom: 15px;
	color: #939393;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const PageNavBtn = styled.button`
	display: flex;
	flex-direction: column;
	font-size: 12px;
	margin-bottom: 15px;
	color: #939393;
	${cursor};
`;

const PageInfoBox = styled.div`
	width: 81%;
	max-width: 1920px;
	margin-top: 50px;
	display: flex;
	border-top: 1px solid #4A4A4A;
`;

const PageSpanBox = styled.div`
	display: flex;
	margin-top: 30px;
	margin-left: 193px;
	margin-bottom: 45px;
`;

const PageInfoSpan = styled.span`
	font-size: 9px;
	font-weigth: bold;
	color: #B0B0B0;
`;