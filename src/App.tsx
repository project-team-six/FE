import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "./shared/Router";
import { Provider } from "react-redux";
import { persistor } from "./redux/config/configStore";
import store from "./redux/config/configStore";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClinet = new QueryClient();
function App() {
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
