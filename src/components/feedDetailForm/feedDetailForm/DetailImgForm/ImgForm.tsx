import React, { useState } from "react";
import * as S from "./style";
import { leftArrow, rightArrow } from "../../../../asstes/asstes";

interface ImgFormProps {
    detailFeed: { imageUrlList: string[] };
}

const ImgForm: React.FC<ImgFormProps> = ({
    detailFeed,
}) => {
    const [SelectImage, setSelectImage] = useState(detailFeed.imageUrlList[0]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    //이미지 캐러셀
    const handleSelectImage = (image: string, index: number) => {
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
        <S.Image>
            <S.SelectImgWrapper>
                <img src={SelectImage} alt="선택된 이미지" />
            </S.SelectImgWrapper>
            <S.ImageList>
                <S.ArrowImg
                    src={leftArrow}
                    alt="왼쪽 화살표"
                    onClick={moveLeft}
                />
                {detailFeed?.imageUrlList.map(
                    (image: string, index: number) => {
                        return (
                            <S.PreviewImg
                                key={index}
                                src={image}
                                alt="업로드된 이미지"
                                onClick={() => {
                                    handleSelectImage(image, index);
                                }}
                                className={
                                    selectedImageIndex === index
                                        ? "selectedImage"
                                        : ""
                                }
                            />
                        );
                    }
                )}
                <S.ArrowImg
                    src={rightArrow}
                    alt="오른쪽 화살표"
                    onClick={moveRight}
                />
            </S.ImageList>
        </S.Image>
    );
};

export default ImgForm;
