import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "./shared/Router";

const queryClinet = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClinet}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;