import { useState } from "react";
import { useNavigate } from "react-router";
import { UseMutateFunction, useQueryClient } from "react-query";
import { feedInitialValue, feedType } from "../../types/feedType";
import { FeedImages } from "./feedImages/FeedImages";
import { FeedCategory } from "./feedCategory/FeedCategory";
import { FeedDay } from "./feedDay/FeedDay";
import { FeedInput } from "./feedInput/FeedInput";
import { datetimeUtils } from "../../utils/datetimeUtils";
import { editFeed } from "../../api/feedApi";
import { pushNotification } from "../../utils/notification";
import * as S from "./style";

const FeedForm = ({ initialValue, mutation, btnName, postId }: {
	initialValue: feedInitialValue;
	mutation?: UseMutateFunction<any, unknown, any, unknown>;
	btnName: string;
	postId?: number;
}) => {
	const navigate = useNavigate();

	// 이미지
	const [images, setImages] = useState<File[]>(initialValue.images);

	// 제목
	const [title, setTitle] = useState<string>(initialValue.title);

	// 카테고리
	const [category, setCategory] = useState<string>(initialValue.category);

	// 가격
	const [price, setPrice] = useState<string>(initialValue.price);

	// 거래 가능 날짜
	const [dealableStartDate, setDealableStartDate] = useState<Date>(new Date(initialValue.transactionStartDate)); // 시작일
	const [dealableEndDate, setDealableEndDate] = useState<Date>(new Date(initialValue.transactionEndDate)); // 종료일

	// 소비기한
	const [expirationDate, setExpirationDate] = useState(new Date(initialValue.consumerPeriod));

	// 구매 날짜 (필수)
	const [purchaseDate, setPurchaseDate] = useState(new Date(initialValue.purchaseDate));

	// 제목
	const [content, setContent] = useState<string>(initialValue.content);

	// 주의사항 동의
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const handleCheckboxChange = () => { setIsChecked(!isChecked); };

	const editClient = useQueryClient();
	const handleClick = () => {
		if (isChecked && images && title && category && price && content) { 
			let formData = new FormData();
			const newFeed: feedType = {
				title,
				content,
				category,
				price,
				transactionStartDate: datetimeUtils(dealableStartDate),
				transactionEndDate: datetimeUtils(dealableEndDate),
				consumerPeriod: datetimeUtils(expirationDate),
				purchaseDate: datetimeUtils(purchaseDate),
			};
			formData.append("data", new Blob([JSON.stringify(newFeed)], { type: "application/json" }));
			images.map((img) => { // 이미지
				formData.append("file", img);
				return true;
			});

			if (mutation) mutation(formData); // 등록
			else if (postId){ // 수정
				editFeed(postId, formData).then(() => {
					pushNotification("게시물 수정에 성공했습니다", "success");
					editClient.invalidateQueries(["detailFeed"]);
					navigate(`/feed/${postId}`); // 게시물 상세 페이지로 이동
				});
			} 
		} else {
			pushNotification("필수 항목을 모두 입력해주세요.", "warning");
		}
	};
	
	const isEdit = !mutation; // 수정 페이지 유무 저장
	return (
		<S.MainContentWrapper>
			<S.TitleDiv>
				<S.Span fontSize={20} fontWeight="400">게시물 작성</S.Span>
				<S.Line />
			</S.TitleDiv>
			<FeedImages images={images} setImages={setImages} isEdit={isEdit}/>
			<S.Line />
			<S.FormSection>
				<form>
					<section>
						<FeedInput label='제목' value={title} setValue={setTitle} />
						<S.Line />
					</section>
					<section>
						<FeedInput label='가격' value={price} setValue={setPrice} />
						<S.Line />
					</section>		
					<section>
						<S.CategoryDiv>
							<S.CategoryLabel>카테고리</S.CategoryLabel>
							<FeedCategory category={category} setCategory={setCategory} />
						</S.CategoryDiv>
						<S.Line />
					</section>
						<FeedDay
							label='거래 가능 날짜'
							range={true}
							startDate={dealableStartDate}
							setStartDate={setDealableStartDate}
							endDate={dealableEndDate}
							setEndDate={setDealableEndDate}
						/>
						<S.Line />	
					<section>
						<FeedDay
							label='소비기한'
							range={false}
							startDate={expirationDate}
							setStartDate={setExpirationDate}
						/>
						<S.Line />
					</section>
						<FeedDay
							label='제품 구매 날짜'
							range={false}
							startDate={purchaseDate}
							setStartDate={setPurchaseDate}
						/>
						<S.Line />
					<section>
						<S.ContentWrapper>
							<S.LocationLabel>지역</S.LocationLabel>
							<S.LocationDiv>
								<S.LocationSpan>{initialValue.location}</S.LocationSpan>
							</S.LocationDiv>
						</S.ContentWrapper>
						<S.Line />
					</section>
					<section>
						<FeedInput label='내용' value={content} setValue={setContent} />
						<S.Line />
					</section>
					<section>
						<S.PrecautionContentWrapper>
							<S.PrecautionsLabel>주의사항</S.PrecautionsLabel>
							<S.ContentWrapper>
								<S.PrecautionsDiv>
									<span>
									1. 상품 정보와 사진이 일치하는지 확인 부탁드립니다. <br/>
									2. 안전한 결제 방법을 사용해 주세요. <br/>
									3. 개인 정보 보호에 신경 써주시기 바랍니다. <br/>
									4. 상품 올리기 전에 꼭 이용가이드를 읽어주세요. <br/>
									</span>
								</S.PrecautionsDiv>
							</S.ContentWrapper>
						</S.PrecautionContentWrapper>
						<S.CheckboxDiv>
							<S.CheckboxLabel>동의</S.CheckboxLabel>
							<S.CheckboxInput type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
						</S.CheckboxDiv>
					</section>
					<S.ButtonSection>
						<S.Button type='button' onClick={handleClick}>{btnName}</S.Button>
						<S.Button type='button' onClick={() => navigate(-1)}>취소</S.Button>
					</S.ButtonSection>
				</form>
			</S.FormSection>
		</S.MainContentWrapper>
	);
};

export default FeedForm;