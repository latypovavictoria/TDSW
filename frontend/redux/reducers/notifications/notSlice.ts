import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
  errors: {
    code: number | undefined;
    msg: string;
    status: string;
  }[];
}

const initialState: NotificationState = {
  errors: [],
};

export const notSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addError: (
      state,
      action: PayloadAction<{
        code: number | undefined;
        msg: string;
        status: string;
      }>
    ) => {
      state.errors.push(action.payload);
    },
  },
});

export const { addError } = notSlice.actions;

export default notSlice.reducer;
