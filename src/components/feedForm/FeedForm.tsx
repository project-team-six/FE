import { useState } from "react";
import { useNavigate } from "react-router";
import { UseMutateFunction, useQueryClient } from "react-query";
import { feedDateType, feedInitialValue, feedTextType, feedType } from "../../types/feedType";
import { FeedImages } from "./feedImages/FeedImages";
import { FeedCategory } from "./feedCategory/FeedCategory";
import { FeedDay } from "./feedDay/FeedDay";
import { FeedInput } from "./feedInput/FeedInput";
import { editFeed } from "../../api/feedApi";
import { pushNotification } from "../../utils/notification";
import * as S from "./style";

const FeedForm = ({ initialValue, mutation, btnName, postId }: { initialValue: feedInitialValue, mutation?: UseMutateFunction<any, unknown, any, unknown>, btnName: string, postId?: number }) => {
	const navigate = useNavigate();

	// 제목, 원가, 가격, 내용
	const [textEntered, setTextEntered] = useState<feedTextType>({
		title: initialValue.title,
		content: initialValue.content,
		originPrice: initialValue.originPrice,
		price: initialValue.price,
	});

	// 이미지
	const [images, setImages] = useState<File[]>(initialValue.images);

	// 카테고리
	const [category, setCategory] = useState<string>(initialValue.category);

	// 거래 가능 날짜
	const [dateEntered, setDateEntered] = useState<feedDateType>({
		transactionStartDate: initialValue.transactionStartDate,
		transactionEndDate: initialValue.transactionEndDate,
		consumerPeriod: initialValue.consumerPeriod,
		purchaseDate: initialValue.purchaseDate,
	});

	// 주의사항 동의
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const editClient = useQueryClient();
	const handleClick = () => {
		if (isChecked && images && category) {
			let formData = new FormData();
			const newFeed: feedType = {
				title: textEntered.title,
				content: textEntered.content,
				category,
				originPrice: textEntered.originPrice,
				price: textEntered.price,
				transactionStartDate: dateEntered.transactionStartDate,
				transactionEndDate: dateEntered.transactionEndDate,
				consumerPeriod: dateEntered.consumerPeriod,
				purchaseDate: dateEntered.purchaseDate
			};
			formData.append("data", new Blob([JSON.stringify(newFeed)], { type: "application/json" }));
			images.map((img) => { // 이미지
				formData.append("file", img);
				return true;
			});

			if (mutation) mutation(formData); // 등록
			else if (postId) { // 수정
				editFeed(postId, formData).then(() => {
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
				<S.Span fontSize={20} fontWeight='400'>
					게시물 작성
				</S.Span>
				<S.Line />
			</S.TitleDiv>
			<FeedImages images={images} setImages={setImages} isEdit={isEdit} />
			<S.Line />
			<S.FormSection>
				<form>
					<section>
						<FeedInput label="제목" name="title" textEntered={textEntered} setTextEntered={setTextEntered} />
					</section>
					<section>
						<FeedInput label="원가" name="originPrice" textEntered={textEntered} setTextEntered={setTextEntered}  />
					</section>
					<section>
						<FeedInput label="가격" name="price" textEntered={textEntered} setTextEntered={setTextEntered}  />
					</section>
					<section>
						<S.CategoryDiv>
							<S.CategoryLabel>카테고리</S.CategoryLabel>
							<FeedCategory category={category} setCategory={setCategory} />
						</S.CategoryDiv>
						<S.Line />
					</section>
					<section>
						<FeedDay label="거래 가능 날짜" name="dealable" range={true} dateEntered={dateEntered} setDateEntered={setDateEntered}/>
					</section>
						<FeedDay label="소비기한" name="consumerPeriod" range={false} dateEntered={dateEntered} setDateEntered={setDateEntered}/>
					<section>
						<FeedDay label="제품 구매 날짜" name="purchase" range={false} dateEntered={dateEntered} setDateEntered={setDateEntered}/>
					</section>
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
						<FeedInput label="내용" name="content" textEntered={textEntered} setTextEntered={setTextEntered}  />
					</section>
					<section>
						<S.PrecautionContentWrapper>
							<S.PrecautionsLabel>주의사항</S.PrecautionsLabel>
							<S.ContentWrapper>
								<S.PrecautionsDiv>
									<span>
										1. 상품 정보와 사진이 일치하는지 확인 부탁드립니다. <br />
										2. 안전한 결제 방법을 사용해 주세요. <br />
										3. 개인 정보 보호에 신경 써주시기 바랍니다. <br />
										4. 상품 올리기 전에 꼭 이용가이드를 읽어주세요. <br />
									</span>
								</S.PrecautionsDiv>
							</S.ContentWrapper>
						</S.PrecautionContentWrapper>
						<S.CheckboxDiv>
							<S.CheckboxLabel>동의</S.CheckboxLabel>
							<S.CheckboxInput type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
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