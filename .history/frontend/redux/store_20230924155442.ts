
import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
	reducer: {

		user: userReducer,
		window: windowReducer,
		ecg: ecgReducer,
		adminMap: admMapReducer,
		notifications: notificationReducer,
		canvas: canvasReducer,
		admStat: admStatReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;