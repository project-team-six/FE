import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage/session";

export type InitialType = {
	sido: string;
	sigungu: string;
	dong: string;
};

export type locationSliceState = {
	userLocation: InitialType;
};

const initialState: locationSliceState = {
	userLocation: {
		sido: "",
		sigungu: "",
		dong: "",
	},
};

const locationSlice = createSlice({
	name: "locationSlice",
	initialState,
	reducers: {
		setLocation: (state: locationSliceState, action: PayloadAction<InitialType>) => {
			const userLocation: InitialType = action.payload;
			state.userLocation = userLocation;
		},
		resetLocation: (state: locationSliceState) => {
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
export const persistedLocReducer = persistReducer(persistConfig, locationSlice.reducer);

export default locationSlice.reducer;
export const selectToken = (state: { locationSlice: locationSliceState }) => state.locationSlice.userLocation;
export const { setLocation, resetLocation } = locationSlice.actions;
