import React from 'react'
import { Icon } from '@iconify/react';
import TopCompaniesMarquee from '@/components/topcompanies';
import { clipPath } from 'motion/react-client';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  return (
    <>
    <div className='w-full h-[75vh] relative flex flex-col justify-start items-center'>
        <img src="/banner.png" alt="" className='absolute top-0 left-0 w-full h-full object-cover -z-20 fade-border' />
    <div className='w-7xl h-fit mx-auto px-8 pt-20 flex flex-col gap-4 items-center justify-center z-50'>
        <h1 className='text-6xl font-bold text-center text-[#255cf4] tracking-tighter'> 
        Land Your Dream Job <br />
        <span className='text-black'>Find Work That Works for You</span>
        </h1>
        <p className='text-lg text-center text-black/60'>Say goodbye to endless scrolling. Dream Road brings you closer to jobs that matter<br/>faster, smarter, and tailored just for you.</p>
        <button onClick={() => router.push('/login')} className='px-6 h-10 rounded-md text-lg tracking-tight flex items-center gap-2 cursor-pointer font-semibold bg-[#255cf4] text-white '>
            <Icon icon="ix:explore" />
            Explore Jobs Now
        </button>
    </div>
        <TopCompaniesMarquee />
        <h1 className='absolute bottom-10 text-4xl font-bold opacity-80 tracking-tighter'> 
          Start Your Search
        <div className='w-full h-1.5 bg-gradient-to-r from-transparent  via-[#4775f3]   to-transparent rounded-full'/>
        
        </h1>
    </div>
    </>
  )
}

export default Hero