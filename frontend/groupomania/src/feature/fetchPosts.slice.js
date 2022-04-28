import { createSlice } from "@reduxjs/toolkit";

const fetchPostsSlice = createSlice({
    name: "user",
    initialState: {
        dataPosts: []
    },
    reducers: {
        getPosts: (state, action) => {
            state.dataPosts = action.payload
        },
        addPosts: (state, action) => {
            state.dataPosts.push(action.payload)
        },
        deletePosts: (state, action) => {
            state.dataPosts = state.dataPosts.filter((post) => post.id !== action.payload)
        }
    }

});


export const {getPosts, addPosts, deletePosts} = fetchPostsSlice.actions;

export default fetchPostsSlice.reducer;