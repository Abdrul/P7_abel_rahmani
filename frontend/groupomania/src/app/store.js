import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../feature/fetchUser.slice';
import postReducer from '../feature/fetchPosts.slice';
import commentsReducer from '../feature/fetchComments.slice'
import countReducer from '../feature/counterComments'


export default configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        comments: commentsReducer,
        count: countReducer
    }
})