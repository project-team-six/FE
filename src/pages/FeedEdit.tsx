import { feedInitialValue } from "../types/feedType";
import FeedForm from "../components/feedForm/FeedForm";

const FeedEdit = () => {
    const initialValue: feedInitialValue = {
        title: "",
        content: "",
        category: "",
        price: "",
        transactionStartDate: "2023-07-24",
        transactionEndDate: "2023-07-24",
        consumerPeriod: "2023-07-24",
        purchaseDate: "2023-07-24",
        images: []
    };

    return <FeedForm initialValue={initialValue} btnName="수정하기"/>
}

export default FeedEdit;