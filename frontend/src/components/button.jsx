import React from 'react'

const button = ({btn, onClick}) => {
  return (
    <>
        <button className="ml-2 h-8  w-auto pl-2 pr-2 bg-[#C84F19] rounded-full text-[#1F1F1F] font-semibold "  onClick={onClick}>
        {
            btn != "Run" ? "Ask AI" : "Run Code"
        }
        </button>
    </>
  )
}

export default button