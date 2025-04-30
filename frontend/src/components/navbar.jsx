import React from 'react'
import { useNavigate } from 'react-router-dom'

const navbar = () => {
  const navigate=useNavigate();
  return (
    <>
    <nav className=' text-white px-6 py-4 flex justify-between items-center h-[8%] '>
      {/* Logo */}
      <div className='text-2xl text-[#C84F19]'> {"{-}"}</div>

      {/* Nav Links */}
      <ul className='flex space-x-6 text-sm'>
        <li onClick={()=>{navigate('/notfound')}} className='hover:text-[#C84F19] cursor-pointer'>Home</li>
        <li onClick={()=>{navigate('/notfound')}} className='hover:text-[#C84F19] cursor-pointer'>Features</li>
        <li onClick={()=>{navigate('/notfound')}} className='hover:text-[#C84F19] cursor-pointer'>About</li>
        <li onClick={()=>{navigate('/notfound')}} className='hover:text-[#C84F19] cursor-pointer'>Contact</li>
      </ul>
      <button onClick={()=>{navigate('/notfound')}} className="px-6 py-2 border-[1px] border-[#696969] rounded-full text-white font-semibold bg-[radial-gradient(circle_at_center,_#363636,#0000)] hover:scale-105 transition-all duration-300">
      Login
    </button>
    </nav>
    <div className='w-full h-[2px] bg-[#000000]'></div>
    <div className='w-full h-[1px] bg-[#5D5D5D]'></div>
    
    </>
  )
}

export default navbar