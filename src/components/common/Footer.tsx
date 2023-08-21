import React from "react";
import * as St from "../common/commonStyle";
import { NavigateFunction, useNavigate } from "react-router-dom";
import mainlogo from "../../asstes/mainlogo.png";
import { FlexBox, LayoutBox } from "./GlobalStyle";

function Footer() {
	const navigate: NavigateFunction = useNavigate();

	const handleNavigate = (path: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigate(path);
	};

	return (
		<div>
			<St.FooterLayout>
				<St.FooterBox>
					<St.SummarySection>
						<img src={mainlogo} alt='메인로고' />
						<p>
							Welcome to Sobun Sobun. We are a small community for single-person households. This website
							is created through a collaboration between three front-end developers, four back-end
							developers, and one designer. Thank you for showing interest.
						</p>
					</St.SummarySection>
					<St.DetailSection>
						<ul className='front-member-list'>
							<h6>Front-end developer</h6>
							<St.MemberItem>Lee Ha-eun</St.MemberItem>
							<St.MemberItem>Lee Chaeyeon</St.MemberItem>
							<St.MemberItem>Choi Eunji</St.MemberItem>
						</ul>
						<ul className='back-member-list'>
							<h6>Back-end developer</h6>
							<St.MemberItem>Jung Gil Kyu </St.MemberItem>
							<St.MemberItem>Jeong Yu-jin</St.MemberItem>
							<St.MemberItem>Kim Kwang Gyun</St.MemberItem>
							<St.MemberItem>Kim Kyung Hwan</St.MemberItem>
						</ul>
						<ul className='designer-member-list'>
							<h6>Designer</h6>
							<St.MemberItem>Akkaya Pelin</St.MemberItem>
						</ul>
						<div className='page-list'>
							<h6>Pages</h6>
							<St.PageNavBtn onClick={handleNavigate("/")}>Home</St.PageNavBtn>
							<St.PageNavBtn onClick={handleNavigate("/feedlist")}>FeedList</St.PageNavBtn>
							<St.PageNavBtn onClick={handleNavigate("/signin")}>SignIn</St.PageNavBtn>
							<St.PageNavBtn onClick={handleNavigate("/signup")}>SignUp</St.PageNavBtn>
						</div>
					</St.DetailSection>
				</St.FooterBox>
			</St.FooterLayout>
			<FlexBox style={{ padding: "10px 0 10px 0", fontSize: "11px" }}>
				&copy; 2023 Sobun Sobun Inc. All rights reserved
			</FlexBox>
		</div>
	);
}

export default Footer;
