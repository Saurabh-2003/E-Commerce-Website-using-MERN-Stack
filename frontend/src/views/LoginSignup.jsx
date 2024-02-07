import React, { useEffect, useState } from 'react'
import {Mail, Facebook, Chrome} from "lucide-react"
const bgImage = "https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const box="https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, userSelector , signup} from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'


const Login = ({toggle, setLogin}) => {
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(userSelector)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Email:', loginEmail);
    console.log('Login Password:', loginPassword);
    dispatch(fetchUser(loginEmail, loginPassword));
  }
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated]);
  
 return (
  <>
    <div className=' w-2/5 flex max-sm:flex-1 flex-col  items-center justify-center flex-wrap '>
          <div className='flex max-sm:flex-1 flex-col  items-center justify-center flex-wrap'>
              <h1 className='text-4xl font-serif'> LOGIN</h1>
              <form 
              onSubmit={loginSubmit}
              className='flex w-60 flex-col gap-6 flex-wrap mb-10 mt-14'>
          
                  <div className="relative group">
                    <input 
                    type="text" id="username" 
                    required 
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-transparent h-10 
                    text-sm peer border-b-2 outline-none px-2  "/>

                    <label 
                    htmlFor="username" 
                    className="transform transition-all 
                    absolute top-0 left-0 h-full flex items-center  text-sm 
                    group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 
                    peer-valid:h-1/2 group-focus-within:-translate-y-full 
                    peer-valid:-translate-y-full group-focus-within:pl-0 
                    peer-valid:pl-0 duration-500">Email</label>
                  </div>

                  <div className="relative group">
                    <input 
                    type="password" 
                    id="password" 
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required 
                    className="w-full bg-transparent h-10 
                    text-sm peer border-b-2 outline-none px-2"/>

                    <label 
                    htmlFor="password" 
                    className="transform transition-all 
                    absolute top-0 left-0 h-full flex items-center  text-sm 
                    group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 
                    peer-valid:h-1/2 group-focus-within:-translate-y-full 
                    peer-valid:-translate-y-full group-focus-within:pl-0 
                    peer-valid:pl-0 duration-500">Password</label>
                  </div>

                  <button
                  type='submit'
                  className='bg-blue-600 hover:bg-blue-800 rounded-lg py-1'
                  >Login</button>
              </form>
              <p className='text-sm hover:underline hover:text-blue-500 
              hover:cursor-pointer mb-4 text-slate-500' onClick={() => navigate('/password/forgot')}> 
              Forgot Password ?</p>
              <p className='text-sm hover:underline hover:text-blue-500 
              hover:cursor-pointer mb-4 text-slate-500' onClick={() => setLogin(!toggle)}> 
              New User ? Signup Here</p>
          </div>
          <div 
          className='flex flex-col items-center justify-center w-full gap-5'>
          <div className="relative flex items-center w-80">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-200 text-sm">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
          </div>

            <div 
            className='flex flex-col w-full items-center gap-4'>
              <button className='w-56 bg-orange-700 flex py-1  gap-2 px-2 rounded-2xl text-md'>
                <Chrome />Login with Google
              </button>
              <button className='w-56 flex px-2 py-1 gap-3 bg-blue-800 p-1 rounded-2xl text-md'>
              <Facebook />Login with Facebook
              </button>
            </div>
          </div>
        </div>
  </>
 )
}

const Signup = ({toggle, setLogin}) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();


  const handleSignUp = (e) => {
    e.preventDefault()
    dispatch(signup(name, email, password))
  }
  return (
    <>
    <div className=' w-2/5 flex max-sm:flex-1 flex-col  items-center justify-center flex-wrap '>
    <div className='flex max-sm:flex-1 flex-col  items-center justify-center flex-wrap'>
    <h1 className='text-4xl font-serif'> SIGNUP</h1>
    <form 
    onSubmit={handleSignUp}
    className='flex flex-col gap-6 flex-wrap mb-10 mt-14 w-60'>

      {/* UserName Field */}
      <div className="relative group ">
        <input 
        type="text" 
        id="name" 
        onChange={(e) => setName(e.target.value)}
        required 
        className="w-full bg-transparent h-10 
        text-sm peer border-b-2 outline-none px-2"/>

        <label 
        htmlFor="name"
        className="transform transition-all 
        absolute top-0 left-0 h-full flex items-center  text-sm 
        group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 
        peer-valid:h-1/2 group-focus-within:-translate-y-full 
        peer-valid:-translate-y-full group-focus-within:pl-0 
        peer-valid:pl-0 duration-500 ">Username</label>
      </div>

      {/* Email Field */}
      <div className="relative group ">
        <input 
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        id="email" 
        required 
        className="w-full bg-transparent h-10 
        text-sm peer border-b-2 outline-none px-2"/>

        <label 
        htmlFor="email" 
        className="transform transition-all 
        absolute top-0 left-0 h-full flex items-center  text-sm 
        group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 
        peer-valid:h-1/2 group-focus-within:-translate-y-full 
        peer-valid:-translate-y-full group-focus-within:pl-0 
        peer-valid:pl-0 duration-500">Email</label>
      </div>


      {/* Password Field */}
      <div className="relative group">
        <input 
        type="password" 
        id="password" 
        onChange={(e) => setPassword(e.target.value)}
        required 
        className="w-full bg-transparent h-10 
        text-sm peer border-b-2 outline-none px-2"/>

        <label 
        htmlFor="password" 
        className="transform transition-all 
        absolute top-0 left-0 h-full flex items-center  text-sm 
        group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 
        peer-valid:h-1/2 group-focus-within:-translate-y-full 
        peer-valid:-translate-y-full group-focus-within:pl-0 
        peer-valid:pl-0 duration-500">Password</label>
      </div>
      
       {/* Submit Button */}
       <button 
       type='submit'
       className='bg-blue-600 hover:bg-blue-800 rounded-lg py-1'>
        Signup
       </button>
    </form>
    <p className='text-sm underline hover:text-blue-600 
    hover:cursor-pointer text-slate-500' onClick={() => setLogin(!toggle)}> 
    Already a User ? Login Here</p>
    </div>
  </div>
</>
  )
}


const LoginSignup = () => {
  const [login, setLogin] = useState(true);
  return (
    <section className='  h-[100svh] w-full flex flex-col items-center justify-center'>
      <img className=' z-[-1] object-cover h-full w-full' src={bgImage}/>
      <div className=' flex   text-white absolute max-md:w-full 
      h-4/5 mt-16 w-3/5 bg-black/10 backdrop-blur-sm 
      transition-all ease-in-out duration-500'>
        {
          login ? <Login toggle= {login} setLogin = {setLogin}/> : <Signup toggle= {login} setLogin = {setLogin}/>
        }
        <img src={box} className='object-cover w-3/5 max-sm:hidden'/>
      </div>
    </section>
  )
}

export default LoginSignup