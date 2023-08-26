import  styled  from "styled-components";

export const CommentLi = styled.li`
	display: flex;
	margin-right: 25px;
	justify-content: space-between;
`;

export const CommentDiv = styled.div`
	display: flex;
`;

export const CommentProfileImg = styled.img`
	width: 50px;
	height: 50px;
	margin-right: 25px;
	margin-bottom: 25px;
	border-radius: 100px;
`;

type SpanProps = {
	fontSize: number;
	fontWeight: string;
};

export const Span = styled.span<SpanProps>`
	font-size: ${(props) => props.fontSize}px;
	font-weight: ${(props) => props.fontWeight};
	margin-right: 10px;
`;

export const CommentContentDiv = styled.div`
	margin-top: 10px;
`;

export const CommentEditInput = styled.input`
	width: 500px;
	height: 25px;
	border: 1px solid #7f7f7f;
`;

export const IconButton = styled.button`
	margin-top: 30px;
	cursor: pointer;
`;

export const IconImg = styled.img`
	width: 20px;
	height: 20px;
`;
