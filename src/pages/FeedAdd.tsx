import { feedInitialValue } from "../types/feedType";
import FeedForm from "../components/feedForm/FeedForm";
import { datetimeUtils } from "../utils/datetimeUtils";
import { useMutation } from "react-query";
import { postFeed } from "../api/feedApi";
import { useNavigate } from "react-router";
import { pushNotification } from "../utils/notification";

const FeedAdd = () => {
	const date = datetimeUtils(new Date());
	const initialValue: feedInitialValue = {
		title: "",
		content: "",
		category: "",
		price: "",
		transactionStartDate: date,
		transactionEndDate: date,
		consumerPeriod: date,
		purchaseDate: date,
		images: [],
	};

	const navigate = useNavigate();
	const feedAddMutation = useMutation(postFeed, {
		onSuccess: (data) => {
			pushNotification("게시물 등록에 성공했습니다", "success");
			// navigate(-1);
		},
		onError: (error) => {
			pushNotification("게시물 등록에 실패했습니다", "error");
		},
	});

	return (
		<>
			<FeedForm initialValue={initialValue} mutation={feedAddMutation.mutate} btnName='등록하기' />;
		</>
	);
};

export default FeedAdd;
