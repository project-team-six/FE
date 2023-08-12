import React from "react";
import FeedDetailList from "../components/feedDetail/FeedDetailList";
import CommentList from "../components/feedDetail/CommentList";

const FeedDetail: React.FC = () => {
    return (
        <article>
            <section>
                <FeedDetailList />
            </section>
            <section>
                <CommentList />
            </section>
        </article>
    );
};

export default FeedDetail;
