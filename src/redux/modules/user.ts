import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

// 토큰을 디코딩한 후의 데이터 타입 정의
export type InitialType = {
	email: string;
	nickname: string;
	username: string;
	exp: number;
	iat: number;
};

// Redux store의 tokenSlice 상태를 정의한 것입니다. 이 상태는 decodeToken이라는 속성을 가지고 있으며, 이 속성에는 InitialType의 형태로 디코딩한 토큰의 정보가 저장됩니다.
export type TokenSliceState = {
	decodeToken: InitialType;
	isLogin: boolean;
};

const initialState: TokenSliceState = {
	decodeToken: {
		email: "",
		nickname: "",
		username: "",
		exp: 0,
		iat: 0,
	},
	isLogin: false,
};

const tokenSlice = createSlice({
	name: "tokenSlice",
	initialState,
	reducers: {
		setDecodeToken: (state: TokenSliceState, action: PayloadAction<string>) => {
			if (action.payload) {
				const decodeToken: InitialType = jwt_decode(action.payload);
				if (decodeToken) {
					state.decodeToken = decodeToken;
					state.isLogin = true;
				}
			}
		},
		setLogOut: (state: TokenSliceState) => {
			return initialState;
		},
	},
});

export default tokenSlice.reducer;
export const selectToken = (state: { tokenSlice: TokenSliceState }) => state.tokenSlice.decodeToken;
export const { setDecodeToken, setLogOut } = tokenSlice.actions;
