import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "./shared/Router";
import { Provider } from "react-redux";
import { persistor } from "./redux/config/configStore";
import store from "./redux/config/configStore";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteToken } from "./utils/deleteToken";

const queryClinet = new QueryClient();
function App() {
	// 토큰 전체 삭제
	const deleteAllToken = () => {
		deleteToken("accessToken");
		deleteToken("refreshToken");
	};

	// 브라우저가 닫힐 때 쿠키 삭제 처리
	window.addEventListener('beforeunload', deleteAllToken);

	// 컴포넌트가 언마운트될 때 이벤트 리스너 제거
	window.removeEventListener('beforeunload', deleteAllToken);

	return (
		<QueryClientProvider client={queryClinet}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ToastContainer />
					<RouterProvider router={router} />
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
