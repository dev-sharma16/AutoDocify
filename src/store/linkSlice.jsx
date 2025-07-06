import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data:""
}

export const linkSlice = createSlice({
    name: 'link',
    initialState,
    reducers: {
        addLink(state, action){
            state.data = action.payload;
        },
        removeLink(state){
            state.data = null;
        }
    }
})

export default linkSlice.reducer;
export const {addLink, removeLink} = linkSlice.actions;

