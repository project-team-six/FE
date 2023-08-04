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
};

const initialState: TokenSliceState = {
	decodeToken: {
		email: "",
		nickname: "",
		username: "",
		exp: 0,
		iat: 0,
	},
};

// email: string;
// nickname: string;
// username: string;
// exp: number;
// iat: number;

const tokenSlice = createSlice({
	name: "tokenSlice",
	initialState,
	reducers: {
		setDecodeToken: (state: TokenSliceState, action: PayloadAction<string>) => {
			const decodeToken: InitialType = jwt_decode(action.payload);
			console.log("decodeToken", decodeToken);
			state.decodeToken = decodeToken;
		},
	},
});

export default tokenSlice.reducer;
export const selectToken = (state: { tokenSlice: TokenSliceState }) => state.tokenSlice.decodeToken;
export const { setDecodeToken } = tokenSlice.actions;
