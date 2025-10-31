import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-screen  flex flex-row justify-between items-center p-2  bg-black text-white'>
            <div className=' flex justify-center items-center font-bold text-2xl lg:pl-40 sm:pl-0 cursor-pointer'>
                <span> <img className='h-10 pr-2' src="/icons/key.png" alt="" /></span>
                <span className='text-green-400 cursor-pointer'>Pass</span>
                <span className='text-white cursor-pointer'>Man</span>
            </div>
            <div className=' font-bold lg:pr-40 sm:pr-0 cursor-pointer'> Home </div>
        </nav>
    )
}

export default Navbar
