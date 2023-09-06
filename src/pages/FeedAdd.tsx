import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { feedInitialValue } from "../types/feedType";
import { dateTimeUtils } from "../utils/dateTimeUtils";
import { postFeed } from "../api/feedApi";
import { pushNotification } from "../utils/notification";
import { RootState } from "../redux/config/configStore";
import FeedForm from "../components/feedForm/FeedForm";
import axios from "axios";

const FeedAdd = () => {
	const location = useSelector((state: RootState) => {
		return state.tokenSlice.decodeToken.location;
	});

	const date = dateTimeUtils(new Date());
	const initialValue: feedInitialValue = {
		title: "",
		content: "",
		category: "",
		originPrice: "",
		price: "",
		transactionStartDate: date,
		transactionEndDate: date,
		consumerPeriod: date,
		purchaseDate: date,
		location: location,
		images: [],
		previews: [],
	};

	const navigate = useNavigate();
	const feedAddMutation = useMutation(postFeed, {
		onSuccess: () => {
			navigate("/feedlist");
		},
		onError: (response) => {
			if (axios.isAxiosError(response) && response.response) {
				pushNotification(response.response.data.error.message, "error");
			} else {
				pushNotification("게시물 등록에 실패했습니다.", "error");
			}
		},
	});

	return <FeedForm initialValue={initialValue} mutation={feedAddMutation.mutate} btnName='등록하기' />;
};

export default FeedAdd;
