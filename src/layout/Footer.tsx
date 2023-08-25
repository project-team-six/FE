import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mainLogo } from "../asstes/asstes";
import { FlexBox } from "../components/common/GlobalStyle";

function Footer() {
	const navigate: NavigateFunction = useNavigate();

	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	return (
		<div>
			<FooterLayout>
				<FooterBox>
					<SummarySection>
						<img src={mainLogo} alt='메인로고' />
						<p>
							Welcome to Sobun Sobun. We are a small community for single-person households. This website
							is created through a collaboration between three front-end developers, four back-end
							developers, and one designer. Thank you for showing interest.
						</p>
					</SummarySection>
					<DetailSection>
						<ul className='front-member-list'>
							<h6>Front-end developer</h6>
							<MemberItem>Lee Ha-eun</MemberItem>
							<MemberItem>Lee Chaeyeon</MemberItem>
							<MemberItem>Choi Eunji</MemberItem>
						</ul>
						<ul className='back-member-list'>
							<h6>Back-end developer</h6>
							<MemberItem>Jung Gil Kyu </MemberItem>
							<MemberItem>Jeong Yu-jin</MemberItem>
							<MemberItem>Kim Kwang Gyun</MemberItem>
							<MemberItem>Kim Kyung Hwan</MemberItem>
						</ul>
						<ul className='designer-member-list'>
							<h6>Designer</h6>
							<MemberItem>Akkaya Pelin</MemberItem>
						</ul>
						<div className='page-list'>
							<h6>Pages</h6>
							<PageNavBtn onClick={handleNavigate("/")}>Home</PageNavBtn>
							<PageNavBtn onClick={handleNavigate("/feedlist")}>FeedList</PageNavBtn>
							<PageNavBtn onClick={handleNavigate("/signin")}>SignIn</PageNavBtn>
							<PageNavBtn onClick={handleNavigate("/signup")}>SignUp</PageNavBtn>
						</div>
					</DetailSection>
				</FooterBox>
			</FooterLayout>
			<FlexBox style={{ padding: "10px 0 10px 0", fontSize: "11px" }}>
				&copy; 2023 Sobun Sobun Inc. All rights reserved
			</FlexBox>
		</div>
	);
}

export default Footer;

const FooterLayout = styled.div`
	width: 100%;
	margin: 0 auto;
	height: 180px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	h6 {
		font-size: 14px;
		margin-bottom: 15px;
	}
`;

const FooterBox = styled.div`
	width: 1280px;
	align-items: center;
	display: flex;
	gap: 220px;
`;

const SummarySection = styled.section`
	width: 360px;
	display: flex;
	flex-direction: column;
	text-align: justify;
	img {
		width: 170px;
		height: 60x;
	}
	p {
		font-size: 13px;
	}
`;
const DetailSection = styled.section`
	display: flex;
	padding-top: 20px;
	gap: 90px;
`;

const MemberItem = styled.li`
	font-size: 12px;
	margin-bottom: 5px;
`;
const PageNavBtn = styled.button`
	display: flex;
	flex-direction: column;
	font-size: 12px;
	margin-bottom: 5px;
`;
