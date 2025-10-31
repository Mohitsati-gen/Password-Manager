import React from 'react'

const Footer = () => {
  return (
    
         <nav className=' w-screen bg-stone-900 text-white bottom-0 '>
            <div className=' w-screen flex justify-center items-center font-bold text-2xl p-3 '>
                <span> <img className='h-10 pr-2' src="/icons/key.png" alt="" /></span>
                <span className='text-green-400'>Pass</span>
                <span className='text-white'>Man</span>
            </div>
            <div className=' w-screen flex flex-row justify-center items-center pb-3'>
                Made with <img className='h-10 pr-2 pl-2' src="/icons/heart.png" alt="" /> by Mohit Sati
            </div>
        </nav>
    
  )
}

export default Footer
