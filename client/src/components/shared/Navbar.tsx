import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='sticky top-0 z-50 bg-white w-full h-fit overflow-hidden'>
    <div className='w-full h-16 max-w-7xl mx-auto py-8'>
        <div className='w-full h-full flex justify-between text-white gap-10 '>
            <div className='flex items-center gap-2 w-fit'>
              <div className='w-10 h-10 rounded-lg bg-[#255cf4] overflow-hidden'>
            <Link href={"/"}>
                <img src="/dreamroad.svg" alt="" className='w-full h-full object-cover' />
            </Link>
              </div>
                <h1 className='text-2xl text-[#255cf4] uppercase font-bold'>DREAMROAD</h1>
            </div>

            <div className='flex items-center'>
            <Link href="/employer">
            <Button variant={'link'} size={'custom'} className='hover:text-[#255cf4]'>
              Employers Login
            </Button>
            </Link>
            <Link href="/login">
            <Button variant={'custom'} size={'custom'}>
              Login
            </Button>
            </Link>
            </div>
            

        </div>

    </div>
    </div>
  )
}

export default Navbar