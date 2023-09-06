import { Dispatch } from "redux";
import { setDecodeToken } from "../redux/modules/user";

export function saveToken(key: string, token: string, dispatch?: Dispatch) {
    if (token.trim() === "") return false;

    sessionStorage.setItem(key, token); // 세션에 토큰 저장
    if (key==="accessToken" && dispatch) dispatch(setDecodeToken(token)); // 리덕스에 토큰 정보 저장
	return true;
}