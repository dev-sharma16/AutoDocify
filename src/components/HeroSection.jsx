import Aurora from './reactBits/Aurora'
import React, { useEffect } from 'react'
import { authService } from "../appwrite/authService";
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { FaGithub, FaBolt, FaBookOpen } from 'react-icons/fa';

function HeroSection() {
    const dispatch = useDispatch();

    const handleClick = async ()=>{
        return await authService.loginAccount();
    }
    useEffect(()=>{
        const fetchUser = async ()=>{
            const user = await authService.getCurrentUser()
            // console.log(user);
            dispatch(addUser(user));
        }
        fetchUser();
    },[])

    return (
        <div className="flex flex-col min-h-[100%] bg-neutral-950 text-white w-[100%]">
            <Aurora
                colorStops={["#908CA1", "#908CA1", "#908CA1"]}
                blend={0.5}
                amplitude={1.0}
                speed={1.0}
            >   
            <div className="relative z-10 px-8 max-w-7xl mx-auto flex flex-col">
                <div className="flex flex-col md:flex-row items-center justify-between mb-13">
                    {/* Left Column: Text */}
                    <div className="w-full md:w-1/2 text-left">
                        <h1 className="text-5xl font-extrabold mb-6 leading-tight text-white">
                            Instant, Professional<br />
                            <p className="text-[#908CA1]">Code</p>
                            <p className="text-[#908CA1]">Documentation.</p>

                        </h1>
                        <p className="text-lg text-[#908CA1] mb-10 max-w-md">
                            Document Smarter, Not Harder – All with a single click.
                        </p>
                        <button
                            onClick={handleClick}
                            className="bg-[#908CA0] hover:bg-[#605e6a] transition-colors text-black font-semibold px-6 py-3 rounded-lg shadow-lg w-[87%]"
                        >
                            Start Now →
                        </button>
                        <p className="mt-6 text-sm text-gray-500">
                            Harness the power of <span className='text-gray-200'>AI</span> to create professional docs for your GitHub projects instantly.
                        </p>
                    </div>

                    {/* Right Column: Video */}
                    <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
                            <div
                                className="rounded-xl w-[90%] md:w-full bg-white overflow-hidden"
                                style={{
                                aspectRatio: '15 / 9', 
                                boxShadow: '0 15px 40px rgba(144, 140, 160, 0.35)',
                                borderRadius: '1rem',
                                }}
                            >
                                <video
                                src="/src/assets/VN20250711_164218.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover pointer-events-none"
                                />
                            </div>
                    </div>
                </div>
                {/* Feature Highlights */}
                <div className="relative z-10 mt-20 max-w-[100%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 pb-10">
                    <div className="flex items-start space-x-4">
                        <div className="bg-[#908CA1]/20 p-3 rounded-full">
                            <FaGithub className="text-[#908CA1] text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Compatible with All Public GitHub Repos</h3>
                            <p className="text-sm text-[#908CA1] mt-1">
                            Connect and generate documentation for any public repository with ease.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="bg-[#908CA1]/20 p-3 rounded-full">
                            <FaBolt className="text-[#908CA1] text-xl" />
                        </div>
                        <div>
                        <h3 className="text-lg font-semibold text-white">Lightning-Fast README Generation</h3>
                        <p className="text-sm text-[#908CA1] mt-1">
                            Get professional documentation in seconds using advanced AI technology.
                        </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="bg-[#908CA1]/20 p-3 rounded-full">
                            <FaBookOpen className="text-[#908CA1] text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Full Documentation Coming Soon</h3>
                            <p className="text-sm text-[#908CA1] mt-1">
                                Complete code documentation features are in development and coming soon.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </Aurora>
        </div>
    )
}

export default HeroSection