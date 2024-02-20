import React, { useEffect, useState, useRef } from 'react';
import { LayoutDashboardIcon, UserCircle, LogOutIcon, Menu, Package, DiscAlbum } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logoutUser} from "../slices/userSlice"

const SpeedDial = () => {
  const [menu, setMenu] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector(state => state.user.user.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []); 

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setMenu(!menu);
  };

  const handleProfileClick = () => {
    setMenu(false);
    navigate('/account');
  };
  
  const handleOrdersClick = () => {
    setMenu(false);
    console.log('Orders Clicked');
  };
  
  const handleDashBoardClick = () => {
    setMenu(false);
    navigate('/admin');
  };
  
  const handleLogOut = () => {
    setMenu(false);
    navigate('/');
    dispatch(logoutUser())
 
  };

  return (
    <section className='cursor-pointer relative'>
      <button
        className='hover:bg-white/10 w-full px-14 rounded-md py-2'
        onClick={handleButtonClick}
      >
        <Menu />
      </button>

      {menu && (
        <ul
          ref={dropdownRef}
          className='absolute mt-2 w-full text-white text-sm bg-black/10 backdrop-blur-sm 
          flex flex-col flex-wrap justify-between items-center rounded-xl overflow-hidden'
        >
          <li 
            className='hover:bg-blue-500 w-full py-2 hover:text-white text-blue-500 text-center flex pl-4 gap-3'
            onClick={handleProfileClick}
          >
            <UserCircle /> Profile
          </li>

          <li 
            className='hover:bg-orange-500 hover:text-white text-orange-500 w-full py-2 text-center flex pl-4 gap-3'
            onClick={handleOrdersClick}
          >
            <Package /> Orders
          </li>

          {role === 'admin' && (
            <li 
              className='hover:bg-green-500 hover:text-white text-green-500 w-full py-2 text-center flex pl-4 gap-3'
              onClick={handleDashBoardClick}
            >
              <LayoutDashboardIcon /> Dashboard
            </li>
          )}

          <li 
            className='hover:bg-red-500 hover:text-white text-red-500 w-full py-2 text-center flex pl-4 gap-3'
            onClick={handleLogOut}
          >
            <LogOutIcon /> Logout
          </li>
        </ul>
      )}
    </section>
  );
}

export default SpeedDial;
