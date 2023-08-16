import { useParams } from "react-router";
import { useQuery } from "react-query";
import { feedInitialValue } from "../types/feedType";
import { fetchFeed } from "../api/feedApi";
import FeedForm from "../components/feedForm/FeedForm";

const FeedEdit = () => {
	const { id } = useParams();
	const postId = Number(id);
	const { data: detailFeed, isLoading, isError } = useQuery( ["detailFeed", postId], () => fetchFeed(postId) );
	
	if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;

	const initialValue: feedInitialValue = {
		title: detailFeed.title,
		content: detailFeed.content,
		category: detailFeed.category,
		price: detailFeed.price,
		transactionStartDate: detailFeed.transactionStartDate,
		transactionEndDate: detailFeed.transactionEndDate,
		consumerPeriod: detailFeed.consumerPeriod,
		purchaseDate: detailFeed.purchaseDate,
		location: detailFeed.location,
		images: [],
	};

	return <FeedForm initialValue={initialValue} btnName='수정하기' postId={postId}/>;
};

export default FeedEdit;