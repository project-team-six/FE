import { illustration1, illustration2, illustration3, recycle } from "../../../asstes/asstes";
import * as S from "./style";

const ServiceGuideForm = () => {
	return (
		<S.GuideSection style={{ position: "relative" }}>
			<p style={{ color: "white", fontSize: "40px", fontWeight: "bold", position: "absolute", top: "70px" }}>
				이용방법
			</p>
			<S.StepGuideBox>
				<S.IconCircleBox>
					<img src={illustration1} alt='일러스트1' style={{ width: "60%", height: "60%" }} />
				</S.IconCircleBox>
				<S.TextBox>로그인 후 살고계신 지역을 설정해주세요.</S.TextBox>
			</S.StepGuideBox>
			<img src={recycle} alt='화살표' />
			<S.StepGuideBox>
				<S.IconCircleBox>
					<img src={illustration2} alt='일러스트2' style={{ width: "50%", height: "70%" }} />
				</S.IconCircleBox>
				<S.TextBox>
					소분하고싶은 물품을
					<br />
					등록해주세요.
				</S.TextBox>
			</S.StepGuideBox>
			<img src={recycle} alt='화살표' />
			<S.StepGuideBox>
				<S.IconCircleBox>
					<img src={illustration3} alt='일러스트3' style={{ width: "50%", height: "70%" }} />
				</S.IconCircleBox>
				<S.TextBox>
					소통을 통해 거래날짜와
					<br />
					거래장소를 정해주세요.
				</S.TextBox>
			</S.StepGuideBox>
		</S.GuideSection>
	);
};

export default ServiceGuideForm;
