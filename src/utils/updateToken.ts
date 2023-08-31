import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { deleteToken } from "./deleteToken";
import { setDecodeToken } from "../redux/modules/user";


export const updateToken = (response: AxiosResponse, dispatch: Dispatch) => {
    const token = response.headers.authorization;
    if (token) {
        deleteToken("accessToken"); // 기존 token 삭제
        document.cookie = `accessToken=${token.trim()}; path=/;`; // access token 갱신
        dispatch(setDecodeToken(token)); // redux 업데이트
    }
};
