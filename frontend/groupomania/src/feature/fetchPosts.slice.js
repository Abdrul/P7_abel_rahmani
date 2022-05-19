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
                if(post.id === payload.post_id) {
                    post.comments.push(payload)
                }
            })
        },
        deleteCommentsOnPosts: (state, {payload}) => {
            state.dataPosts.map((post) => {
                post.comments = post.comments.filter((comment) => comment.id !== payload);
            })
        },
        addLikesOnPosts: (state, {payload}) => {
            state.dataPosts.map((post) => {
                if(post.id === payload.post_id) {
                    post.likes.push(payload)
                }
            })
        },
        removeLikesOnPosts: (state, {payload}) => {
            state.dataPosts.map((post) => {
                post.likes = post.likes.filter((like) => like.id !== payload);
            })
        }
        
    }

});


export const {getPosts, addPosts, deletePosts, editPosts, addCommentsOnPosts, addLikesOnPosts, deleteCommentsOnPosts, removeLikesOnPosts} = fetchPostsSlice.actions;

export default fetchPostsSlice.reducer;