import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

const SseAlert = () => {
	useEffect(() => {
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
		const eventSourceInitDict: any = {
			headers: {
				Authorization: `${token}`,
			},
		};
		const sse = new EventSourcePolyfill(`${process.env.REACT_APP_SERVER_URL}/notification/`, eventSourceInitDict);
		sse.onopen = (e) => {
			// setIsStarted(true);
			// console.log("[sse] open", { e });
		};

		sse.addEventListener("sse", (event: any) => {
		});

		sse.onmessage = (event) => {
			// console.log("[sse] message", { event });

			if (event.data === "finished") {
				sse?.close();
				return;
			}
		};

		sse.onerror = (err) => {
			// console.log("[sse] error", { err });
		};
	}, []);
};

export default SseAlert;
