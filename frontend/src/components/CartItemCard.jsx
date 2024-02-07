import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../slices/cartSlice';

const CartItemCard = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    if (item.stock < quantity + 1) return;
    setQuantity(quantity + 1);
    dispatch(addItemsToCart(item.product, quantity + 1));
  };

  const decreaseQuantity = () => {
    if (0 >= quantity - 1) return; // Updated this condition
    setQuantity(quantity - 1);
    dispatch(addItemsToCart(item.product, quantity - 1));
  };

  const handleRemoveItem = () => {
        dispatch(removeItemsFromCart(item.product))
  }

  return (
    <section className='grid grid-cols-5 hover:bg-gray-100 dark:hover:bg-gray-100/10'>
      <div className='col-span-3 flex ml-6 h-20 my-6 gap-4'>
        <img src={item.image} className='w-16' alt='Product Image' />
        <div className='flex flex-col'>
          <p className='font-mono text-slate-600 dark:text-slate-300 text-ellipsis'>{item.name}</p>
          <p className='font-serif text-slate-500 dark:text-slate-400'>${item.price}</p>
          <button 
          onClick={handleRemoveItem}
          className='text-start font-serif text-red-400 hover:underline hover:text-red-500'>Remove </button>
        </div>
      </div>
      <div className='col-span-1 my-auto gap-4 flex font-serif text-slate-500'>
        <button onClick={decreaseQuantity} className='bg-violet-500 w-6 text-white'>
          -
        </button>
        {quantity}
        <button onClick={increaseQuantity} className='bg-violet-500 w-6 text-white'>
          +
        </button>
      </div>
      <div className='col-span-1 text-end mr-6 my-auto text-slate-500 dark:text-slate-400'>
        ${item.quantity * item.price}
      </div>
    </section>
  );
};

export default CartItemCard;
