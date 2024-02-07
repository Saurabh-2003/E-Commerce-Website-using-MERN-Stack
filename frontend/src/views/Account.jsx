import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Account = () => {
  const {user} = useSelector(state => state.user.user)
  const navigate = useNavigate();
  return (
    <section className='min-h-[100svh] w-full pb-20 max-sm:flex-col flex flex-col box-border pt-20' >
      <h1 className='font-mono text-3xl text-center mb-10 text-slate-500 border-b-2 w-2/3 mx-auto'> PROFILE</h1>
      <div className='flex max-sm:flex-col mx-auto my-auto lg:gap-64 md:gap-20 sm:gap-4 '>
        <div className='flex flex-col gap-10 my-auto max-sm:mb-10'>
            <img 
            className=' h-[250px] w-[250px] object-contain rounded-full mx-auto 
            bg-slate-200 hover:cursor-zoom-in' 
            src = {user.avatar.url} 
            alt='user-image'
            > 
            </img>
            <button
              className='bg-violet-500 py-2 rounded-full text-white hover:bg-violet-700' 
              onClick={() => navigate('/me/update')}
            >Update Profile</button>
        </div>
        <div className='flex flex-col my-auto mx-auto text-gray-600 gap-6 text-lg font-mono'>
            <div className='flex flex-col gap-10 max-sm:items-center'>
                <div>
                  Username : <span className=' font-serif text-slate-500 capitalize'>{user.name}</span>
                </div>
                <div>
                  Email : <span className=' font-serif text-slate-500'>{user.email}</span>
                </div>
                <div>
                  Role : <span className=' font-serif text-slate-500 capitalize'>{user.role}</span>
                </div>
                <div>
                  Created at : <span className=' font-serif text-slate-500 capitalize'>{user.createdAt.substr(0, 10)}</span>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
            <button
            onClick={() => navigate('/me/order')} 
            className='bg-violet-500 py-2 text-white hover:bg-violet-700'>My Orders</button>
            <button 
            className='bg-violet-500 py-2 text-white hover:bg-violet-700'
            onClick={() => navigate('/me/password')}
            >Update Password</button>
            </div>
      </div>
      </div>
    </section>
  )
}

export default Account