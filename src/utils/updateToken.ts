import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { deleteToken } from "./deleteToken";
import { saveToken } from "./saveToken";


export const updateToken = (response: AxiosResponse, dispatch: Dispatch) => {
    const token = response.headers.authorization;
    if (token) {
        deleteToken("accessToken"); // 기존 token 삭제
        saveToken("accessToken", token); // 세션에 accessToken 저장
    }
};
