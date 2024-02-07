import React, { useState } from 'react';
import {Search} from 'lucide-react'
import Category from './sidebarComponents/Category';
const Sidebar = ({ setKeyword, onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setKeyword(inputValue);
      onSearch();
    }
  };

  const onSearchClick = () => {
    setKeyword(inputValue);
    onSearch();
  }
  return (
    <div className='flex flex-col gap-6 items-center justify-center'>
      <section className='flex justify-center items-center mt-4 gap-2 px-4'>
        <input
          type='text'
          placeholder='Search Products....'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className='bg-gray-100 outline-none rounded-full px-2 py-2'
        />
        <div className=' rounded-full p-2 hover:bg-gray-200'
        onClick={onSearchClick}>
          <Search className='text-blue-500 h-full cursor-pointer' size={25} />
        </div>

      </section>
      <section className='dark:text-white flex flex-col gap-3'>
        <p className='font-mono'>Filters</p>
        <div>
          <Category/>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;