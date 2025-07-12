import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchContent from '../util/fetchContent';
import { addContent } from '../store/contentSlice';
import askGemini from '../util/geminiAI';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { FiCopy, FiDownload } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PropagateLoader } from 'react-spinners';

export default function File() {
    const repoDetail = useSelector((state)=> state.link.data);
    // console.log(repoDetail);

    const [readme, setReadme] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('preview');

    const dispatch = useDispatch();

    const onLoad = async()=>{
        try {
            setLoading(true);
            setError('');

            const content = await fetchContent(repoDetail)
            console.log(content);
            dispatch(addContent(content))
    
            const aiRes = await askGemini(content,repoDetail.userName,repoDetail.repoName)
            console.log(aiRes);  
            setReadme(aiRes);

        } catch (error) {
            console.log(error);
            setError("Error in generating the readme file check API Key..!")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (repoDetail) {
            onLoad();
        }
    }, [repoDetail]);
    
    return (
        <div className="p-6 min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-start">
            {loading 
                ?   <div className="w-full min-h-screen flex flex-col justify-center items-center pb-30">
                        <h2 className="text-3xl font-bold mb-8"><span className='font-mono text-[#908CA1]'>generating</span> ReadMe</h2>
                        <PropagateLoader color="#908CA1"/>
                    </div>
                : <h2 className="text-3xl font-bold mb-4"><span className='font-mono text-[#908CA1]'>generated</span> ReadMe</h2>
            }

            {error && <div className="text-red-500">{error}</div>}

            {readme && (
                <div className="w-full max-w-4xl flex flex-col items-center">
                    {/* Tabs */}
                    <div className="flex bg-neutral-800 rounded-lg overflow-hidden mb-4 w-full max-w-4xl">
                        <button
                            className={`w-1/2 py-2 text-center font-semibold ${activeTab === 'preview' ? 'bg-neutral-900 text-[#908CA1]' : 'bg-neutral-800 text-[#525159]'}`}
                            onClick={() => setActiveTab('preview')}
                        >
                            Preview
                        </button>
                        <button
                            className={`w-1/2 py-2 text-center font-semibold ${activeTab === 'edit' ? 'bg-neutral-900 text-[#908CA1]' : 'bg-neutral-800 text-[#525159]'}`}
                            onClick={() => setActiveTab('edit')}
                        >
                            Edit
                        </button>
                    </div>

                    {/* Content And Button Area */}
                    <div className="relative w-full max-w-4xl">
                        {/* Floating Buttons just outside the preview box */}
                        <div className="absolute top-4 -right-12 flex flex-col gap-3 z-10">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(readme);
                                    toast.success("Markdown copied to clipboard!");
                                }}
                                title="Copy Markdown"
                                className="bg-[#908CA1] p-2 rounded-full hover:bg-[#525159] text-black shadow-md transition"
                            >
                            <FiCopy size={20} />
                            </button>
                            
                            <button
                                onClick={() => {
                                    const blob = new Blob([readme], { type: 'text/markdown' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'README.md';
                                    a.click();
                                    URL.revokeObjectURL(url);
                                }}
                                title="Download Markdown"
                                className="bg-[#908CA1] p-2 rounded-full hover:bg-[#525159] text-black shadow-md transition"
                            >
                                <FiDownload size={20} />
                            </button>
                        </div>
                        <div className="bg-neutral-900 rounded-lg p-4 w-full max-w-4xl border border-neutral-700">
                            {activeTab === 'preview' ? (
                                <div className="prose prose-invert max-w-none">
                                    <ReactMarkdown 
                                        remarkPlugins={[remarkGfm]} 
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            // Custom components for better styling
                                            h1: ({node, ...props}) => (
                                                <h1 className="text-3xl font-bold mb-6 text-center text-white border-b border-neutral-700 pb-4" {...props} />
                                            ),
                                            h2: ({node, ...props}) => (
                                                <h2 className="text-2xl font-semibold mb-4 mt-8 text-white border-b border-neutral-800 pb-2" {...props} />
                                            ),
                                            h3: ({node, ...props}) => (
                                                <h3 className="text-xl font-semibold mb-3 mt-6 text-white" {...props} />
                                            ),
                                            p: ({node, ...props}) => (
                                                <p className="mb-4 text-gray-300 leading-relaxed" {...props} />
                                            ),
                                            ul: ({node, ...props}) => (
                                                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2" {...props} />
                                            ),
                                            ol: ({node, ...props}) => (
                                                <ol className="list-decimal pl-6 mb-4 text-gray-300 space-y-2" {...props} />
                                            ),
                                            li: ({node, ...props}) => (
                                                <li className="text-gray-300 leading-relaxed" {...props} />
                                            ),
                                            code: ({node, inline, ...props}) => (
                                                inline ? 
                                                    <code className="bg-neutral-800 text-amber-300 px-2 py-1 rounded text-sm font-mono" {...props} /> :
                                                    <code className="block bg-neutral-800 text-gray-300 p-4 rounded-lg font-mono text-smoverflow-x-auto" {...props} />
                                            ),
                                            pre: ({node, ...props}) => (
                                                <pre className="bg-neutral-800 p-4 rounded-lg mb-4 overflow-x-auto" {...props} />
                                            ),
                                            blockquote: ({node, ...props}) => (
                                                <blockquote className="border-l-4 border-neutral-600 pl-4 italic text-gray-400 mb-4" {...props} />
                                            ),
                                            img: ({node, ...props}) => (
                                                <img className="inline-block max-h-6 mx-1" {...props} />
                                            )
                                        }}
                                    >
                                        {readme}
                                    </ReactMarkdown>    
                                </div>
                                ) : (
                                    <textarea
                                        value={readme}
                                        onChange={(e) => setReadme(e.target.value)}
                                        className="w-full h-[400px] bg-neutral-800 text-white border border-neutral-700 rounded-lg p-4 resize-nonefocus:outline-none focus:ring-2 focus:ring-[#525159]"
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar
                closeOnClick
                pauseOnHover={false}
                theme="dark"
            />
        </div>
    );
}
