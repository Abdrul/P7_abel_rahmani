import {createSlice} from '@reduxjs/toolkit';


const fetchAdminSlice = createSlice({
    name: "admin",
    initialState: {
        dataAdmin: []
    },
    reducers: {
        getAllPostAdmin: (state, action) => {
            state.dataAdmin = action.payload
        },
        deletePostsAdmin: (state, action) => {
            state.dataAdmin = state.dataAdmin.filter((post) => post.id !== action.payload)
        },
        editPostsCanDisplay: (state, {payload}) => {
            state.dataAdmin.map((post) => {
                if(post.id === payload.id) {
                    post.canDisplay = payload.canDisplay
                }
            })
        },
    }
});


export const {getAllPostAdmin, deletePostsAdmin, editPostsCanDisplay} = fetchAdminSlice.actions;

export default fetchAdminSlice.reducer;