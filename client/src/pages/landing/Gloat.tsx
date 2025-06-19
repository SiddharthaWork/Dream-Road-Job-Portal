import AnimatedJobList from '@/components/animated-card'
import { Icon } from '@iconify/react'
import React from 'react'

const Gloat = () => {
  return (
    <div className='w-full h-fit max-w-7xl mx-auto relative overflow-hidden '>
        <div className='h-[30rem] flex items-center '>
            <div className='w-1/2 h-full flex flex-col gap-4 items-center justify-center bg-[#255cf4]/10 rounded-xl z-30'>
            <h1 className='text-6xl font-bold tracking-tighter text-[#255cf4]'>
            Don't Just Search.<br /> <span className='text-black'>Get Hired.</span>
            </h1>
            <div className='ml-[12rem] w-full'>
            <button className='px-6 h-10 rounded-md text-lg tracking-tight flex items-center gap-2 cursor-pointer font-semibold bg-[#255cf4] text-white '><Icon icon="game-icons:pointing" />Get Started Now</button>
            </div>
            </div>
            <div className='absolute top-10 -right-[25rem] w-full h-full'>
            <AnimatedJobList/>
            </div>
        </div>
    </div>
  )
}

export default Gloat