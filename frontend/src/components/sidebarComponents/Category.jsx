import React, { useState } from 'react';

const categories = [
  "Laptop",
  "Headphone",
  "SmartPhone",
  "Earphones",
  "Bluetooth Speakers",
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <section className='flex flex-col gap-5'>
      {/* Categories */}
      <div className='flex flex-col'>
        <h1 className='font-bold font-serif'>Categories</h1>
        <ul className='ml-4 flex flex-col gap-1 text-slate-600'>
          {categories.map((category) => (
            <li className='text-sm' key={category}>
              <input
                type='checkbox'
                name='category'
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />{' '}
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Sort By */}
      <div className='flex flex-col'>
        <h1 className='font-bold font-serif'>Sort By :</h1>
        <div className='ml-4 flex flex-col gap-1 text-slate-600'>
          <span className='text-sm'>
            <input
              type='radio'
              name='sort'
              checked={selectedSort === 'Latest'}
              onChange={() => handleSortChange('Latest')}
            />{' '}
            Latest
          </span>
          <span className='text-sm'>
            <input
              type='radio'
              name='sort'
              checked={selectedSort === 'Oldest'}
              onChange={() => handleSortChange('Oldest')}
            />{' '}
            Oldest
          </span>
        </div>
      </div>

      
    </section>
  );
};

export default Category;
