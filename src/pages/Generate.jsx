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
    <div className="flex flex-col items-center justify-center min-h-[100%] bg-neutral-950 text-white px-6 py-16">
      {/* Title */}
      <h1 className="text-4xl font-bold  mb-6">
        Enter GitHub Repository URL
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(submitLinkHandler)}
        className="flex flex-col gap-4 w-full max-w-lg"
      >
        <input
          {...register("link", { required: true })}
          placeholder="https://github.com/username/repo"
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-700 bg-neutral-900 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
        />
        {errors.link && (
          <span className="text-red-500 text-sm -mt-2">Please enter a valid GitHub repo URL.</span>
        )}

        <button
          type="submit"
          className="bg-[#908CA0] hover:bg-[#605e6a] transition-colors text-black font-semibold px-6 py-3 rounded-lg shadow-lg text-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
