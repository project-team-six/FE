import React, { ChangeEvent, useState } from "react";
import { getCommentList, postComment } from "../../api/detailAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config/configStore";
import { useParams } from "react-router";
import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from "react-query";
import { commentList } from "../../types/feedDetail";
import * as Comment from "./CommentStyle";
import { LayoutBox } from "../common/GlobalStyle";
import { pushNotification } from "../../utils/notification";

interface FeedDetailProps {
    closed: boolean;
}

const CommentList: React.FC<FeedDetailProps> = ({ closed }) => {
    const [comment, setComment] = useState("");
    const { id } = useParams();
    const postId = Number(id);
    const userId: number = useSelector((state: RootState) => {
        return state.tokenSlice.decodeToken.userId;
    });

    const { data: comm, isLoading } = useQuery(
        ["comm", postId],
        () => getCommentList(postId),
        { staleTime: 1000 * 60 * 3 }
    );

    console.log("commnet", comm);
//     const invalidateQueries = {
//         postId:"",
//         comment : "",
//         userId:number,
//     }
//     const queryClient = useQueryClient();
//     const submitComment = useMutation({postId, comment, userId}) => newCommentData(postId, comment, userId),
//     {
//         onSuccess: () => queryClient.invalidateQueries(["comm"]);
//     }, 
//     onError : (error) => {pushNotification('댓글 등록에 실패했습니다', "error");
// },
//       }
//       );

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
        console.log(comment);
    };

    return (
        <LayoutBox>
            {isLoading ? (
                <div>Loding...</div>
            ) : (
                <Comment.CommentBox>
                    <h1>댓글 {comm?.length}</h1>
                    <Comment.InputBox>
                        <input
                            type="text"
                            value={comment}
                            placeholder="댓글을 입력해주세요"
                            onChange={changeHandler}
                        />
                        <div>
                            <button
                                className="submitBtn"
                                // onClick={() => {
                                //     submitComment.mutate({});
                                // }}
                            >
                                댓글
                            </button>
                            <button>취소</button>
                        </div>
                    </Comment.InputBox>
                    {!closed && (
                        <section>
                            {comm?.map((comm: commentList, index: number) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <p>{comm.nickname}</p>
                                            <p>{comm.content}</p>
                                        </div>
                                        <div>
                                            {comm.createdAt}
                                            <span>
                                                <img
                                                    src={require("../../asstes/report_small.png")}
                                                    alt="신고 아이콘"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    )}
                </Comment.CommentBox>
            )}
        </LayoutBox>
    );
};
export default CommentList;
