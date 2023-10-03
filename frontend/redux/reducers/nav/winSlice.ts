import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface windowState {
  open: Record<string, boolean>;
  active?: string;
  available: string[];
}

const initialState: windowState = {
  open: {},
  available: [],
};

export const winSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setOpen: (state, window: PayloadAction<string>) => {
      state.open[window.payload] = true;
    },
    setClosed: (state, window: PayloadAction<string>) => {
      state.open[window.payload] = false;
    },
    toggleOpen: (state, window: PayloadAction<string>) => {
      state.open[window.payload] = !state.open[window.payload];
    },
    setList: (state, list: PayloadAction<string[]>) => {
      for (const item of list.payload) {
        state.open[item] = true;
      }
    },
    setAvailable: (state, list: PayloadAction<string[]>) => {
      state.available = list.payload;
    },
  },
});

export const { setOpen, setClosed, setList, setAvailable, toggleOpen } =
  winSlice.actions;

const windowReducer = winSlice.reducer;

export default windowReducer;
