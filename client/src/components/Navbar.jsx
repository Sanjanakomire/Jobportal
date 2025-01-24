import React, { useContext } from "react"
import { assets } from "../assets/assets"
import { useClerk, UserButton, useUser  } from "@clerk/clerk-react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext";
const Navbar = () => {
    const {openSignIn} = useClerk()
    const {user} = useUser()

    const navigate = useNavigate()
    const { setShowRecruiterLogin } = useContext(AppContext)

return (
    <div className="shadow py-4">

<div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between '>
      
    <div className="flex items-center gap-3">
    <img onClick={()=>navigate('/')} className='cursor-pointer' width={200} src={assets.band} alt="Band Logo" />
    </div>
    
    <div className="flex items-center gap-5 ml-auto">
    {
        user
        ?<div className="flex items-center gap-3">
           <Link to="/applications" className="text-blue-600">
              Applied Jobs
            </Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi, {user.firstName + " " + user.lastName}</p>
            <UserButton />
        </div>
        :<div className="flex gap-4 max-sm:text-xs">
        <button onClick={ () => setShowRecruiterLogin(true)} className="text-gray-600">Recruiter Login</button>
       
        <button onClick={ () => openSignIn()}className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"> Login
         </button>
         </div>
}
    </div>
        </div>
        </div>
        
  )
}

export default Navbar
