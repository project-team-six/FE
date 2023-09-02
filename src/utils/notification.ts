import { toast, ToastOptions } from "react-toastify";

type ToastType = "error" | "warning" | "success";

let lastToastId: number | null = null;

export const pushNotification = (msg: string, type: ToastType) => {
	// 이전 알림 닫기
	if (lastToastId) {
		toast.dismiss(lastToastId);
	}

	const toastOptions: ToastOptions = {
		position: "top-center",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	};

	const toastId = toast[type](msg, toastOptions);
	lastToastId = toastId as number;
};
