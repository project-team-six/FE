import { useState } from "react";
import { useNavigate } from "react-router";
import { UseMutateFunction } from "react-query";
import { feedInitialValue, feedType } from "../../types/feedType";
import { FeedImages } from "./feedImages/FeedImages";
import { FeedCategory } from "./feedCategory/FeedCategory";
import { FeedDay } from "./feedDay/FeedDay";
import { FeedInput } from "./feedInput/FeedInput";
import { datetimeUtils } from "../../utils/datetimeUtils";

const FeedForm = ({initialValue, mutation, btnName}: {initialValue: feedInitialValue, mutation: UseMutateFunction<any, unknown, any, unknown>, btnName: string}) => {
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
  	const [dealableEndDate, setDealableEndDate] = useState<Date>(new Date(initialValue.transactionEndDate));  // 종료일 

    // 소비기한
    const [expirationDate, setExpirationDate] = useState(new Date(initialValue.consumerPeriod));

    // 구매 날짜 (필수)
    const [purchaseDate, setPurchaseDate] = useState(new Date(initialValue.purchaseDate));

    // 제목
    const [content, setContent] = useState<string>(initialValue.content);

    const navigate = useNavigate();
    const handleClick = () => {
        let formData = new FormData();
        const newFeed: feedType = {
            title,
            content,
            category,
            price,
            transactionStartDate: datetimeUtils(dealableStartDate),
            transactionEndDate: datetimeUtils(dealableEndDate),
            consumerPeriod: datetimeUtils(expirationDate),
            purchaseDate: datetimeUtils(purchaseDate)
        }
        formData.append("data", new Blob([JSON.stringify(newFeed)], { type: 'application/json' }));
        images.map((img) => { formData.append("file", img); }); // 이미지
        mutation(formData);
    };

    return (
        <div>
            <FeedImages images={images} setImages={setImages} />
            <section>
                <span>서울특별시 강남구 청담동</span>
            </section>
            <section>
                <form>
                    <FeedInput label="제목" value={title} setValue={setTitle}/>
                    <FeedInput label="가격" value={price} setValue={setPrice}/>
                    <div>
                        <label>카테고리</label>
                        <FeedCategory setCategory={setCategory}/>
                    </div>
                    <FeedDay label="거래 가능 날짜" range={true} startDate={dealableStartDate} setStartDate={setDealableStartDate} endDate={dealableEndDate} setEndDate={setDealableEndDate}/>
                    <FeedDay label="소비기한" range={false} startDate={expirationDate} setStartDate={setExpirationDate}/>
                    <FeedDay label="제품 구매 날짜" range={false} startDate={purchaseDate} setStartDate={setPurchaseDate}/>    
                    <FeedInput label="내용" value={content} setValue={setContent}/>
                    <button type="button" onClick={handleClick}>{btnName}</button>
                    <button type="button" onClick={() => navigate(-1)}>취소</button>
                </form>
            </section>
        </div>
    )
}

export default FeedForm;