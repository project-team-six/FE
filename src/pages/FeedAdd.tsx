import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { feedInitialValue } from "../types/feedType";
import { dateTimeUtils } from "../utils/dateTimeUtils";
import { postFeed } from "../api/feedApi";
import { pushNotification } from "../utils/notification";
import { RootState } from "../redux/config/configStore";
import FeedForm from "../components/feedForm/FeedForm";

const FeedAdd = () => {
	const location = useSelector((state: RootState) => {
		return state.locationSlice.userLocation;
	});

	const date = dateTimeUtils(new Date());
	const initialValue: feedInitialValue = {
		title: "",
		content: "",
		category: "",
		price: "",
		transactionStartDate: date,
		transactionEndDate: date,
		consumerPeriod: date,
		purchaseDate: date,
		location: `${location.sido} ${location.sigungu} ${location.dong}`,
		images: [],
	};

	const navigate = useNavigate();
	const feedAddMutation = useMutation(postFeed, {
		onSuccess: (data) => {
			navigate(-1);
		},
		onError: (error) => {
			pushNotification("게시물 등록에 실패했습니다", "error");
		},
	});

	return <FeedForm initialValue={initialValue} mutation={feedAddMutation.mutate} btnName='등록하기' />;
};

export default FeedAdd;
