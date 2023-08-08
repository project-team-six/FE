import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistedReducer } from "../modules/user";
import { persistedLocReducer } from "../modules/locationSet";
import persistStore from "redux-persist/es/persistStore";

const store = configureStore({
	reducer: { 
		tokenSlice: persistedReducer,
		locationSlice: persistedLocReducer,
	},
	middleware: getDefaultMiddleware({
		// Redux Persist와 함께 사용하기 위해 serializableCheck를 비활성화
		// serializableCheck: 객체가 직렬화 가능한지 검사하는 기능
	  	serializableCheck: false,
	}),
  });
  
// Redux Persist를 적용한 Store와 Persister를 생성
export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
