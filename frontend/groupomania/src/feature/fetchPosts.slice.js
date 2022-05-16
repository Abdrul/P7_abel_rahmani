import { createSlice } from "@reduxjs/toolkit";


const fetchPostsSlice = createSlice({
    name: "posts",
    initialState: {
        dataPosts: []
    },
    reducers: {
        getPosts: (state, action) => {
            state.dataPosts = action.payload
        },
        addPosts: (state, action) => {
            state.dataPosts.unshift(action.payload)
        },
        deletePosts: (state, action) => {
            state.dataPosts = state.dataPosts.filter((post) => post.id !== action.payload)
        },
        editPosts: (state, {payload}) => {
            state.dataPosts.map((post) => {
                if(post.id === payload.id) {
                    post.text = payload.text
                    post.image = payload.image
                }
            })
        },
        addCommentsOnPosts: (state, {payload}) => {
            state.dataPosts.map((post) => {
                if(post.id === payload.id) {
                    state.post.comments.push(payload.id)
                }
            })
        }
        
    }

});


export const {getPosts, addPosts, deletePosts, editPosts} = fetchPostsSlice.actions;

export default fetchPostsSlice.reducer;