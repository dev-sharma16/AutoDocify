import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice' 

export const store = configureStore({
    reducer: {
        user: userSlice
    }
})
