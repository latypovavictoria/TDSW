import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdmStatState {
  activeTown: number | undefined;
}

const initialState: AdmStatState = {
  activeTown: undefined,
};

export const admStatSlice = createSlice({
  name: "admStat",
  initialState,
  reducers: {
    setActiveTown: (state, action: PayloadAction<number | undefined>) => {
      state.activeTown = action.payload;
    },
  },
});

export const { setActiveTown } = admStatSlice.actions;

export default admStatSlice.reducer;
