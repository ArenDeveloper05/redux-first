import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titles: ["id", "name", "username", "email", "website", "phone"],
  tableUsers: [],
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    sortUsersUp(state, { payload }) {
      state.tableUsers = state.tableUsers.sort((a, b) => {
        if (a[payload] < b[payload]) return -1;
        else if (a[payload] > b[payload]) return 1;
        else return 0;
      });
    },
    sortUsersDown(state, { payload }) {
      state.tableUsers = state.tableUsers.sort((a, b) => {
        if (a[payload] > b[payload]) return -1;
        else if (a[payload] < b[payload]) return 1;
        else return 0;
      });
    },
    changeState(state, { payload }) {
      state.tableUsers = payload;
    },
  },
});

export const { sortUsersDown, sortUsersUp, changeState } = usersSlice.actions;
export default usersSlice.reducer;
