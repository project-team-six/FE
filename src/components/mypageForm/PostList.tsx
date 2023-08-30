import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Post } from "../../types/mypage";
import * as S from "./MypageStyle";
import { priceUtils } from "../../utils/priceUtils";

interface PostListProps {
    posts: Post[];
    navigate: (url: string) => void;
    messege: string;
    btnMessege: string;
}

const PostList: React.FC<PostListProps> = ({
    posts,
    navigate,
    messege,
    btnMessege,
}) => {
    return (
        <S.Post>
            {posts?.length === 0 ? (
                <S.NonPost>
                    <h1>{messege}</h1>
                    <button
                        onClick={() => {
                            navigate("/feedlist");
                        }}
                    >
                        {btnMessege}
                    </button>
                </S.NonPost>
            ) : (
                <S.ListWrapper>
                    {posts?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((posts: Post, index: number) => {
                        const createdAt = new Date(posts.createdAt);
                        return (
                            <S.Feed
                                key={index}
                                onClick={() => navigate(`/feed/${posts.id}`)}
                            >
                                <img
                                    src={posts.imageUrlList}
                                    alt="등록한 게시물 이미지"
                                />
                                <div>
                                    <h4>{posts.title}</h4>
                                    <h4>{priceUtils(posts.price)} </h4>
                                    <div>
                                        <span>{posts.location} | </span>
                                        <span className="day">
                                            {formatDistanceToNow(createdAt, {
                                                addSuffix: true,
                                                locale: ko,
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </S.Feed>
                        );
                    })}
                </S.ListWrapper>
            )}
        </S.Post>
    );
};

export default PostList;
