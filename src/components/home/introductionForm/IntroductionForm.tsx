import { useEffect } from "react";
import { LEMON, MUSHROOM, PEAR, POT, realTimeChat1, realTimeChat2, realTimeChat3, m_socks } from "../../../asstes/asstes";
import * as S from "./style";

const IntroductionForm = () => {
	useEffect(() => {
		const observer = new IntersectionObserver((e) => {
			e.forEach((img: any) => {
				if (img.isIntersecting) {
					img.target.style.opacity = 1;
					const currentTop = parseFloat(img.target.style.top);
					const newTop = currentTop + 15;
					img.target.style.top = `${newTop}%`;
				} else {
					img.target.style.opacity = 0;
					const currentTop = parseFloat(img.target.style.top);
					const newTop = currentTop - 15;
					img.target.style.top = `${newTop}%`;
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
				<S.IconBox className='icon-box' style={{ position: "relative" }}>
					<img src={MUSHROOM} alt='버섯' style={{ top: "5%", left: "60px", width: "23%", height: "37%" }} />
					<img src={LEMON} alt='레몬' style={{ top: "5%", right: "45px", width: "23%", height: "33%" }} />
					<img src={PEAR} alt='배' style={{ top: "15%", left: "40%", width: "24%", height: "50%" }} />
					<img src={POT} alt='냄비' style={{ top: "50%", left: "20px", width: "33%", height: "40%" }} />
					<img src={m_socks} alt='양말' style={{ top: "45%", right: "60px", width: "28%", height: "45%" }} />
				</S.IconBox>
			</S.IntroLayoutBox>
			<S.IntroLayoutBox>
				<S.IconBox className='icon-box' style={{ position: "relative" }}>
					<img
						src={realTimeChat1}
						alt='채팅아이콘'
						style={{ width: "53%", height: "20%", top: "15%", left: "10%" }}
					/>
					<img
						src={realTimeChat2}
						alt='채팅아이콘'
						style={{ width: "40%", height: "20%", top: "40%", left: "10%" }}
					/>
					<img
						src={realTimeChat3}
						alt='채팅아이콘'
						style={{ width: "34%", height: "20%", top: "70%", right: "10%" }}
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
