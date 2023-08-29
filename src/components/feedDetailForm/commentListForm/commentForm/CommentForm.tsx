import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { convertTimeFormat } from "../../../../utils/convertTimeFormat";
import {commentDeleteType,commentEditType,commentType,} from "../../../../types/feedType";
import { deleteComment, editComment } from "../../../../api/feedApi";
import { pushNotification } from "../../../../utils/notification";
import { RootState } from "../../../../redux/config/configStore";
import * as S from "./style";
import {profileImageDefault,reportred,moremenu,} from "../../../../asstes/asstes";

const CommentForm = ({postId,comment,closed,}: {postId: number; comment: commentType; closed: boolean;}) => {
    const nickname: string = useSelector((state: RootState) => {
        // 사용자 닉네임
        return state.tokenSlice.decodeToken.nickname;
    });

    // 댓글 수정
    const editClient = useQueryClient();
    const [editCommentId, setEditCommentId] = useState<number>(0); // 수정 선택한 댓글 ID
    const [editContent, setEditContent] = useState<string>(""); // 수정된 댓글 내용
    const [isOpen, setIsOpen] = useState(false); //수정 모달

    const commentEditBtn = (commentId: string) => {
        const editCommentContent: commentEditType = {
            postId, commentId, commentContent: { content: editContent },
        };
        editComment(editCommentContent).then(() => {
            setEditCommentId(0);
            setEditContent("");
            editClient.invalidateQueries(["comments"]);
        });
    };
    const editInput = (
        <S.CommentEditInput
            type="text"
            value={editContent}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditContent(e.target.value)
            }
        />
    );
    const editSelectBtn = () => {
        // 수정 선택한 경우
        setEditCommentId(comment.id);
        setEditContent(comment.content);
        setIsOpen(false);
    };
    const editCancelBtn = () => {
        // 수정 선택하고 다시 취소하는 경우
        setEditCommentId(0);
        setEditContent("");
        setIsOpen(false);
    };

    // 댓글 삭제
    const deleteClient = useQueryClient();
    const commentDeleteBtn = (commentId: string) => {
        const commentToDelete: commentDeleteType = {
            postId,
            commentId,
        };
        deleteComment(commentToDelete)
            .then(() => {
                deleteClient.invalidateQueries(["comments"]);
            })
            .catch(() => {
                pushNotification("댓글 삭제를 실패했습니다", "error");
            });
    };

    return (
        <S.CommentLi>
            <S.CommentDiv>
                <S.CommentProfileImg
                    src={
                        comment.profileImageUrl
                            ? comment.profileImageUrl
                            : profileImageDefault
                    }
                    alt="프로필 이미지"
                />
                <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <S.Span fontSize={20} fontWeight="700">{comment.nickname}</S.Span>
                        <S.Span fontSize={16} fontWeight="400">{convertTimeFormat(comment.createdAt)}</S.Span>
                        <S.ReportSpan><img src={reportred} alt="신고아이콘" /> 신고하기</S.ReportSpan>
                    </div>
                    <S.CommentContentDiv>
                        {!closed && editCommentId === comment.id ? (
                            editInput
                        ) : (
                            <span>{comment.content}</span>
                        )}
                    </S.CommentContentDiv>
                </div>
            </S.CommentDiv>
            {nickname !== comment.nickname ? (
                <></>
            ) : (
                <div>
                    {closed ? (
                        <></>
                    ) : (
                        <div>
                            {editCommentId === comment.id ? (
                                <div>
                                    <S.IconButton onClick={() =>commentEditBtn(comment.id.toString())} color="#2BB673">수정</S.IconButton>
                                    <S.IconButton onClick={editCancelBtn} color="#ccc">취소</S.IconButton>
                                </div>
                            ) : (
                                <S.ModalWrapper>
                                    <S.EditButton onClick={() => setIsOpen(!isOpen)} color="#fff">
                                        <img src={moremenu} alt="수정 메뉴" />
                                    </S.EditButton>
                                    {isOpen && (
                                        <S.EditModal>
                                            <S.ModalButton onClick={editSelectBtn}> 수정하기 </S.ModalButton>
                                            <S.ModalButton onClick={() => commentDeleteBtn( comment.id.toString())}>삭제하기</S.ModalButton>
                                        </S.EditModal>
                                    )}
                                </S.ModalWrapper>
                            )}
                        </div>
                    )}
                </div>
            )}
        </S.CommentLi>
    );
};

export default CommentForm;
