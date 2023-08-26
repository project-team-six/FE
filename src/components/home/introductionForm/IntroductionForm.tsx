import {
	bottle,
	carrot,
	carrrealTimeChat1,
	carrrealTimeChat2,
	carrrealTimeChat3,
	cleaner,
	socks,
} from "../../../asstes/asstes";
import * as S from "./style";

const IntroductionForm = () => {
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
				<S.IconBox>
					<img src={socks} alt='양말' />
					<img src={cleaner} alt='세제' />
					<img src={carrot} alt='당근' />
					<img src={bottle} alt='유리잔' />
				</S.IconBox>
			</S.IntroLayoutBox>
			<S.IntroLayoutBox>
				<S.IconBox>
					<img src={carrrealTimeChat1} alt='양말' />
					<img src={carrrealTimeChat2} alt='세제' />
					<img src={carrrealTimeChat3} alt='당근' />
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
