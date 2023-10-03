import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MapState {
  center: [number, number];
}

const initialState: MapState = {
  center: [55.76, 37.64],
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<[number, number]>) => {
      if (
        state.center[0] === action.payload[0] &&
        state.center[1] === action.payload[1]
      ) {
        state.center = [
          action.payload[0] + 0.00001,
          action.payload[1] + 0.00001,
        ];
      } else {
        state.center = action.payload;
      }
    },
  },
});

export const { setCenter } = mapSlice.actions;

export default mapSlice.reducer;
