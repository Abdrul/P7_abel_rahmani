import { createSlice } from "@reduxjs/toolkit";


const countNumber = createSlice({
    name: "count",
    initialState: {
        value: {}
    },
    reducers: {
        getCount: (state, action) => {
            state.value = action.payload
        },
        plus: (state, action) => {
            state.value += 1;
        },
        moins: (state, action) => {
            state.value -= 1;
        },
    }

});


export const {getCount, plus, moins} = countNumber.actions;

export default countNumber.reducer;