import { useState } from 'react';
import {SpellCheck, IndianRupee, File, ListTree, ImageIcon, SendToBackIcon, List, LayoutListIcon, Image} from 'lucide-react'


const AdminCreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stockAvailable, setStockAvailable] = useState(0);
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    setImages(Array.from(fileList));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className='h-[85svh] grid place-items-center w-4/5 bg-white'>
      <div className='mx-10 px-8 bg-neutral-50 py-8 shadow-lg'>
        <form
          onSubmit={handleSubmit}
          className=' flex flex-col gap-4 font-mono  '
        >
            <div className='flex relative items-center'>
              <input 
              type='text'
              placeholder='Enter the Product Name'
              className='pl-10 pr-8 py-2  w-full border-[1px] outline-none'
              />
              <SpellCheck className='absolute ml-2 text-violet-500'/>
            </div>
            
            <div className='flex relative items-center'>
              <IndianRupee className='absolute ml-2 text-violet-500' />
              <input 
              type='number'
              placeholder='Enter the Price'
              className='pl-10 pr-8 py-2  w-full border-[1px] outline-none'
              />
            </div>

            <div className='flex relative items-center'>
              <List className='absolute ml-2 text-violet-500' />
              <input 
              type='string'
              placeholder='Enter the Description'
              className='pl-10 pr-8 py-2  w-full border-[1px] outline-none'
              />
            </div>

            <div className='flex relative items-center'>
              <LayoutListIcon className='absolute ml-2 text-violet-500' />
              <textarea 
              type='string'
              placeholder='Enter the Category'
              className='pl-10 pr-8 py-2  w-full border-[1px] outline-none'
              />
            </div>

            <div className='flex relative items-center'>
              <SendToBackIcon className='absolute ml-2 text-violet-500'/>
              <input 
              type='number'
              placeholder='Enter the Stock Available'
              className='pl-10 pr-8 py-2  w-full border-[1px] outline-none'
              />
            </div>


            <div className='flex relative items-center'>
              <input
              type='file'
              placeholder='Upload Images'
              className='pl-10 pr-8 py-2  w-full border-[1px] outline-none'
              accept='image/*'
              multiple
              onChange={handleFileChange}
            />
            <Image className='absolute ml-2 text-violet-500'/>
          </div>

          <button 
          className='bg-violet-500 text-enter py-2 text-white rounded-lg mb-4 hover:bg-violet-700'
          type='submit'>Submit</button>
        </form>
        <div className='flex overflow-x-scroll w-full justify-center gap-3 px-4'>
        {images.map((image, index) => (
          <img className='h-16 w-16 aspect-square object-cover' key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} />
        ))}
        </div>

      </div>
    </section>
  );
};

export default AdminCreateProduct;
