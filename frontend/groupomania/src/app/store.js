import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../feature/fetchUser.slice';


export default configureStore({
    reducer: {
        user: userReducer,
    }
})