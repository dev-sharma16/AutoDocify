import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data:""
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addContent(state, action){
            state.data = action.payload;
        },
        removeContent(state){
            state.data = null;
        }
    }
})

export default contentSlice.reducer;
export const {addContent, removeContent} = contentSlice.actions;

