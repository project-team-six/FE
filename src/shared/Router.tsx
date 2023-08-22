import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Root from "../pages/Root";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MyPage from "../pages/MyPage";
import MyPageEdit from "../pages/MyPageEdit";
import LocationSetting from "../pages/LocationSetting";
import FeedDetail from "../pages/FeedDetail";
import FeedEdit from "../pages/FeedEdit";
import FeedList from "../pages/FeedList";
import FeedAdd from "../pages/FeedAdd";
import KakaoRedirection from "../pages/KakaoRedirection";
import FindEmail from "../pages/FindEmail";
import FindPassword from "../pages/FindPassword";
import ChatRoomList from "../pages/ChatRoomList";
import ChatRoomDetail from "../pages/ChatRoomDetail";

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
			{ path: "/locationsetting", element: <LocationSetting /> },
			{ path: "/feedlist", element: <FeedList /> },
			{ path: "/feed/:id", element: <FeedDetail /> },
			{ path: "/feed/:id/edit", element: <FeedEdit /> },
			{ path: "/feedadd", element: <FeedAdd /> },
			{ path: "/mypage/:id", element: <MyPage /> },
			{ path: "/mypage/edit", element: <MyPageEdit /> },
			{ path: "/auth/kakao/login", element: <KakaoRedirection /> },
			{ path: "/chatroom", element: <ChatRoomList /> },
			{ path: "/chatroom/:id", element: <ChatRoomDetail /> }
		],
	},
]);

function Router() {}

export default Router;
