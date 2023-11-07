import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getToken } from "../../utils/getToken";

type SseToken = {
	headers: {
		Authorization : string;
	}
}

// type SseEventType = {
// 	data: string;
// 	lastEventId : string;
// 	target : EventSourcePolyfill;
// 	type : string;
// }

const SseAlert = () => {
	useEffect(() => {
		const token = getToken("accessToken");
		const eventSourceInitDict: SseToken = {
			headers: {
				Authorization: `${token}`,
			},
		};

		const sse = new EventSourcePolyfill(`${process.env.REACT_APP_SERVER_URL}/notification/`, eventSourceInitDict);

		sse.onopen = (e) => {

		};

		sse.addEventListener("sse", async (event : any) => {

			let data = event.data;
			try {
				console.log("까꿍", event);
				data = JSON.parse(data);
				if ("message" in data) {
					window.onload = () => {
						if (window.Notification) {
							Notification.requestPermission();
						}
					};

					if (Notification.permission === "granted") {


						const notification = new Notification(`${data.senderNickname}님`, {
							body: data.message,
						});
						setTimeout(() => {
							notification.close();
						}, 10 * 1000);
						notification.addEventListener("click", () => {
							window.open(data.url, "_blank");
						});
					}
				} else {

				}
			} catch (error) {

			}
		});

		sse.onmessage = (event) => {
			if (event.data === "finished") {
				sse?.close();

				return;
			}
		};

		sse.onerror = (err) => {
			console.error("SSE 에러:", err);
		};

		return () => {
			sse.close();

		};
	}, []);

	return null;
};

export default SseAlert;
