import React, { useContext } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {
    const navigate = useNavigate()
    const { companyData } = useContext(AppContext)

  return (
    <div>
     <div className='min-h-screen'>
        {/* Navbar for Recuriter panel */}
        <div className='shadow py-4'>
            <div className='px-5 flex justify-between items-center'>
                <img onClick={e => navigate('/')} className='max-sm:w-32 cursor-pointer' width={140} src={assets.band} alt='' />
                {companyData && (    
            <div className='flex items-center gap-3'>
                <p className='max-sm:hidden'>Welcome, {companyData.name}  </p>
                <div className='relative group'>
                    <img className='w-8 border rounded-full' src={companyData.image} alt=''/>
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 '>
                        <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                            <li className='py-1 px-2 cursor-pointer pr-10 '>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
                )}
            </div>
        </div>
        <div className='flex'>
            {/* left Sidebar with option to add job,viewapplications*/}
            <div className='inline-block min-h-screen border-r-2'>
                <ul className='flex flex-col items-start pt-5 text-gray-800'>
                   <NavLink className={(isActive)=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
                   <img className='min-w-4' src={assets.add_icon} alt=""/>
                   <p className='max-sm:hidden'>Add Job</p></NavLink> 
                </ul>
                <ul>
                   <NavLink className={(isActive)=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
                   <img className='min-w-4' src={assets.add_icon} alt=""/>
                   <p className='max-sm:hidden'>Manage Jobs</p></NavLink> 
                </ul>
                <ul>
                   <NavLink className={(isActive)=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                   <img className='min-w-4'src={assets.add_icon} alt=""/>
                   <p className='max-sm:hidden'>View Applications</p></NavLink> 
                </ul>
            </div>
            <div className='flex-1 p-5'>
                <Outlet /> {/* Ensure this is correctly rendering the nested routes */}
            </div>
        </div>
     </div>
    </div>
  )
}

export default Dashboard
