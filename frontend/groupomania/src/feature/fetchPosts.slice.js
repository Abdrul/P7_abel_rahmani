import { createSlice } from "@reduxjs/toolkit";

const fetchPostsSlice = createSlice({
    name: "user",
    initialState: {
        dataPosts: []
    },
    reducers: {
        getPosts: (state, action) => {
            state.dataPosts = action.payload
        }
    }

});


export const {getPosts} = fetchPostsSlice.actions;

export default fetchPostsSlice.reducer;