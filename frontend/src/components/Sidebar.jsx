import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Category from './sidebarComponents/Category';

const Sidebar = ({ setKeyword, onSearch, priceRange, setPriceRange, category, setCategory, setSelectedSort, selectedSort }) => {
  // State variables
  const [inputValue, setInputValue] = useState('');

  // Functions
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setKeyword(inputValue);
      onSearch();
    }
  };

  const onSearchClick = () => {
    setKeyword(inputValue);
    onSearch();
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className='flex flex-col gap-6 items-center justify-center'>
      {/* Search Section */}
      <section className='flex relative justify-center items-center mt-4 gap-2 px-4'>
        <input
          type='text'
          placeholder='Search Products....'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className='bg-gray-100 outline-none rounded-full pl-3 pr-10 py-2'
        />
        <div className='rounded-full absolute right-4 p-2 hover:bg-gray-200' onClick={onSearchClick}>
          <Search className='text-blue-500 h-full cursor-pointer' size={25} />
        </div>
      </section>

      {/* Price Range Section */}
      <section className='flex flex-col gap-3 w-full'>
        <div className='px-4'>
        <div className='flex justify-between '>
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
          <Slider
            trackStyle={{ backgroundColor: "blue" }}
            handleStyle={{
              borderColor: "blue",
              backgroundColor: "blue"
            }}
            range
            min={0}
            max={1000}
            defaultValue={priceRange}
            onChange={handlePriceChange}
          />
        </div>
      </section>

      {/* Filters Section */}
      <section className='dark:text-white flex flex-col gap-3 w-full'>
        <div>
          <Category
            setSelectedSort={setSelectedSort}
            selectedSort={selectedSort}
            selectedCategory={category}
            setSelectedCategory={setCategory}
          />
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
