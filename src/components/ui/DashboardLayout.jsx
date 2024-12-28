import React from 'react'
import Sidebar from '../Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
const DashboardLayout = () => {
  return (
    <div>
       <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1 ">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        {/* <Header /> */}
        <main className="flex flex-1 flex-col gap-4 p-4  lg:gap-6 lg:p-6">
        
          <Outlet/>
        </main>
      </div>
    </div>
    </div>
  )
}

export default DashboardLayout
