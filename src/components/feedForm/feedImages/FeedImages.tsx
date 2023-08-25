import { ChangeEvent, useEffect, useState } from "react";
import * as S from "./style";
import { pushNotification } from "../../../utils/notification";
import { feedImageAddIcon, trashIcon } from "../../../asstes/asstes";

export const FeedImages = ({ images, setImages, previews, setDeleteImages}: { images: File[]; setImages: (images: File[]) => void, previews: string[], setDeleteImages: (images: string[]) => void}) => {
	const lengthRestriction = 5 - previews.length; // 추가할 수 있는 이미지의 개수
	const [imagePreviews, setImagePreviews] = useState<string[]>(previews); // 이미지 미리보기
	const [isMaxLen, setIsMaxLen] = useState<boolean>(false);
	const changeImages = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			let temps = [...images]; // 기존에 업로드한 이미지 정보 가져오기
			for (let i = 0; i < files.length; i++) {
				temps.push(files[i]); // 최근에 업로드한 이미지 넣기
			}

			if (temps.length > lengthRestriction) {
				// 업로드된 사진이 5개가 넘지 않도록 함.
				pushNotification("최대 5장만 업로드 할 수 있습니다.", "warning");
				temps = temps.slice(0, lengthRestriction);
			}
			setImages(temps); // state에 저장
		}
	};

	useEffect(() => {
		// 이미지 미리보기 저장
		const newImagePreviews: string[] = [...imagePreviews]; // 썸네일 이미지 임시 저장할 변수
		for (let i = 0; i < images.length; i++) {
			const reader = new FileReader();
			const file = images[i];
			reader.onload = (event: ProgressEvent<FileReader>) => {
				const dataURL = event.target?.result as string;
				newImagePreviews.push(dataURL);

				if (newImagePreviews.length === images.length) setImagePreviews(newImagePreviews);
			};
			reader.readAsDataURL(file);
		}
		if (images.length === 5) setIsMaxLen(true);
        else setIsMaxLen(false);
	}, [images]);

	// 이미지 삭제
	const [deleteUrls, setDeleteUrls] = useState<string[]>([]);
	const clickDeleteImgBtn = (index: number, url: string) => {
		const temps = [...images];
		temps.splice(index, 1);
		setImages(temps);

		// 이미지 미리보기에서도 삭제
		const previewtemps = [...imagePreviews];
		previewtemps.splice(index, 1);
		setImagePreviews(previewtemps);

		// DB에서도 이미지 삭제 (수정)
		const deleteTemps = [...deleteUrls];
		deleteTemps.push(url);
		setDeleteUrls(deleteTemps);
	};

	useEffect(() => {
		// DB에서도 이미지 삭제 (수정)
		setDeleteImages(deleteUrls);
	}, [deleteUrls]);

	return (
		<S.MainContentWrapper>
            <section>
                <span>소분 물품</span>
            </section>
            <S.ImageSection>
                {imagePreviews && imagePreviews.map((img, index) => {
                    return (
                        <div key={index}>
                            {imagePreviews[index] && (
                                <S.ImageContainer>
                                    <S.ImagePreviewWrapper>
                                        <S.PreviewImg src={imagePreviews[index]} alt={`Preview ${index}`} />
                                        <S.DeleteButtonDiv>
                                            <S.DeleteButton onClick={() => clickDeleteImgBtn(index, imagePreviews[index])}>
                                                <img src={trashIcon} alt="썸네일 삭제"/>
                                            </S.DeleteButton>
                                        </S.DeleteButtonDiv>
                                    </S.ImagePreviewWrapper>
                                </S.ImageContainer>
                            )}
                        </div>	
                    )
                    })}
                {isMaxLen ? <></> : 
                <S.ImageAddDiv>
                    <S.ImageLabel htmlFor='File'>
                        <img src={feedImageAddIcon} alt="사진 추가"/>
                        <S.ImageLabelSpan>사진 올리기</S.ImageLabelSpan>
                    </S.ImageLabel>
                    <S.ImageAddInput type='file' id='File' name='files' multiple onChange={changeImages} accept=".jpg, .jpeg, .png" />
                </S.ImageAddDiv>}
            </S.ImageSection>
        </S.MainContentWrapper>
	);
};