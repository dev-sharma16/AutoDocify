import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchContent from '../util/fetchContent';
import { addContent } from '../store/contentSlice';
import askGemini from '../util/geminiAI';

export default function File() {
    const repoDetail = useSelector((state)=> state.link.data);
    console.log(repoDetail);

    const [readme, setReadme] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const onLoad = async()=>{
        try {
            setLoading(true);
            setError('');

            const content = await fetchContent(repoDetail)
            console.log(content);
            dispatch(addContent(content))
    
            const aiRes = await askGemini(content)
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
        <div className="p-4 h-fit">
            <h2 className="text-2xl font-bold mb-4">Generated README</h2>
            
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            
            {readme && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto whitespace-pre-wrap">
                        {readme}
                    </pre>
                </div>
            )}
        </div>
    )
}
