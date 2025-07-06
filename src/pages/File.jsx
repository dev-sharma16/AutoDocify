import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchContent from '../util/fetchContent';
import { addContent } from '../store/contentSlice';

export default function File() {
    const repoDetail = useSelector((state)=> state.link.data);
    console.log(repoDetail);
    
    const dispatch = useDispatch();
    const onLoad = async()=>{
        const content = await fetchContent(repoDetail)
        console.log(content);
        dispatch(addContent(content))
    }

    useEffect(()=>{
        onLoad();
    },[])
    
    return (
        <div>File</div>
    )
}
