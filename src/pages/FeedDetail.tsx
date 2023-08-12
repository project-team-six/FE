import React, { useState } from "react";
import FeedDetailList from "../components/feedDetail/FeedDetailList";
import CommentList from "../components/feedDetail/CommentList";

const FeedDetail: React.FC = () => {

    const [closed, setClosed] = useState(false);
    const handleClose = () => {
        setClosed(true)
    }

    return (
        <article>
            <section>
                <FeedDetailList closed={closed} onClose={handleClose}/>
            </section>
            <section>
                <CommentList closed={closed}/>
            </section>
        </article>
    );
};

export default FeedDetail;
