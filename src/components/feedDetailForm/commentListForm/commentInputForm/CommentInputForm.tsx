import { ChangeEvent, useState } from "react";
import * as S from "./style";
import { commentPostType } from "../../../../types/feedType";
import { pushNotification } from "../../../../utils/notification";
import { useMutation, useQueryClient } from "react-query";
import { postComment } from "../../../../api/feedApi";

const CommentInputForm = ({ postId }: { postId: number }) => {
	const [comment, setComment] = useState<string>(""); // 추가할 댓글 내용
	const handleChangeCommnet = (e: ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

	const queryClient = useQueryClient();
	const commentAddMutation = useMutation(postComment, {
		onSuccess: () => {
			queryClient.invalidateQueries(["comments"]); // 화면에 바로 반영하기 위해 query key 갱신
			setComment("");
		},
		onError: () => {
			pushNotification("로그인 후 이용해주세요.", "error");
		},
	});

	const handleClickCmtAddBtn = () => {
		if (comment.trim() !== "") {
			// 빈 문자열이 아닌 경우
			const newComment: commentPostType = {
				postId,
				commentContent: {
					content: comment,
				},
			};
			commentAddMutation.mutate(newComment);
		} else {
			// 빈 문자열인 경우
			pushNotification("댓글 내용을 입력해주세요.", "warning");
		}
	};

	// enter 눌렀을 때 관리 (입력된 내용이 있으면 댓글 등록)
	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault(); 
			if (comment.trim() !== "") handleClickCmtAddBtn();
		}
	};

	return (
		<section>
			<S.InputForm>
				<S.Input
					type='text'
					value={comment}
					onChange={handleChangeCommnet}
					placeholder='댓글을 입력해주세요.'
					onKeyPress={handleKeyPress}
				/>
				<S.InputButton type='button' onClick={handleClickCmtAddBtn}>
					등록
				</S.InputButton>
			</S.InputForm>
		</section>
	);
};

export default CommentInputForm;
