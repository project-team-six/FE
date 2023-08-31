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
import { feedLocationicon } from "../../asstes/asstes";
import FeedModal from "./feedModal/FeedModal";

const FeedForm = ({ initialValue, mutation, btnName, postId }: { initialValue: feedInitialValue, mutation?: UseMutateFunction<any, unknown, any, unknown>, btnName: string, postId?: number}) => {
	const navigate = useNavigate();

	// 안내 모달
	const [modalState, setModalState] = useState(true);

	// 제목, 원가, 가격, 내용
	const [textEntered, setTextEntered] = useState<feedTextType>({
		title: initialValue.title,
		content: initialValue.content,
		originPrice: initialValue.originPrice,
		price: initialValue.price,
	});

	// 이미지
	const [images, setImages] = useState<File[]>(initialValue.images); // 추가할 이미지 (등록/수정)
	const [deleteImages, setDeleteImages] = useState<string[]>([]); // 삭제할 이미지 (수정)

	// 카테고리
	const [category, setCategory] = useState<string>(initialValue.category);

	// 거래 가능 날짜
	const [dateEntered, setDateEntered] = useState<feedDateType>({
		transactionStartDate: initialValue.transactionStartDate,
		transactionEndDate: initialValue.transactionEndDate,
		consumerPeriod: initialValue.consumerPeriod,
		purchaseDate: initialValue.purchaseDate,
	});

	const editClient = useQueryClient();
	const handleClick = () => {
		const isAllValuesEmpty = Object.values(textEntered).every(value => value !== "");

		if (isAllValuesEmpty && (postId || images.length > 0) && category) {
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
				// DB에서 삭제할 이미지
				formData.append("delete", new Blob([JSON.stringify(deleteImages)], { type: "application/json" }));
				editFeed(postId, formData).then(() => {
					editClient.invalidateQueries(["detailFeed"]);
					navigate(`/feed/${postId}`); // 게시물 상세 페이지로 이동
				});
			}
		} else {
			pushNotification("필수 항목을 모두 입력해주세요.", "warning");
		}
	};
	
	return (
		<S.MainContentWrapper>
			{modalState && <FeedModal modalState={modalState} setModalState={setModalState} />}
			<S.Section>
				<S.Span fontSize={28} fontWeight="600">게시물 작성</S.Span>
			</S.Section>
			<S.Section>
				<div><S.Span fontSize={20} fontWeight="500">소분 물품 정보</S.Span ></div>
				<S.Line />
				<S.SectionDiv>
					<div><FeedImages images={images} setImages={setImages} previews={initialValue.previews} setDeleteImages={setDeleteImages}/></div>
				</S.SectionDiv>
				<S.SubLine />
				<S.InputDiv>
					<S.InputSection>
						<S.LabelDiv><S.Label>카테고리</S.Label></S.LabelDiv>
						<FeedCategory category={category} setCategory={setCategory} />
					</S.InputSection>
					<S.InputSection>
						<S.LabelDiv><S.Label>원가</S.Label></S.LabelDiv>
						<FeedInput name="originPrice" textEntered={textEntered} setTextEntered={setTextEntered} inputWidth={215} />
					</S.InputSection>
					<S.InputSection>
						<S.LabelDiv><S.Label>판매가격</S.Label></S.LabelDiv>
						<FeedInput name="price" textEntered={textEntered} setTextEntered={setTextEntered} inputWidth={215} />
					</S.InputSection>
					<S.InputSection>
						<S.LabelDiv><S.Label>제품 구매 날짜</S.Label></S.LabelDiv>
						<FeedDay name="purchase" range={false} dateEntered={dateEntered} setDateEntered={setDateEntered}/>
					</S.InputSection>
					<S.InputSection>
						<S.LabelDiv><S.Label>소비기한</S.Label></S.LabelDiv>
						<FeedDay name="consumerPeriod" range={false} dateEntered={dateEntered} setDateEntered={setDateEntered}/>
					</S.InputSection>
				</S.InputDiv>
				<div><S.Span fontSize={20} fontWeight="500">게시물 정보</S.Span ></div>
				<S.Line />
				<S.InputDiv>
					<S.InputSection>
						<S.LabelDiv><S.Label>거래 가능 날짜</S.Label></S.LabelDiv>
						<FeedDay name="dealable" range={true} dateEntered={dateEntered} setDateEntered={setDateEntered}/>
					</S.InputSection>
					<S.InputSection>
						<S.LabelDiv><S.Label>지역</S.Label></S.LabelDiv>
						<S.LocationDiv>
							<S.LocationIcon src={feedLocationicon} alt="위치"/>
							<S.LocationSpan>{initialValue.location}</S.LocationSpan>
						</S.LocationDiv>
					</S.InputSection>
					<S.InputSection>
						<S.LabelDiv><S.Label>제목</S.Label></S.LabelDiv>
						<FeedInput name="title" textEntered={textEntered} setTextEntered={setTextEntered} inputWidth={758}/>
					</S.InputSection>
					<S.InputSection>
						<S.LabelDiv><S.Label>내용</S.Label></S.LabelDiv>
						<FeedInput name="content" textEntered={textEntered} setTextEntered={setTextEntered} inputWidth={758} />
					</S.InputSection>
				</S.InputDiv>
				<S.ButtonDiv>
					<S.Button onClick={handleClick} color="FFFFFF" $backgroundColor="2BB673">{btnName}</S.Button>
					<S.Button onClick={() => navigate(-1)} color="FFFFFF" $backgroundColor="CDCDCD">취소</S.Button>
				</S.ButtonDiv>
			</S.Section>
		</S.MainContentWrapper>
	);
};

export default FeedForm;