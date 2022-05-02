import { createSlice } from "@reduxjs/toolkit";

const fetchCommentsSlice = createSlice({
    name: "comments",
    initialState: {
        dataComments: []
    },
    reducers: {
        getComments: (state, action) => {
            state.dataComments = action.payload
        },
        addComments: (state, action) => {
            state.dataComments.unshift(action.payload)
        },
        deleteComments: (state, action) => {
            state.dataComments = state.dataComments.filter((comments) => comments.id !== action.payload)
        },
        editComments: (state, {payload}) => {
            state.dataComments.map((comments) => {
                if(comments.id === payload.id) {
                    comments.text = payload.text
                    comments.image = payload.image
                }
            })
        }
    }

});


export const {getComments, addComments, deleteComments, editComments} = fetchCommentsSlice.actions;

export default fetchCommentsSlice.reducer;