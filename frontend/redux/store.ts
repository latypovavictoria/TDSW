import { configureStore } from "@reduxjs/toolkit";
import admMapReducer from "./reducers/adminMap/admMapSlice";
import admStatReducer from "./reducers/adminStat/admStatSlice";
import canvasReducer from "./reducers/canvas/canvSlice";
import ecgReducer from "./reducers/ecg/ecgSlice";
import windowReducer from "./reducers/nav/winSlice";
import notificationReducer from "./reducers/notifications/notSlice";
import patientsReducer from "./reducers/patients/patientsSlice";
import userReducer from "./reducers/user/userSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
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
