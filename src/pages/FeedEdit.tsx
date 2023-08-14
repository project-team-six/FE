import { feedInitialValue } from "../types/feedType";
import FeedForm from "../components/feedForm/FeedForm";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { getListFeed } from "../api/detailAPI";

const FeedEdit = () => {
	const { id } = useParams();
	const { data: detailFeed, isLoading, isError } = useQuery(
        ["detailFeed", id],
        () => getListFeed(Number(id)),
        { staleTime: 1000 * 60 * 3 }
    );

	if (isLoading) return <div>Loading</div>;
	if (isError) return <div>error</div>;

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
	return <FeedForm initialValue={initialValue} btnName='수정하기' feedId={`${id}`}/>;
};

export default FeedEdit;