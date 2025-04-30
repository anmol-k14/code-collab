import React from 'react'
import { useNavigate } from 'react-router-dom'

const notFound = () => {
const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#232323] text-white gap-2'>
        <h1 className='text-4xl'>404 Not Found</h1>
        <p className='text-4xl'>Building version 2</p>
        <p onClick={()=>{navigate('/')}} className='text-sm text-[#C84F19] cursor-pointer'>Go back to Home</p>
    </div>
  )
}

export default notFound