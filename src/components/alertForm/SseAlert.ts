// import { useEffect } from "react";
// import { EventSourcePolyfill } from "event-source-polyfill";
// import { getToken } from "../../utils/getToken";

const SseAlert = () => {
	// useEffect(() => {
	// 	const token = getToken("accessToken");
	// 	const eventSourceInitDict: any = {
	// 		headers: {
	// 			Authorization: `${token}`,
	// 		},
	// 	};

	// 	const sse = new EventSourcePolyfill(`${process.env.REACT_APP_SERVER_URL}/notification/`, eventSourceInitDict);

	// 	sse.onopen = (e) => {
	// 		console.log("SSE 연결이 열렸습니다.");
	// 	};

	// 	sse.addEventListener("sse", async (event: any) => {
	// 		let data = event.data;
	// 		console.log(data);

	// 		try {
	// 			if ("message" in data) {
	// 				data = JSON.parse(data);
	// 				console.log("메시지가 있습니다:", data.message);
	// 				const permission = await Notification.requestPermission();
	// 				if (permission === "granted") {
	// 					const notification = new Notification("새로운 댓글!!!", {
	// 						body: data.message,
	// 					});
	// 					setTimeout(() => {
	// 						notification.close();
	// 					}, 10 * 1000);
	// 					notification.addEventListener("click", () => {
	// 						window.open(data.url, "_blank");
	// 					});
	// 				}
	// 			} else {
	// 				console.log("메시지가 없습니다.");
	// 			}
	// 		} catch (error) {
	// 			console.error("메시지 파싱 오류:", error);
	// 		}
	// 	});

	// 	sse.onmessage = (event) => {
	// 		if (event.data === "finished") {
	// 			sse?.close();
	// 			console.log("SSE 연결이 닫혔습니다.");
	// 			return;
	// 		}
	// 	};

	// 	sse.onerror = (err) => {
	// 		console.error("SSE 에러:", err);
	// 	};

	// 	return () => {
	// 		sse.close();
	// 		console.log("SSE 컴포넌트가 언마운트되어 SSE 연결이 닫혔습니다.");
	// 	};
	// }, []);

	return null;

};

export default SseAlert;
