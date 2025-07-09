import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Generate from '../pages/Generate'
import File from '../pages/File'
import { useDispatch, useSelector } from 'react-redux'
import { authService } from '../appwrite/authService'
import { useEffect } from 'react'
import { addUser } from '../store/userSlice';

export default function MainRoutes() {
    const user = useSelector((state)=>state.user.data);
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchUser = async ()=>{
            const user = await authService.getCurrentUser()
            console.log(user);
            dispatch(addUser(user));
        }
        fetchUser();
    },[])
    
    return (
        <Routes>
            <Route path='/' element={user ? <Generate/> : <Home/>}/>
            {/* <Route path='/generate' element={<Generate/>}/> */}
            {/* <Route path='/file' element={<File/>}/> */}
        </Routes>
    )
}
