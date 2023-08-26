import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Post } from "../../types/mypage";
import * as S from './MypageStyle'


interface PostListProps {
    posts: Post[];
    navigate:(url:string)=> void;
    messege : string;
}

const PostList:React.FC<PostListProps> = ({posts, navigate, messege}) => {
    return (
        <S.Post>
            {posts?.length === 0 ? (
                <div>
                <h1>{messege}</h1>
                <button></button>
                </div>
            ) : (
                <S.ListWrapper className="list-wrapper">
                    {posts?.map(
                        (posts: Post, index: number) => {
                            const createdAt = new Date(posts.createdAt);
                            return (
                                <S.Feed key={index} onClick={() => navigate(`/feed/${posts.id}`)} >
                                    <img src={posts.imageUrlList} alt="등록한 게시물 이미지" />
                                    <div>
                                        
                                        <h4>{posts.title}</h4>
                                        <p>
                                            {posts.content.length > 35
                                                ? `${posts.content.slice(0, 34)}...`
                                                : posts.content}
                                        </p>
                                        <h4>{posts.price} </h4>
                                        <div>
                                            <span>{posts.location} | </span>
                                            <span className="day">
                                                {formatDistanceToNow(createdAt, {addSuffix: true, locale: ko})}
                                            </span>
                                        </div>
                                    </div>
                                </S.Feed>
                            );
                        }
                    )}
                </S.ListWrapper>
            )}
        </S.Post>
    );
};

export default PostList;
