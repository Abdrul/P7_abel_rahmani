import {createSlice} from '@reduxjs/toolkit';


const fetchAllUsersSlice = createSlice({
    name: "users",
    initialState: {
        dataUsers: []
    },
    reducers: {
        getAllUsers: (state, action) => {
            state.dataUsers = action.payload
        }
    }
});


export const {getAllUsers} = fetchAllUsersSlice.actions;

export default fetchAllUsersSlice.reducer;