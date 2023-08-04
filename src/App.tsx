import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "./shared/Router";
import { Provider } from "react-redux";
import { store } from "./redux/config/configStore";

const queryClinet = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClinet}>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
