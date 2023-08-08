import { feedInitialValue } from "../types/feedType";
import FeedForm from "../components/feedForm/FeedForm";
import { useMutation } from "react-query";
import { editFeed } from "../api/feedApi";
import { useNavigate } from "react-router";
import { pushNotification } from "../utils/notification";

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
		images: [],
	};

	const navigate = useNavigate();
	const feedEditMutation = useMutation(editFeed, {
		onSuccess: (data) => {
			pushNotification("게시물 등록에 성공했습니다", "success");
			// navigate(-1);
		},
		onError: (error) => {
			pushNotification("게시물 등록에 실패했습니다", "error");
		},
	});

	return <FeedForm initialValue={initialValue} mutation={feedEditMutation.mutate} btnName='수정하기' />;
};

export default FeedEdit;
