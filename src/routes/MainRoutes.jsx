import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Generate from '../pages/Generate'

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/generate' element={<Generate/>}/>
        </Routes>
    )
}
