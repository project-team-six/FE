import { useState } from "react";
import FeedDetailList from "../components/feedDetailForm/feedDetailForm/FeedDetailList";
import CommentList from "../components/feedDetailForm/commentListForm/CommentList";

const FeedDetail: React.FC = () => {
    const [closed, setClosed] = useState(false);

    return (
        <article style={{maxWidth:"1980px", borderTop: "1px solid #d9d9d9"}}>
            <section>
                <FeedDetailList closed={closed} onClose={setClosed}/>
            </section>
            <section>
                <CommentList closed={closed}/>
            </section>
        </article>
    );
};

export default FeedDetail;