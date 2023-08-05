import { ChangeEvent, useEffect, useState } from "react";
import * as S from "./style";

export const FeedImages = ({ images, setImages }: { images: File[], setImages: (images: File[]) => void }) => {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // 이미지 미리보기
    const changeImages = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            let temps = [...images]; // 기존에 업로드한 이미지 정보 가져오기
            for (let i=0; i < files.length; i++) {
                temps.push(files[i]); // 최근에 업로드한 이미지 넣기
            }

            if (temps.length > 5) { // 업로드된 사진이 5개가 넘지 않도록 함.
                alert("최대 5장만 업로드 할 수 있습니다.");
                temps = temps.slice(0, 5);
            }
            setImages(temps); // state에 저장
        }
    };

    useEffect(() => { // 이미지 미리보기 저장
        const newImagePreviews: string[] = []; // 썸네일 이미지 임시 저장할 변수
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
    }, [images]);

    // 이미지 삭제
    const clickDeleteImgBtn = (index: number) => {
        const temps = [...images];
        temps.splice(index, 1);
        setImages(temps);

        // 이미지 미리보기에서도 삭제
        const tt = [...imagePreviews];
        tt.splice(index, 1);
        setImagePreviews(tt)
    };

    return (
        <section>
            <S.InputDiv>
                <S.InputSpan fontSize={18} fontWeight="700">사진을 추가해주세요.</S.InputSpan>
                <S.InputSpan fontSize={14} fontWeight="500">최대 5장까지 올릴 수 있어요.</S.InputSpan>
                <S.Label htmlFor="File">PC에서 불러오기</S.Label>
                <S.Input
                    type="file"
                    id="File"
                    name="files"
                    multiple
                    onChange={changeImages}
                />
            </S.InputDiv>
            {imagePreviews.map((img, index) => {
                return (
                    <div key={index}>
                    {imagePreviews[index] && (
                        <div>
                        <S.PreviewImg src={imagePreviews[index]} alt={`Preview ${index}`} />
                        <button onClick={() => clickDeleteImgBtn(index)}>x</button>
                        </div>
                    )}
                    </div>
                )
            })}
        </section>
  )
}