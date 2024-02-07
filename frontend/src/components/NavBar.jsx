import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, ShoppingCart} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpeedDial from './SpeedDial'

const NavBar = () => {
  const {isAuthenticated} = useSelector((state) => (state.user))
  const [dark, setDark] = useState(false);
  const navigate  = useNavigate();
  const toggleTheme = () => {
    setDark(!dark);
  };


  useEffect(() => {
    const htmlElement = document.documentElement;
    if (dark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <header>
      <nav>
        <section className={` dark:bg-black/10 z-10 fixed bg-white/5 w-full px-3 transition-all duration-500 ease-in-out flex justify-between h-20 items-center `}>
          <div className='text-white bg-violet-500 w-10 h-10 flex justify-center items-center rounded-full'>
            E
          </div>
          <div className='flex gap-6 items-center '>
            <div
              className={` cursor-pointer text-yellow-300 ${dark ? 'hidden' : 'block'} rounded-full `}
              onClick={toggleTheme}
            >
              <Sun />
            </div>
            <div
              onClick={toggleTheme}
              className={` cursor-pointer text-violet-500 ${dark ? 'block' : 'hidden'}`}
            >
              <Moon />
            </div>
             
            <ul className=' text-slate-300 flex items-center gap-5 max-sm:hidden max-sm:flex-col'>
              <li onClick={()=>navigate("/")} className=' cursor-pointer hover:bg-white/10 py-2 px-2'>Home</li>
              <li className='cursor-pointer hover:bg-white/10 py-2 px-2' onClick={() => navigate('/products')}> Products</li>
              <li>
                <ShoppingCart
                  className='text-violet-500 cursor-pointer'
                  onClick={() => navigate('/me/cart')}
                />
              </li>
              {
                isAuthenticated ? 
                <SpeedDial/> :
                <li onClick={()=>navigate("/login")} className=' bg-violet-600 text-white text-sm p-2 hover:bg-violet-700 rounded-2xl cursor-pointer'>Get Started</li>
              }

            </ul>
            <div className='hidden max-sm:block text-slate-400 mr-2'>
              <Menu />
            </div>
          </div>
        </section>
      </nav>
    </header>
  );
};

export default NavBar;
