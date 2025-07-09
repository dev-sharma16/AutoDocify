import React, { useEffect } from 'react'
import { authService } from "../appwrite/authService";
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';

export default function Home() {
  const dispatch = useDispatch();

  const handleClick = async ()=>{
    return await authService.loginAccount();
  }
  useEffect(()=>{
    const fetchUser = async ()=>{
      const user = await authService.getCurrentUser()
      console.log(user);
      dispatch(addUser(user));
    }
    fetchUser();
  },[])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white px-6 py-16">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-6 text-">AutoDocify 🚀</h1>

      {/* Tagline */}
      <p className="text-xl text-gray-300 max-w-2xl text-center mb-10">
        Automatically generate professional GitHub README files using AI. 
        Paste your repo link, and let AutoDocify craft a smart and beautiful README in seconds.
      </p>

      {/* Get Started Button */}
      <button
        onClick={handleClick}
        className="bg-amber-500 hover:bg-amber-600 transition-colors text-black font-semibold px-6 py-3 rounded-lg shadow-lg"
      >
        Get Started
      </button>

      {/* Optional Footer Note */}
      <p className="mt-12 text-sm text-gray-500">Login with GitHub to begin</p>
    </div>
  );

}
