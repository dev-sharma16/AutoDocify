import Aurora from './reactBits/Aurora'
import React, { useEffect } from 'react'
import { authService } from "../appwrite/authService";
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';

function HeroSection() {
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
        <div className="flex flex-col min-h-[100%] bg-neutral-950 text-white w-[100%]">
            <Aurora
                colorStops={["#908CA1", "#908CA1", "#908CA1"]}
                blend={0.5}
                amplitude={2.0}
                speed={1.0}
            >   
                <div className="relative z-10 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    {/* Left Column: Text */}
                    <div className="w-full md:w-1/2 text-left">
                        <h1 className="text-5xl font-extrabold mb-6 leading-tight text-white">
                            Instant, Professional<br />
                            <span className="text-[#908CA1]">Code Documentation.</span>
                        </h1>
                        <p className="text-lg text-[#908CA1] mb-10 max-w-md">
                            Document Smarter, Not Harder – All with a single click.
                        </p>
                        <button
                            onClick={handleClick}
                            className="bg-[#908CA0] hover:bg-[#605e6a] transition-colors text-black font-semibold px-6 py-3 rounded-lg shadow-lg w-[84%]"
                        >
                            Start Now →
                        </button>
                        <p className="mt-6 text-sm text-gray-500">
                            Login with GitHub to begin
                        </p>
                    </div>

                    {/* Right Column: Video or Screenshot */}
                    <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
                      {/* Replace with your video or GIF or image */}
                        <img
                            src="/public/Screenshot 2025-07-10 150719.png" // Put your screenshot or video thumbnail here
                            alt="README Preview"
                            className="rounded-xl   w-[90%] md:w-full"
                            style={{
                              boxShadow: '0 0px 30px rgba(96, 94, 106, 0.45)' // Soft shadow all around
                            }}
                        />
                    </div>
                    
                </div>
            </Aurora>
        </div>
    )
}

export default HeroSection