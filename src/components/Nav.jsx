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
        <nav className='flex items-center px-15 py-2 justify-between bg-neutral-900/30  w-[100%] fixed top-0 z-50 backdrop-blur-md border-b border-white/10 text-white shadow-sm'>
            <NavLink to='/'> 
                <img 
                    src="/public/Screenshot 2025-07-07 223358-Picsart-BackgroundRemover.png" 
                    alt="logo" 
                    className='h-10 mt-2'
                />
            </NavLink>
            {/* <NavLink to='/'>Home</NavLink> */}
            {/* <NavLink to='/generate'>Make Doc</NavLink> */}
            
            {user 
                ?<div> 
                    <button 
                        onClick={handleLogOut}
                        className="bg-transparent border border-[#908CA1] text-[#908CA1] hover:bg-[#908CA1]/10 transition-colors px-6 py-3 rounded-lg font-medium shadow-md cursor-pointer"
                    >
                        LogOut
                    </button>
                </div>
                :<div className="flex flex-col sm:flex-row gap-4">  
                    <button 
                        onClick={handleClick}
                        className="bg-transparent border border-[#908CA1] text-[#908CA1] hover:bg-[#908CA1]/10 transition-colors px-6 py-3 rounded-lg font-medium shadow-md cursor-pointer"
                    >
                        Login
                    </button>
                    <button
                            onClick={handleClick}
                            className="bg-[#908CA0] hover:bg-[#605e6a] transition-colors text-black font-semibold px-6 py-3 rounded-lg shadow-lg"
                        >
                            Get Started
                    </button>
                </div>   
            } 
        </nav>
    )
}
