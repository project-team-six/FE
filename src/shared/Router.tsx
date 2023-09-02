import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Root from "../layout/Root";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";
import MyPageEdit from "../pages/MyPageEdit";
import FeedDetail from "../pages/FeedDetail";
import FeedEdit from "../pages/FeedEdit";
import FeedList from "../pages/FeedList";
import FeedAdd from "../pages/FeedAdd";
import KakaoRedirection from "../pages/KakaoRedirection";
import FindEmail from "../pages/FindEmail";
import FindPassword from "../pages/FindPassword";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "/signin", element: <SignIn /> },
			{ path: "/findemail", element: <FindEmail /> },
			{ path: "/findpassword", element: <FindPassword /> },
			{ path: "/signup", element: <SignUp /> },
			{ path: "/feedlist", element: <FeedList /> },
			{ path: "/feed/:id", element: <FeedDetail /> },
			{ path: "/feed/:id/edit", element: <FeedEdit /> },
			{ path: "/feedadd", element: <FeedAdd /> },
			{ path: "/mypage/:id", element: <MyPage /> },
			{ path: "/mypage/edit", element: <MyPageEdit /> },
			{ path: "/auth/kakao/login", element: <KakaoRedirection /> },
		],
	},
]);

function Router() {}

export default Router;
