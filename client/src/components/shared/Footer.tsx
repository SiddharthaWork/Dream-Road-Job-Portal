"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Youtube, Instagram, Facebook, X } from 'lucide-react'

const Footer = () => {

  

  return (
    <div className='px-8 pt-30 pb-20 flex justify-center bg-white text-black dark:bg-black dark:text-white transition-colors'>
        <div className='flex flex-col items-center gap-6'>
            <div className='w-14 h-14 rounded-lg overflow-hidden'>
            <img src="/dreamroad.svg"  alt="logo" className='object-fit ' />
            </div>
            <h1 className='font-bold mt-0'>Build in Public at <span className='text-[#255cf4]'>@siddharthaworks</span></h1>
            <h1 className='text-black/70 dark:text-white/70 font-semibold text-center'>Your career. Your platform. Your Dream Job</h1>
            {/* Find us on social media */}
            <div className="w-full pb-2 text-center relative flex flex-col items-center">
              <h1 className='font-bold text-sm mb-1'>Find us on</h1>
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent" />
            </div>
            <div className="flex gap-6 ">
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="hover:text-[#FF0000] transition-colors" size={28} />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="hover:text-[#E1306C] transition-colors" size={28} />
              </Link>
              <Link href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <X className="hover:text-[#1DA1F2] transition-colors" size={28} />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="hover:text-[#1877F3] transition-colors" size={28} />
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Footer