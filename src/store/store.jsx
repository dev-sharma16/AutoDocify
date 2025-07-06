import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice' 
import linkSlice from './linkSlice'
import contentSlice from './contentSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        link: linkSlice,
        content: contentSlice,
    }
})
