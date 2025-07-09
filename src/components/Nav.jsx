import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { authService } from '../appwrite/authService';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../store/userSlice';

export default function Nav() {
    const user = useSelector((state)=> state.user.data)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClick = async ()=>{
        const {currentUserCopy} = await authService.loginAccount();
        dispatch(addUser(currentUserCopy));
    }
    const handleLogOut = async ()=>{
        await authService.logoutAccount();
        navigate('/');
        dispatch(removeUser());
    }
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(addUser(userData));
            }
        };
        fetchUser();
    }, []);
    return (
        <nav className='flex items-center px-15 py-3 justify-between bg-neutral-900 text-amber-50 fixed w-[100%] top-0'>
            <NavLink to='/'> 
                <img 
                    src="src/assets/Screenshot 2025-07-07 223358.png" 
                    alt="logo" 
                    className='h-10'
                />
            </NavLink>
            <NavLink to='/'>Home</NavLink>
            {/* <NavLink to='/generate'>Make Doc</NavLink> */}
            {user 
                ? <button onClick={handleLogOut}>LogOut</button>
                :<button onClick={handleClick}>Login</button>
            }
            
        </nav>
    )
}
