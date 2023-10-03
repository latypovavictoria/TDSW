import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PatientsState {
  currentPatientId: number;
}

const initialState: PatientsState = {
  currentPatientId: -1,
};

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setActivePatient: (state, i: PayloadAction<number>) => {
      state.currentPatientId = i.payload;
    },
  },
});

export const { setActivePatient } = patientsSlice.actions;

export default patientsSlice.reducer;
