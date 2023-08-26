import jwt_decode from "jwt-decode";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage/session";

// 토큰을 디코딩한 후의 데이터 타입 정의
export type InitialType = {
	userId: number;
	sub: string;
	nickname: string;
	username: string;
	exp: number;
	iat: number;
	profileImageUrl: string,
	location: string,
	auth:string,
};

// Redux store의 tokenSlice 상태를 정의한 것입니다. 이 상태는 decodeToken이라는 속성을 가지고 있으며, 이 속성에는 InitialType의 형태로 디코딩한 토큰의 정보가 저장됩니다.
export type TokenSliceState = {
	decodeToken: InitialType;
	isLogin: boolean;
};

const initialState: TokenSliceState = {
	decodeToken: {
		userId: 0,
		sub: "",
		nickname: "",
		username: "",
		exp: 0,
		iat: 0,
		profileImageUrl: "",
		location: "",
		auth:"",
	},
	isLogin: false,
};

const tokenSlice = createSlice({
	name: "tokenSlice",
	initialState,
	reducers: {
		setDecodeToken: (state: TokenSliceState, action: PayloadAction<string>) => {
			const decodeToken: InitialType = jwt_decode(action.payload);
			state.decodeToken = decodeToken;
			state.isLogin = true;
		},
		setLogOut: (state: TokenSliceState) => {
			return initialState;
		},
	},
});

// Redux Persist 설정
const persistConfig = {
	key: "root", // 스토리지에 저장될 키
	storage,
};

// Redux Persist를 적용한 rootReducer를 생성
export const persistedReducer = persistReducer(persistConfig, tokenSlice.reducer);
export default tokenSlice.reducer;
export const selectToken = (state: { tokenSlice: TokenSliceState }) => state.tokenSlice.decodeToken;
export const { setDecodeToken, setLogOut } = tokenSlice.actions;
