import { toast } from "react-toastify";

type ToastType = "error" | "warning" | "success";

export const pushNotification = (msg: string, type: ToastType) => {
	toast[type](msg, {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};
