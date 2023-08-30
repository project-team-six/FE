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
	return (
		<div>
			<S.CategoryBanner style={{ backgroundImage: `url(${categoryURL})` }}>
				<S.Paragraph color='#eae0e0' $fontSize='18px' $fontWeight='500' $margin='0 0 0 190px'>
					홈 {">"} 소분목록
				</S.Paragraph>
				<S.Paragraph color='white' $fontSize='40px' $fontWeight='bolder' $margin='80px 0 0 190px'>
					{bannerText}
				</S.Paragraph>
				<S.Paragraph color='white' $fontSize='18px' $fontWeight='500' $margin='25px 0 50px 190px'>
					카테고리별로 소분하거나 소분을 받아보세요!
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
