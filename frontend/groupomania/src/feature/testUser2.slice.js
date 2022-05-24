import {createSlice} from '@reduxjs/toolkit';


const fetchUserSlice2 = createSlice({
    name: "user2",
    initialState: {
        dataUser2: []
    },
    reducers: {
        getOneUser2: (state, action) => {
            state.dataUser2 = action.payload
        }
    }
});


export const {getOneUser2} = fetchUserSlice2.actions;

export default fetchUserSlice2.reducer;