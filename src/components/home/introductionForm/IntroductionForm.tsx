import { useEffect } from "react";
import { bottle, carrot, cleaner, realTimeChat1, realTimeChat2, realTimeChat3, socks } from "../../../asstes/asstes";
import * as S from "./style";

const IntroductionForm = () => {
	useEffect(() => {
		const observer = new IntersectionObserver((e) => {
			e.forEach((img: any) => {
				if (img.isIntersecting) {
					img.target.style.opacity = 1;
					const currentTop = parseFloat(img.target.style.top);
					const newTop = currentTop + 6;
					img.target.style.top = `${newTop}px`;
				} else {
					img.target.style.opacity = 0;
					const currentTop = parseFloat(img.target.style.top);
					const newTop = currentTop - 6;
					img.target.style.top = `${newTop}px`;
				}
			});
		});

		const images = document.querySelectorAll(".icon-box img");
		images.forEach((img) => {
			observer.observe(img);
		});

		return () => {
			images.forEach((img) => {
				observer.unobserve(img);
			});
		};
	}, []);

	return (
		<S.IntroductionSection>
			<S.IntroLayoutBox>
				<S.TextBox>
					<h1>다양한 카테고리</h1>
					<p>
						소소한 소비의 변화가 큰 영향을 가져올 수 있습니다.
						<br />
						"1인가구를 위한 소분 커뮤니티"는 제품 종류와 상관없이 사용자들이 함께 나누고 소통하는 공간을
						제공합니다.
						<br /> 식품부터 일회용품까지, 소비의 의미를 새롭게 만나보세요.
					</p>
				</S.TextBox>
				<S.IconBox className='icon-box'>
					<img src={socks} alt='양말' style={{ top: "14px", left: "20px" }} />
					<img src={cleaner} alt='세제' style={{ top: "140px", left: "100px" }} />
					<img src={carrot} alt='당근' style={{ top: "20px", right: "150px" }} />
					<img src={bottle} alt='유리잔' style={{ top: "150px", right: "20px" }} />
				</S.IconBox>
			</S.IntroLayoutBox>
			<S.IntroLayoutBox>
				<S.IconBox className='icon-box'>
					<img
						src={realTimeChat1}
						alt='채팅아이콘'
						style={{ width: "305px", height: "83px", top: "50px", left: "10%" }}
					/>
					<img
						src={realTimeChat2}
						alt='채팅아이콘'
						style={{ width: "233px", height: "83px", top: "160px", left: "10%" }}
					/>
					<img
						src={realTimeChat3}
						alt='채팅아이콘'
						style={{ width: "189px", height: "83px", top: "280px", right: "10%" }}
					/>
				</S.IconBox>
				<S.TextBox>
					<h1>실시간 채팅</h1>
					<p>
						소소한 소비의 변화가 큰 영향을 가져올 수 있습니다.
						<br />
						"1인가구를 위한 소분 커뮤니티"는 제품 종류와 상관없이 사용자들이 함께 나누고 소통하는 공간을
						제공합니다.
						<br /> 식품부터 일회용품까지, 소비의 의미를 새롭게 만나보세요.
					</p>
				</S.TextBox>
			</S.IntroLayoutBox>
		</S.IntroductionSection>
	);
};

export default IntroductionForm;
