import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deadlineFeed, fetchListFeed } from "../../../api/feedApi";
import { useParams } from "react-router";
import UserInfo from "../../mypage/UserInfo";
import * as S from "./style";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/config/configStore";
import { pushNotification } from "../../../utils/notification";

interface FeedDetailProps{
    closed: boolean;
    onClose: (value: boolean)=> void;
}

const FeedDetailList: React.FC<FeedDetailProps> = ({closed, onClose}) => {
    const [SelectImage, setSelectImage] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const { id } = useParams();
    const postId = Number(id);
    const userId: Number = useSelector((state: RootState) => {
        return Number(state.tokenSlice.decodeToken.userId);
    });
    const { data: detailFeed, isLoading, isError } = useQuery(
        ["detailFeed", postId],
        () => fetchListFeed(postId),
        { staleTime: 1000 * 60 * 3 }
    );

    const authId: Number = detailFeed?.userId;
    useEffect(() => {
        if (detailFeed && detailFeed.imageUrlList.length > 0) {
            setSelectImage(detailFeed.imageUrlList[0]);
        }
    }, [detailFeed]);

    // 마감
    const closedClient = useQueryClient();
    const closedMutation = useMutation(deadlineFeed, {
		onSuccess: () => {
			pushNotification("게시물이 마감되었습니다.", "success");
            closedClient.invalidateQueries(["detailFeed"]); 
		},
		onError: () => {
			pushNotification("게시물 마감을 실패했습니다.", "error");
		},
	});

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

    const handleSelectImage = (image: string, index:number) => {
        setSelectImage(image);
        setSelectedImageIndex(index);
    };

    const moveLeft = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
            setSelectImage(detailFeed.imageUrlList[selectedImageIndex - 1]);
        }
    };

    const moveRight = () => {
        if (selectedImageIndex < detailFeed.imageUrlList.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
            setSelectImage(detailFeed.imageUrlList[selectedImageIndex + 1]);
        }
    };

    // 마감    
    onClose(detailFeed.isComplete);
    const handleCloseClick = () => {
        onClose(true);
        closedMutation.mutate(postId); // 서버에도 반영
    };

    return (
        <S.LayoutBox>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <S.DetailMain>
                    <S.DetailTitle>
                        <div>
                            <h1>{detailFeed?.title}</h1>
                            <p>{detailFeed?.location}</p>
                        </div>
                        {closed ? <></> : 
                        <div>
                            {userId === authId ? (
                            <S.Auth>
                                <button>수정</button>
                                <button onClick={handleCloseClick}>마감</button>
                            </S.Auth>
                            ) : (
                            <S.NotAuth>
                            <button><img src={require(`../../../asstes/chat.png`)} alt="채팅 아이콘" /></button>
                            <button><img src={require(`../../../asstes/pin.png`)} alt="관심글 등록 아이콘" /></button>
                            <button><img src={require(`../../../asstes/report.png`)} alt="신고 아이콘" /></button>
                            </S.NotAuth>
                            )}
                        </div>}
                    </S.DetailTitle>
                    <S.DetailUser>
                        <div>
                            <UserInfo />
                        </div>
                        <div> 작성일 :
                            <span>{detailFeed?.createdAt.slice(0, 10)}</span>
                        </div>
                    </S.DetailUser>
                        <S.DetailList>
                            <div>
                                <img src={SelectImage} alt="선택된된 이미지" />
                                <S.ImageList>
                                    
                                    <img src={require(`../../../asstes/leftArrow.png`)} alt="왼쪽 화살표" onClick={moveLeft}/>
                                    {detailFeed?.imageUrlList.map(
                                        (image: string, index: number) => {
                                            return (
                                                <img key={index} src={image} alt="업로드된 이미지" onClick={()=> {handleSelectImage(image,index)}} className={selectedImageIndex === index ? "selectedImage" : ""}/>
                                            );
                                        }
                                    )}
                                    <img src={require(`../../../asstes/rightArrow.png`)} alt="오른쪽 화살표" onClick={moveRight}/>
                                    
                                </S.ImageList>
                            </div>
                            <div>
                                <h2>{detailFeed?.price} 원</h2>
                                <p>
                                    거래가능날짜 : 
                                    {detailFeed.transactionStartDate} -
                                    {detailFeed.transactionEndDate}
                                </p>
                                <p>유통기한 <span>: {detailFeed.consumerPeriod}</span>
                                </p>
                                <p>구매날짜 <span> : {detailFeed.purchaseDate}</span>
                                </p>
                            </div>
                        </S.DetailList>
                        <S.DetailContent>
                            {detailFeed.content}
                            <p>
                            <span><strong>조회</strong> {detailFeed.views} </span>
                            <span><strong>관심</strong> {detailFeed.pined} </span>
                            </p>
                        </S.DetailContent>
                </S.DetailMain>
            )}
        </S.LayoutBox>
    );
};

export default FeedDetailList;