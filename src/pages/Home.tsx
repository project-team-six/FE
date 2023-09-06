import ServiceGuideForm from "../components/home/serviceGuideForm/ServiceGuideForm";
import BannerForm from "../components/home/bannerForm/BannerForm";
import IntroductionForm from "../components/home/introductionForm/IntroductionForm";
import RecentPostsForm from "../components/home/recentPostsForm/RecentPostsForm";
import { useEffect, useState } from "react";
import LocationSettingsGuideModal from "../components/home/LocationSettingsGuideForm/LocationSettingsGuideModal";

const Home = () => {
	const [isGuide, setIsGuide] = useState<boolean>(false);
	const isFirstLogin = sessionStorage.getItem("isFirstLogin");
	useEffect(()=>{
		if (isFirstLogin?.trim() === "false") {
			setIsGuide(true);
			sessionStorage.removeItem("isFirstLogin");
		}
	}, []);

	return (
		<div>
			{isGuide && <LocationSettingsGuideModal modalState={isGuide} setModalState={setIsGuide}/>}
			<BannerForm />
			<IntroductionForm />
			<ServiceGuideForm />
			<RecentPostsForm />
		</div>
	);
};

export default Home;
