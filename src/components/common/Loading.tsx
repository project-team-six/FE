import styled from "styled-components";
import { LoadingSpinner } from "../../asstes/asstes";

const Loading = () => {
	return (
		<LoadingContainer>
			<h1>잠시만 기다려주세요.</h1>
			<img src={LoadingSpinner} alt='로딩중입니다' />
		</LoadingContainer>
	);
};

export default Loading;

const LoadingContainer = styled.div`
	height: 70vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	h1 {
		font-size: 25px;
		padding: 20px 0 20px 0;
	}
	img {
		width: 100px;
		height: 100px;
	}
`;
