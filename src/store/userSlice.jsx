import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action)=>{
            state.data = action.payload
        },
        removeUser: (state,payload)=>{
            state.data = null
        }
    }
})

export default userSlice.reducer;
export const { loadUser, removeUser } = userSlice.actions;