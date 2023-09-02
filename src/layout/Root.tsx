import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

function Root() {
	return (
		<Container>
			<Header />
			<Outlet />
			<PlusButton>+</PlusButton>
			<Footer />
		</Container>
	);
}

export default Root;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const PlusButton = styled.div`
	position: fixed;
	bottom: 10%;
	right: 10%;
	color: pink;
	font-size: 30px;
	width: 30px;
	height: 30px;
`;
