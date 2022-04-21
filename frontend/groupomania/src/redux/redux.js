import {configureStore, createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// const todoSlice = createSlice({
//     name: "todo",
//     initialState: [
//         {id: 1, text: "faire les course", done: false},
//         {id: 2, text: "Menage", done: true}
//     ],
//     reducers: {
//         addTask: (state, action) => {
//             const newTask = {
//                 id: Date.now(),
//                 done: false,
//                 text: action.payload
//             }
//             state.push(newTask);
//         },
//         toggleTask: (state, action) => {
//             // {type: "todo/toggleTask, payload: 20"}
//             const task = state.find(t => t.id === action.payload);
//             task.done = !task.done
//         },
//         deleteTask: (state, action) => {
//             // {type: "delete_task, payload: 20"}
//             state = state.filter(t => t.id !== action.payload);
//             return state; 
//         }
//     }
// });

// action creator 

// export const { addTask, deleteTask, toggleTask } = todoSlice.actions

// export const store = configureStore({
//     reducer: {
//         todo: todoSlice.reducer
//     }
// });

// useSelector() permet de recuperer une information dans redux (ici les taches par ex)
// const task = useSelector(state => console.log(state))

//Provider fournisseur de donne

// useDispatch() permet d'envoyer une action a redux
// const dispatch = useDispatch();
/* exemple onChange= {() => dipatch({
    type: todo/toggleTask,
    payload: task.id
})}


action creator 

const action = createToggle(20)

export const createToggle = (id) => {
    return {
        type: todo/toggleTask,
        payload: id
    }
}
encore plus simple en les exportant avec .actions juste au dessus

onChange= {() => dipatch(createToggle(task.id))}

*/


const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        getOneUser: (state, action) => {
            state = action.payload
            return state
        },
        editUser: (state, action) => {
            // state = state.map((user) => {
            //     if(user.id === action.payload[1]) {
            //         return {
            //             ...user,
            //             email: action.payload[0]
            //         };
            //     } else {
            //         return user;
            //     };
            // })
            const testredux = state.find(t => t.id === action.payload);
            if(testredux === action.payload) {
                return {
                    
                    email: action.payload
                }
            } else {
                return state
            }
        }
    }

});


export const {getOneUser, editUser} = userSlice.actions;


export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});