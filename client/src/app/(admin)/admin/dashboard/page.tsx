import DashboardPage from '@/pages/admin/dashboard/adminDashboard'
import { requireAdmin } from '@/components/auth/ServerSideAuth'
import React from 'react'

const page = async () => {
  // Server-side authentication check - automatically redirects if not admin
  await requireAdmin();

  return (
    <div>
        <DashboardPage/>
    </div>
  )
}

export default page