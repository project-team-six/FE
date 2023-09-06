import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router";
import styled from "styled-components";
import { RootState } from "../../redux/config/configStore";
import { toggleModal } from "../../redux/modules/locationSet";
import { cursor, MainBackgroundColor } from "../common/GlobalStyle";


const PlusButton = () => {
	//로그인 상태일때만 plus button 컴포넌트 렌더링
	const isLogin = useSelector((state: RootState) => {
		return state.tokenSlice.isLogin;
	});

	const dispatch = useDispatch();

	//+ 버튼눌렀을때 activebox 렌더링, x 버튼으로 변화
	const [isActiveBoxVisible, setIsActiveBoxVisible] = useState(false);
	const [isRotated, setIsRotated] = useState(false);

	const toggleActiveBox = () => {
		setIsActiveBoxVisible(!isActiveBoxVisible);
		setIsRotated(!isRotated);
	};

	const navigate: NavigateFunction = useNavigate();

	//게시글작성버튼 핸들러
	const handleFeedAddButton = () => {
		setIsActiveBoxVisible(!isActiveBoxVisible);
		setIsRotated(!isRotated);
		navigate("/feedadd");
	}

	//지역설정버튼 핸들러
	const handleSettingLocateButton = () => {
		setIsActiveBoxVisible(!isActiveBoxVisible);
		setIsRotated(!isRotated);
		dispatch(toggleModal());
	}




	return isLogin ? (
		<>
		<FixedPlusBtn>
			{isActiveBoxVisible && (
				<ActiveBox>
					<Btn onClick={handleFeedAddButton}>게시글 작성</Btn>
					<Btn onClick={handleSettingLocateButton}>지역 설정</Btn>
				</ActiveBox>
			)}
			<ActiveButton onClick={toggleActiveBox} className={isRotated ? "rotated" : ""}>
				+
			</ActiveButton>
		</FixedPlusBtn>

		</>
	) : null;
};

export default PlusButton;

const FixedPlusBtn = styled.div`
	position: fixed;
	bottom: 5%;
	right: 5%;
`;

const ActiveBox = styled.div`
	position: absolute;
	right: 10px;
	bottom: 70px;
	width: 210px;
	height: 100px;
	background-color: white;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid #d8d8d8;
`;

const Btn = styled.button`
	${cursor}
	width: 200px;
	height: 40px;
	border-radius: 10px;
	color: #989898;
	font-size: 15px;
	font-weight: 500;
	&:hover {
		background-color: #efefef;
		color: black;
	}
`;

const ActiveButton = styled.button`
	position: relative;
	width: 64px;
	height: 64px;
	border-radius: 100%;
	${cursor}
	font-size: 50px;
	${MainBackgroundColor}
	color: white;
	transition: all 0.1s ease-in;
	&.rotated {
		transform: rotate(-45deg);
		background-color: #d8d8d8;
		color: #656565;
	}
`;
