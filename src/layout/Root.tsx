import { Outlet } from "react-router-dom";
import styled  from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

function Root() {
	return (
		<Container>
			<Header />
			<Outlet />
			<Footer />
		</Container>
	);
}

export default Root;

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
