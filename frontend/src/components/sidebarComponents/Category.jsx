import React from 'react';

const categories = [
  "Laptop",
  "Headphone",
  "SmartPhone",
  "Earphones",
  "Bluetooth Speakers",
];

const Category = ({ selectedCategory, setSelectedCategory, selectedSort, setSelectedSort }) => {
  // Functions
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <section className='flex flex-col gap-5 ml-4 mt-4 font-serif'>
      {/* Categories */}
      <div className='flex flex-col  '>
        <h1 className='font-bold '>CATEGORIES</h1>
        <ul className='ml-8 flex flex-col gap-1 text-slate-600'>
          {categories.map((category) => (
            <li 
            onClick={() => setSelectedCategory(category)}
            className={`text-sm cursor-pointer ${selectedCategory === category && `text-blue-500 font-bold `}`} key={category}>
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Sort By */}
      <div className='flex flex-col'>
        <h1 className='font-bold '>SORT BY</h1>
        <ul className='ml-8 flex text-sm flex-col gap-1 text-slate-600'>
          <li 
            className={`hover:cursor-pointer ${selectedSort === 'Latest' ? 'text-blue-500 font-bold' : ''}`} // Apply styles conditionally
            onClick={() => setSelectedSort('Latest')} 
          >
            Latest
          </li>
          <li 
            className={`hover:cursor-pointer ${selectedSort === 'Oldest' ? 'text-blue-500 font-bold' : ''}`} // Apply styles conditionally
            onClick={() => setSelectedSort('Oldest')} 
          >
            Oldest
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Category;
