import Navbar from '@/components/shared/Navbar'
import React from 'react'
import AdminLogin from '@/pages/admin/adminLoginPage'

const page = () => {
  return (
    <div>
      <Navbar/>
      <AdminLogin/>
    </div>
  )
}

export default page