import React, { ChangeEvent, useRef, useState } from "react";
import { commentReport, postReport } from "../../api/feedApi";
import { pushNotification } from "../../utils/notification";
import * as S from "./style";
import { reportphoto } from "../../asstes/asstes";

const ReportModal = ({postId, reportHandler,commentId, isReportModalOpen, setIsReportModalOpen}: {postId: number; reportHandler: ()=>void, commentId?: number
    isReportModalOpen:any, setIsReportModalOpen: any}) => {
    const [selectedReason, setSelectedReason] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const reasons = {"성적인 콘텐츠": "SEXUAL_CONTENT", "폭력적 또는 괴롭힘": "BULLYING", "잘못된 정보": "MISINFORMATION", "스팸 또는 광고성 콘텐츠": "SPAM", "기타": "OTHER",
    };
    const imgRef = useRef<HTMLInputElement | null>(null);

    const handleReasonChange = (reason: string) => {
        setSelectedReason(reason);
    };
    const onImgUpdateHandler = () => {
        imgRef.current?.click();
    };
    const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
            let formData = new FormData();
            formData.append("file", files[0]);

            const reader = new FileReader();
            reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();

        // 신고 내용
        let reason = "";
        if (selectedReason === "기타") {
            const details = (
                document.querySelector(
                    "input[name='details']"
                ) as HTMLInputElement
            ).value;
            reason = details;
        } else reason = selectedReason;

        formData.append(
            "data",
            new Blob([JSON.stringify({ report: reason })], {
                type: "application/json",
            })
        );

        if (!selectedFile) {
            pushNotification("사진은 필수 항목입니다.", "error");
            return;  // 사진이 없으면 함수 종료
        } else{
            formData.append("file", selectedFile);
        }

        const reportPromise = commentId ? 
        commentReport(postId, commentId, formData) : 
        postReport(postId, formData);

        reportPromise.then(() => {
            setIsReportModalOpen(!isReportModalOpen);
            pushNotification("신고가 성공적으로 접수되었습니다.", "success");
        }).catch(error => {
            console.error(error);
            pushNotification("신고 접수 중 오류가 발생했습니다.", "error");
        });
    };

    return (
        <S.WrapperBox>
            <S.ModalForm onSubmit={handleSubmit}>
                <h2>신고사유</h2>
                <S.InputBox>
                    {Object.entries(reasons).map(([key, value], index) => (
                        <S.ReasonBox key={index}>
                            <input
                                type="radio"
                                name="reason"
                                id={`content${index}`}
                                onClick={() => handleReasonChange(value)}
                            />
                            <label htmlFor={`content${index}`}>{key}</label>
                        </S.ReasonBox>
                    ))}
                </S.InputBox>
                {selectedReason === "OTHER" ? (
                    <S.TextInput
                        type="text"
                        name="details"
                        placeholder="기타 신고사유를 기입해주세요."
                    />
                ) : (
                    <S.TextInput
                        type="text"
                        name="details"
                        placeholder="기타 신고사유를 기입해주세요."
                        disabled
                    />
                )}
                <div>
                    <S.ReportSpan>신고 사진</S.ReportSpan>
                    <S.UpdateBox onClick={onImgUpdateHandler}>
                        <input
                            type="file"
                            name="file"
                            onChange={onChangeHandler}
                            accept="image/jpg, image/png, image/jpeg, image/png"
                            ref={imgRef}
                        />
                        {previewUrl ? <img style={{width:"100px", height:"100px", objectFit:"cover"}} src={previewUrl} alt="미리보기" />
                        : (
                        <div style={{textAlign:"center"}}>
                            <img src={reportphoto} alt="사진 아이콘" />
                            <p>사진올리기</p>
                        </div>
                        )}
                        
                    </S.UpdateBox>
                </div>
                <S.ButtonBox>
                <S.ReportButton color="#d9d9d9" type="button" onClick={reportHandler}>취소</S.ReportButton>
                <S.ReportButton color="#4fbe9f" type="submit">신고</S.ReportButton>
                </S.ButtonBox>
            </S.ModalForm>
        </S.WrapperBox>
    );
};

export default ReportModal;
