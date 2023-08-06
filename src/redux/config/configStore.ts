import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "../modules/user";
import locationSlice from "../modules/locationSet";

export const store = configureStore({
	reducer: { tokenSlice, locationSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;