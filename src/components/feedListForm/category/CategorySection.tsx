import { useSelector } from "react-redux";
import { j_locateIcon } from "../../../asstes/asstes";
import { RootState } from "../../../redux/config/configStore";
import { locationType } from "../../../types/feedType";
import * as S from "./style";

const CategorySection = ({
	category,
	bannerText,
	categoryURL,
	handleCategoryChange,
}: {
	category: string;
	bannerText: string;
	categoryURL: string;
	handleCategoryChange: (category: string) => void;
}) => {
	const userInfo = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken;
	});

	const temps = userInfo.location.split(" ");
	const address: locationType = {
		sido: temps[0],
		sigungu: temps[1],
		dong: temps[2],
	};

	const location = address.sido + " " + address.sigungu;

	return (
		<div>
			<S.CategoryBanner backgroundImage={`url(${categoryURL})`}>
				<S.Paragraph color="#eae0e0" $fontSize="18px" $fontWeight="500" $margin="0 0 0 190px">
					홈 {">"} 소분목록
				</S.Paragraph>
				<S.Paragraph color="white" $fontSize="40px" $fontWeight="bolder" $margin="80px 0 0 190px">
					{bannerText}
				</S.Paragraph>
				<S.Paragraph color="#f9d8d8" $fontSize="18px" $fontWeight="400" $margin="25px 0 50px 190px" style={{display:"flex", alignItems:"center"}}>
						<img src={j_locateIcon} alt="위치아이콘" style={{ width: "18px", height: "23px" }} />
						<span style={{fontSize:"18px", color:"#f9d8d8", marginLeft:"5px"}}>
					<strong style={{ fontWeight: "bold", fontSize: "18px", color: "white" }}>
						{" "}{location}
					</strong>
					의 {bannerText} 목록을 둘러보세요!
					</span>
				</S.Paragraph>
			</S.CategoryBanner>
			<S.CategoryChoice>
				<button onClick={() => handleCategoryChange("")} className={category === "" ? "active" : ""}>
					전체
				</button>
				<button
					onClick={() => handleCategoryChange("FRESH_FOOD")}
					className={category === "FRESH_FOOD" ? "active" : ""}>
					신선식품
				</button>
				<button
					onClick={() => handleCategoryChange("BEAUTY")}
					className={category === "BEAUTY" ? "active" : ""}>
					뷰티
				</button>
				<button
					onClick={() => handleCategoryChange("DAILY_NECESSITIES")}
					className={category === "DAILY_NECESSITIES" ? "active" : ""}>
					생필품
				</button>
				<button onClick={() => handleCategoryChange("ETC")} className={category === "ETC" ? "active" : ""}>
					기타
				</button>
			</S.CategoryChoice>
		</div>
	);
};

export default CategorySection;
