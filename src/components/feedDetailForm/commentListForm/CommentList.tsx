import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { commentType } from "../../../types/feedType";
import { fetchComments } from "../../../api/feedApi";
import * as S from "./style";
import CommentInputForm from "./commentInputForm/CommentInputForm";
import CommentForm from "./commentForm/CommentForm";
import Loading from "../../common/Loading";

interface FeedDetailProps {
	closed: boolean;
}

const CommentList: React.FC<FeedDetailProps> = ({ closed }) => {
	const { id } = useParams(); // 게시물 ID
	const postId = Number(id);

	// 댓글 전체 조회
	const {
		data: comments,
		isLoading,
		isError,
	} = useQuery(["comments"], () => {
		return fetchComments(postId);
	});
	const [isView, setIsView] = useState<boolean>(false);
	const handleClickView = () => {
		setIsView(true);
	};

	if (isLoading)
		return (
			<div>
				<Loading />
			</div>
		);
	if (isError) return <div>Error...</div>;

	const results = isView ? comments : comments.slice(0, 3); // 댓글 목록
	return (
		<S.CommentBox>
			<S.CommentArticle>
				<S.SpanDiv>
					<S.Span>댓글 {comments.length}</S.Span>
				</S.SpanDiv>
				{closed ? <></> : <CommentInputForm postId={postId} />}
				<section>
					<ul>
						{results.map((com: commentType) => {
							return (
								<div key={com.id}>
									<CommentForm postId={postId} comment={com} closed={closed} />
								</div>
							);
						})}
					</ul>
					{isView ? (
						<></>
					) : (
						<S.ViewDiv>
							<S.ViewButton onClick={handleClickView}>댓글 전체보기</S.ViewButton>
						</S.ViewDiv>
					)}
				</section>
			</S.CommentArticle>
		</S.CommentBox>
	);
};
export default CommentList;
