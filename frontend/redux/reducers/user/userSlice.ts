import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user_id?: number;
  account_type?: string;
  first_name?: string;
}

const initialState: UserState = {
  user_id: undefined,
  account_type: undefined,
  first_name: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.user_id = action.payload;
    },
    setAccountType: (state, action: PayloadAction<string>) => {
      state.account_type = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.first_name = action.payload;
    },
  },
});

export const { setUserId, setAccountType, setFirstName } = userSlice.actions;

export default userSlice.reducer;
