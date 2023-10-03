import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CanvasState {
  strokes: {
    name: string;
    start: {
      x: number;
      y: number;
    };
    end: {
      x: number;
      y: number;
    };
  }[];
}

const initialState: CanvasState = {
  strokes: [],
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addStroke: (
      state,
      action: PayloadAction<{
        name: string;
        start: { x: number; y: number };
        end: { x: number; y: number };
      }>
    ) => {
      state.strokes.push(action.payload);
    },
    removeStroke: (state, action: PayloadAction<string>) => {
      state.strokes = state.strokes.filter(
        (stroke) => stroke.name !== action.payload
      );
    },
    clearStrokes: (state) => {
      state.strokes = [];
    },
  },
});

export const { addStroke, removeStroke, clearStrokes } = canvasSlice.actions;

export default canvasSlice.reducer;
