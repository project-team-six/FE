import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
			console.log("Location dispatched:", userLocation); // 디스패치된 주소값을 확인하기 위해 콘솔 출력
			state.userLocation = userLocation;
		},
	},
});

export default locationSlice.reducer;
export const selectToken = (state: { locationSlice: locationSliceState }) => state.locationSlice.userLocation;
export const { setLocation } = locationSlice.actions;
