import React from "react";
import * as MySt from './MypageStyle'
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Post } from "../../types/mypage";


interface PostListProps {
    posts: Post[];
    navigate:(url:string)=> void;
}

const PostList:React.FC<PostListProps> = ({posts, navigate}) => {
    return (
        <MySt.List>
            {posts.length === 0 ? (
                <p>아직 작성된 글이 없습니다.</p>
            ) : (
                <div className="list-wrapper">
                    {posts.map(
                        (posts: Post, index: number) => {
                            const createdAt = new Date(posts.createdAt);
                            return (
                                <div key={index} onClick={() => navigate(`/feed/${posts.id}`)} >
                                    <img src={posts.imageUrlList} alt="등록한 게시물 이미지" />
                                    <MySt.PostContent>
                                        <MySt.ContentHead>
                                            <span>{posts.location}</span>
                                            <span className="day">
                                                {formatDistanceToNow(createdAt, {addSuffix: true, locale: ko})}
                                            </span>
                                        </MySt.ContentHead>
                                        <h4>{posts.title}</h4>
                                        <p>
                                            {posts.content.length > 35
                                                ? `${posts.content.slice(0, 34)}...`
                                                : posts.content}
                                        </p>
                                        <h4>{posts.price} </h4>
                                    </MySt.PostContent>
                                </div>
                            );
                        }
                    )}
                </div>
            )}
        </MySt.List>
    );
};

export default PostList;
