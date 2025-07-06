import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { addLink } from '../store/linkSlice';
import { extractConstants } from '../util/extractConstants';
import { useNavigate } from 'react-router-dom';

export default function Generate() {
  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const submitLinkHandler = (data) => {
    const linkDetails = extractConstants(data.link);
    dispatch(addLink(linkDetails))
    console.log(linkDetails);
    reset();
    navigate("/file")
  }
  return (
    <div className=' min-h-80 flex flex-col justify-center items-center w-screen'> 
      <h1>Enter the URL of the Github Repositry</h1>
      <form onSubmit={handleSubmit(submitLinkHandler)} className='flex flex-col justify-center items-center w-screen'>
        <input {...register("link", {required: true})} className='border-2'/>
        {errors.link && <span className='text-red-700'>Enter the link</span>}
        <button className='border-2'>Submit</button>
      </form>
    </div>
  )
}
