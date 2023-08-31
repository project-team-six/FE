// import ServiceGuideForm from "../components/home/serviceGuideForm/ServiceGuideForm";
import BannerForm from "../components/home/bannerForm/BannerForm";
import IntroductionForm from "../components/home/introductionForm/IntroductionForm";
import RecentPostsForm from "../components/home/recentPostsForm/RecentPostsForm";

const Home = () => {
	return (
		<div>
			<BannerForm />
			<IntroductionForm />
			{/* <ServiceGuideForm /> */}
			<RecentPostsForm />
		</div>
	);
};

export default Home;
