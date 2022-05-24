import {createSlice} from '@reduxjs/toolkit';


const fetchUserSlice = createSlice({
    name: "user",
    initialState: {
        dataUser: []
    },
    reducers: {
        getOneUser: (state, action) => {
            state.dataUser = action.payload
        },
        addUser: (state, action) => {
            state.dataUser.push(action.payload)
        }
    }
});


export const {getOneUser, addUser} = fetchUserSlice.actions;

export default fetchUserSlice.reducer;