import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../feature/fetchUser.slice';
import postReducer from '../feature/fetchPosts.slice';
import commentsReducer from '../feature/fetchComments.slice'
import adminReducer from '../feature/fetchAdmin'


export default configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        comments: commentsReducer,
        admin: adminReducer
    }
})