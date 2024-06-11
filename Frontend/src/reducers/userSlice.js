import { createSlice } from "@reduxjs/toolkit";

export const userReducer=createSlice({
    name:"user",
    initialState:{
        val:false,
        auth:localStorage.getItem('auth'),
        isOpen:false,
    },
    reducers:{
        change(state,action){
            state.val=!state.val;
        },
        changeAuth(state,action){
            state.auth=action.payload;
        },
        dropDown(state, action){
            state.isOpen=!state.isOpen;
        }
    }
})

export const {change,changeAuth,dropDown} =userReducer.actions;
export default userReducer.reducer;