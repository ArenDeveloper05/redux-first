import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { GET_USERS_URL } from "../../utils/apis";

const initialState = {
  titles: ["id", "name", "username", "email", "website", "phone"],
  tableUsers: [],
  loading: false,
  err: undefined
};

export const fetchTableData = createAsyncThunk(
  'table/getData',
  async (arg, { dispatch, rejectWithValue, getState }) => {
    console.log(arg)

    try {
      const response = await axios.get(GET_USERS_URL);
      return response.data

    }
    catch (e) {
      return rejectWithValue({ message: "Is Error" })
    }

  }
)


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

  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true

      })
      .addCase(fetchTableData.fulfilled, (state, { payload }) => {
        state.loading = false
        state.tableUsers = payload
        state.err = undefined

      })
      .addCase(fetchTableData.rejected, (state, { payload }) => {
        state.loading = false
        state.err = payload
      })

  },
});

export const { sortUsersDown, sortUsersUp } = usersSlice.actions;

export default usersSlice.reducer;
