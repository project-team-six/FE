import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getListFeed } from "../../api/detailAPI";
import { useParams } from "react-router";
import * as FDSt from "./FeedDetailStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
interface FeedDetailProps{
    closed:boolean;
    onClose:()=>void;
}

const FeedDetailList: React.FC<FeedDetailProps> = ({closed, onClose}) => {
    const [SelectImage, setSelectImage] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const { id } = useParams();
    const postId = Number(id);
    const userId: Number = useSelector((state: RootState) => {
        return Number(state.tokenSlice.decodeToken.userId);
    });
    const profileImageUrl: string = useSelector((state: RootState) => {
        return (state.tokenSlice.decodeToken.profileImageUrl);
    });
    const { data: detailFeed, isLoading } = useQuery(
        ["detailFeed", postId],
        () => getListFeed(postId),
        { staleTime: 1000 * 60 * 3 }
    );
    console.log("detailFeed", detailFeed);
    const authId: Number = detailFeed?.userId;
    useEffect(() => {
        if (detailFeed && detailFeed.imageUrlList.length > 0) {
            setSelectImage(detailFeed.imageUrlList[0]);
        }
    }, [detailFeed]);

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
    
    return (
        <FDSt.LayoutBox>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <FDSt.DetailMain>
                    <FDSt.DetailTitle>
                        <div>
                            <h1>{detailFeed?.title}</h1>
                            <p>{detailFeed?.location}</p>
                        </div>
                        {userId === authId ? (
                        <FDSt.Auth>
                            <button>수정</button>
                            <button onClick={onClose}>마감</button>
                        </FDSt.Auth>
                        ) : (
                        <FDSt.NotAuth>
                        <button><img src={require(`../../asstes/chat.png`)} alt="채팅 아이콘" /></button>
                        <button><img src={require(`../../asstes/pin.png`)} alt="관심글 등록 아이콘" /></button>
                        <button><img src={require(`../../asstes/report.png`)} alt="신고 아이콘" /></button>
                        </FDSt.NotAuth>
                        )}
                    </FDSt.DetailTitle>
                    <FDSt.DetailUser>
                        <FDSt.UserProfile>
                        <div className="profile-img">
                            <img src={profileImageUrl} alt="profile"/>
                        </div>
                        <div>
                            <h1>{detailFeed.nickname}</h1>
                            <FDSt.Temperature>
                                <p>매너온도</p>
                                <div>
                                    <span
                                        style={{
                                            marginLeft: `${detailFeed.mannerTemperature-2}%`,
                                        }}
                                    >
                                        ▼{detailFeed.mannerTemperature}°C
                                    </span>
                                </div>
                                <FDSt.ProgressBar>
                                    <FDSt.Inner
                                        style={{
                                            width: `${detailFeed.mannerTemperature}%`,
                                        }}
                                    ></FDSt.Inner>
                                </FDSt.ProgressBar>
                            </FDSt.Temperature>
                        </div>
                        </FDSt.UserProfile>
                        <FDSt.Dates>
                        <div> 작성일 :
                            <span>{detailFeed?.createdAt.slice(0, 10)}</span>
                        </div>
                        <div> 수정일 :
                            <span>{detailFeed?.modifiedAt.slice(0, 10)}</span>
                        </div>
                        </FDSt.Dates>
                    </FDSt.DetailUser>
                        <FDSt.DetailList>
                            <div>
                                <img src={SelectImage} alt="선택된된 이미지" />
                                <FDSt.ImageList>
                                    
                                    <img src={require(`../../asstes/leftArrow.png`)} alt="왼쪽 화살표" onClick={moveLeft}/>
                                    {detailFeed.imageUrlList.map(
                                        (image: string, index: number) => {
                                            return (
                                                <img key={index} src={image} alt="업로드된 이미지" onClick={()=> {handleSelectImage(image,index)}} className={selectedImageIndex === index ? "selectedImage" : ""}/>
                                            );
                                        }
                                    )}
                                    <img src={require(`../../asstes/rightArrow.png`)} alt="오른쪽 화살표" onClick={moveRight}/>
                                    
                                </FDSt.ImageList>
                            </div>
                            <div>
                                <h2>{detailFeed.price} 원</h2>
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
                        </FDSt.DetailList>
                        <FDSt.DetailContent>
                            {detailFeed.content}
                            <p>
                            <span><strong>조회</strong> {detailFeed.views} </span>
                            <span><strong>관심</strong> {detailFeed.pined} </span>
                            </p>
                        </FDSt.DetailContent>
                </FDSt.DetailMain>
            )}
        </FDSt.LayoutBox>
    );
};

export default FeedDetailList;
