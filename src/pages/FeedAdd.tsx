import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { feedType } from "../types/feedType";
import { postFeed } from "../api/feedApi";
import { FeedImages } from "../components/feedAdd/feedImages/FeedImages";
import { FeedCategory } from "../components/feedAdd/feedCategory/FeedCategory";
import { FeedDay } from "../components/feedAdd/feedDay/FeedDay";

const FeedAdd = () => {
    const [images, setImages] = useState<File[]>([]); // 이미지

    const [title, setTitle] = useState<string>(""); // 제목
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    const [category, setCategory] = useState<string>(""); // 카테고리

    const [dealableStartDate, setDealableStartDate] = useState<Date>(new Date()); // 거래 가능 날짜 시작일
  	const [dealableEndDate, setDealableEndDate] = useState<Date>(new Date());  // 거래 가능 날짜 종료일 

    const [expirationDate, setExpirationDate] = useState(new Date()); // 소비기한

    const [purchaseDate, setPurchaseDate] = useState(new Date()); // 구매 날짜 (필수)

    const [content, setContent] = useState<string>("");
    const changeContent = (e: ChangeEvent<HTMLInputElement>) => { setContent(e.target.value); };

    const navigate = useNavigate();
    const feedAddMutation = useMutation(postFeed, {
        onSuccess: (data) => {
            alert("게시물 등록에 성공했습니다.");
            // navigate(-1);
        },
        onError: (error) => {
            alert("게시물 등록에 실패했습니다.");
        },
    });

    const clickFeedAddBtn = () => {
        let formData = new FormData();
        const newFeed: feedType = {
            title,
            content,
            // category,
            transactionStartDate: dealableStartDate.toISOString(),
            transactionEndDate: dealableEndDate.toISOString(),
            consumerPeriod: expirationDate.toISOString(),
            purchaseDate: purchaseDate.toISOString()
        }
        formData.append("data", new Blob([JSON.stringify(newFeed)], { type: 'application/json' }));
        images.map((img) => { formData.append("file", img); }); // 이미지
        feedAddMutation.mutate(formData);
    };

    return (
        <div>
            <FeedImages images={images} setImages={setImages} />
            <section>
                <span>서울특별시 강남구 청담동</span>
            </section>
            <section>
                <form>
                    <div>
                        <label>제목</label>
                        <input type="text" required value={title} onChange={changeTitle} placeholder="제목을 입력해주세요."/>
                    </div>
                    <div>
                        <label>카테고리</label>
                        <FeedCategory setCategory={setCategory}/>
                    </div>
                    <FeedDay label="거래 가능 날짜" range={true} startDate={dealableStartDate} setStartDate={setDealableStartDate} endDate={dealableEndDate} setEndDate={setDealableEndDate}/>
                    <FeedDay label="소비기한" range={false} startDate={expirationDate} setStartDate={setExpirationDate}/>
                    <FeedDay label="제품 구매 날짜" range={false} startDate={purchaseDate} setStartDate={setPurchaseDate}/>    
                    <div>
                        <label>내용</label>
                        <input type="text" required value={content} onChange={changeContent} placeholder="내용을 입력해주세요."/>
                    </div>
                    <button type="button" onClick={clickFeedAddBtn}>등록하기</button>
                    <button type="button" onClick={() => navigate(-1)}>취소</button>
                </form>
            </section>
        </div>
    )
}

export default FeedAdd;