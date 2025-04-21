import React from 'react'
import { IoMdClose } from "react-icons/io";

const SavedListModal = () => {
  return (
    <div classname="min-h-screen flex items-center justify-center bg-[#E6E6E6] shadow-md-[#000000]/25 rounded-lg p-4">
<div className='flex justify-end py-2'>
<IoMdClose />
<div className="flex flex-col items-center justify-center py-4">
    <div className='p-4 rounded-md shadow-md bg-white border border-[#AE6BAD] w-[400px]'>
<img src={savedlIstImage} alt="SavedListImage"  className='rounded-md w-10 h-10'/>
<h1 className='text-[#040404] text-lg font-bold mb-3 mt-5'>Save your favorites in one place!</h1>
<p className='text-[#040404] text-md'>Click the heart icon while browsing to add stays 
and Experiences to your saved list.</p>
<div className='flex justify-center items-center mt-5'>
<button className='bg-[#730071] text-white font-bold py-2 px-4 rounded-md hover:bg-[#AE6BAD]/80 transition duration-300'>
Got it
</button>
</div>
    </div>
    
</div>
</div>
    </div>
  )
}

export default SavedListModal