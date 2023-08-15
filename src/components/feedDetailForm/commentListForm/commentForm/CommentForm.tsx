import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { convertTimeFormat } from "../../../../utils/convertTimeFormat";
import { commentDeleteType, commentEditType, commentType } from "../../../../types/feedType";
import { deleteComment, editComment } from "../../../../api/feedApi";
import { pushNotification } from "../../../../utils/notification";
import { RootState } from "../../../../redux/config/configStore";
import * as S from "./style";
import profileDefault from "../../../../asstes/profileImageDefault.png";
import trash from "../../../../asstes/trash.png"
import edit from "../../../../asstes/edit.png";
import {RiDeleteBack2Line} from "react-icons/ri";
import {BsCheckSquare} from "react-icons/bs";

const CommentForm = ({postId, comment, closed}: {postId: number, comment: commentType, closed: boolean}) => {
    const nickname: string = useSelector((state: RootState) => { // 사용자 닉네임
        return state.tokenSlice.decodeToken.nickname;
    });

    // 댓글 수정
    const editClient = useQueryClient();
    const [editCommentId, setEditCommentId] = useState<number>(0); // 수정 선택한 댓글 ID
    const [editContent, setEditContent] = useState<string>(""); // 수정된 댓글 내용
    const commentEditBtn = (commentId: string) => {
        const editCommentContent: commentEditType = {
            postId,
            commentId,
            commentContent: { content: editContent}
        };
        editComment(editCommentContent).then(() => {
            setEditCommentId(0);
            setEditContent("");
            editClient.invalidateQueries(["comments"]); 
        });
    };
    const editInput = <S.CommentEditInput type="text" value={editContent} onChange={(e: ChangeEvent<HTMLInputElement>) => setEditContent(e.target.value)}/>
    const editSelectBtn = () => { // 수정 선택한 경우
        setEditCommentId(comment.id);
        setEditContent(comment.content);
    };
    const editCancelBtn = () => { // 수정 선택하고 다시 취소하는 경우
        setEditCommentId(0);
        setEditContent("");
    };

    // 댓글 삭제
    const deleteClient = useQueryClient();
    const commentDeleteBtn = (commentId: string) => {
        const commentToDelete: commentDeleteType = {
            postId,
            commentId
        };
        deleteComment(commentToDelete).then(() => {
            pushNotification("댓글을 삭제했습니다", "success");
            deleteClient.invalidateQueries(["comments"]); 
        }).catch(() => {
            pushNotification("댓글 삭제를 실패했습니다", "error")
        });
    };

    return (
        <S.CommentLi>
            <S.CommentDiv>
                <S.CommentProfileImg src={comment.profileImageUrl ? comment.profileImageUrl : profileDefault} alt="프로필 이미지"/>
                <div>
                    <S.Span fontSize={15} fontWeight="700">{comment.nickname}</S.Span>
                    <S.Span fontSize={12} fontWeight="400">{convertTimeFormat(comment.createdAt)}</S.Span>
                    <S.CommentContentDiv>
                        {!closed && editCommentId === comment.id ? editInput : <span>{comment.content}</span>}
                    </S.CommentContentDiv>
                </div>
            </S.CommentDiv>
            {nickname !== comment.nickname ? 
            <></> 
            :
            <div>
                {closed ? <></>:
                <div>
                    {editCommentId === comment.id ? 
                    <div>
                        <S.IconButton onClick={() => commentEditBtn(comment.id.toString())}><BsCheckSquare size={20} style={{}}/></S.IconButton>
                        <S.IconButton onClick={editCancelBtn}><RiDeleteBack2Line size={20} style={{}}/></S.IconButton>
                    </div> : 
                    <div>
                        <S.IconButton onClick={editSelectBtn}><S.IconImg src={edit} alt="edit"/></S.IconButton>
                        <S.IconButton onClick={() => commentDeleteBtn(comment.id.toString())}><S.IconImg src={trash} alt="trash"/></S.IconButton>
                    </div>}
                </div>}
            </div>
            }
        </S.CommentLi>
    )
}

export default CommentForm;