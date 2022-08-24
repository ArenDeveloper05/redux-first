import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    test: undefined
};


const todosSlice = createSlice({
    name: "todosSlice",
    initialState,
    reducers: {},

});

// export const {  } = todosSlice.actions;

export default todosSlice.reducer;
