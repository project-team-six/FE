import React from "react";
import { Outlet } from "react-router-dom";
import  styled  from "styled-components";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

function Root() {
	return (
		<StContainer>
			<Header />
			<Outlet />
			<Footer />
		</StContainer>
	);
}

export default Root;

const StContainer = styled.div`
	display: flex;
	flex-direction: column;
`;