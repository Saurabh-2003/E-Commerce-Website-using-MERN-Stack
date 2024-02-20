import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { SpellCheck, IndianRupee, File, ListTree, ImageIcon, SendToBackIcon, List, LayoutListIcon, Image } from 'lucide-react';

const AdminCreateProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stockAvailable, setStockAvailable] = useState(0);
  const [images, setImages] = useState([]);

  const handleFileChange = async (event) => {
    const fileList = event.target.files;

    try {
      const base64Images = await Promise.all(Array.from(fileList).map(async (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }));

      setImages(base64Images);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stockAvailable);

    images.forEach((base64Image, index) => {
      formData.append(`images`, base64Image);
    });

    try {
      const response = await axios.post('http://localhost:4000/api/v1/admin/product/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      console.log('Product created:', response.data.product);
      // Handle success (e.g., redirect user or show success message)
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error (e.g., show error message to user)
    }
  };


  return (
    <section className='h-[85vh] overflow-y-scroll grid place-items-center w-4/5 bg-white'>
      <div className='mx-10 px-8 bg-neutral-50 py-8 shadow-lg'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 font-mono'
        >
          <div className='flex relative items-center'>
            <input
              type='text'
              placeholder='Enter the Product Name'
              className='pl-10 pr-8 py-2 w-full border-[1px] outline-none'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <SpellCheck className='absolute ml-2 text-violet-500' />
          </div>

          <div className='flex relative items-center'>
            <IndianRupee className='absolute ml-2 text-violet-500' />
            <input
              type='number'
              placeholder='Enter the Price'
              className='pl-10 pr-8 py-2 w-full border-[1px] outline-none'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className='flex relative items-center'>
            <List className='absolute ml-2 text-violet-500' />
            <input
              type='text'
              placeholder='Enter the Description'
              className='pl-10 pr-8 py-2 w-full border-[1px] outline-none'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='flex relative items-center'>
            <LayoutListIcon className='absolute ml-2 text-violet-500' />
            <input
              type='text'
              placeholder='Enter the Category'
              className='pl-10 pr-8 py-2 w-full border-[1px] outline-none'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className='flex relative items-center'>
            <SendToBackIcon className='absolute ml-2 text-violet-500' />
            <input
              type='number'
              placeholder='Enter the Stock Available'
              className='pl-10 pr-8 py-2 w-full border-[1px] outline-none'
              value={stockAvailable}
              onChange={(e) => setStockAvailable(e.target.value)}
            />
          </div>

          <div className='flex relative items-center'>
            <input
              type='file'
              placeholder='Upload Images'
              className='pl-10 pr-8 py-2 w-full border-[1px] outline-none'
              accept='image/*'
              multiple
              onChange={handleFileChange}
            />
            <Image className='absolute ml-2 text-violet-500' />
          </div>

          <button
            className='bg-violet-500 text-enter py-2 text-white rounded-lg mb-4 hover:bg-violet-700'
            type='submit'
          >
            Submit
          </button>
        </form>
        <div className='flex overflow-x-scroll w-full justify-center gap-3 px-4'>
        {images.map((base64Image, index) => (
            <img
              className='h-16 w-16 aspect-square object-cover'
              key={index}
              src={base64Image}
              alt={`Image ${index}`}
            />
          ))}

        </div>
      </div>
    </section>
  );
};

export default AdminCreateProduct;
