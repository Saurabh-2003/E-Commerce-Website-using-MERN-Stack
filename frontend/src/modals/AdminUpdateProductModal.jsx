// AdminUpdateProduct.js
import { useState } from 'react';
import Modal from 'react-modal';
import { SpellCheck, IndianRupee, File, ListTree, ImageIcon, SendToBackIcon, List, LayoutListIcon, Image } from 'lucide-react';
import { updateProduct, clearProductsErrorAdmin } from '../slices/adminProductsSlice';
import {useDispatch} from 'react-redux'
import toast, {Toaster} from 'react-hot-toast'


const AdminUpdateProductModal = ({ initialProductData, closeModal, isModalOpen, setIsModalOpen }) => {
  const [productName, setProductName] = useState(initialProductData.name);
  const [price, setPrice] = useState(initialProductData.price);
  const [description, setDescription] = useState(initialProductData.description);
  const [category, setCategory] = useState(initialProductData.category);
  const [stockAvailable, setStockAvailable] = useState(initialProductData.stock);
  const [images, setImages] = useState(initialProductData.images);
  const dispatch = useDispatch()

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
    if (images.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stockAvailable);

    images.forEach((base64Image, index) => {
      formData.append(`images`, base64Image);
    });

    dispatch(updateProduct({id:initialProductData._id, productData:formData}))
    dispatch(clearProductsErrorAdmin())
  };

  return (
    <>
    <Toaster />
    <button onClick={closeModal}>Close Modal</button>

      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Update Product Modal"
        className={`pt-24 `}
      >
        <section className='h-[85vh] overflow-auto   bg-white'>
          <div className='w-full  py-4'>
            <button 
            onClick={()=> setIsModalOpen(false)} 
            className='w-6 text-center rounded-full  bg-red-500 text-white  ml-[92.5%]'>X</button>
          </div>
          <div className=' px-20 bg-neutral-50  '>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col  gap-4 font-mono'
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
                Update Product
              </button>
            </form>
            <div className='flex overflow-x-scroll w-full justify-center gap-3 px-4'>
              {images.map((image, index) => (
                <img
                  className='h-16 w-16 aspect-square object-cover'
                  key={index}
                  src={image.url || image}
                  alt={`Image ${index}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default AdminUpdateProductModal;
