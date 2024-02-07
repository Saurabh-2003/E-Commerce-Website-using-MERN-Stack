import React, { Fragment } from 'react'
import CartItemCard from '../components/CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, BaggageClaim} from "lucide-react"

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart)
    let total = 0;
    const navigate = useNavigate()
    return (
        <Fragment>
            {
                cartItems.length === 0 ? 
                <div className='h-[80svh] gap-14 grid place-items-center place-content-center 
                text-slate-500 text-2xl capitalize'> 
                <BaggageClaim  size={150} className='text-slate-400'/>
                Your cart is currently empty !
                    <button
                        onClick={() => navigate('/products')}
                        className='bg-violet-500 group flex px-6 gap-4 
                        min-w-60 py-2 rounded-full text-white
                         '
                        >
                        <div className=' group-hover:-rotate-12 group-hover:-translate-y-1
                        transition-all ease-in-out duration-300 group-hover:translate-x-2'>
                            <ShoppingCart />
                        </div>
                        Add Products
                </button>

                </div> :
                <main className='pt-24 px-20 max-sm:px-0 box-content min-h-[100svh] dark:bg-black'>
            <section className='grid grid-cols-5 bg-violet-500 py-2 text-white'>
                <div className='ml-3 col-span-3 '> Product</div>
                <div className='col-span-1'> Quantity</div>
                <div className='text-end col-span-1 mr-3 '> Subtotal</div>
            </section>

            {
                cartItems.map((item) => {
                    total += item.price * item.quantity;
                    return <CartItemCard key={item.product} item={item} />;
                })
            }
            
            <section className='grid grid-cols-5 bg-gray-50 dark:bg-gray-50/5 border-t-[.5px] border-violet-500 py-6 '>
                <div className='ml-3 text-right col-span-4 text-violet-500'> Grand Total</div>
                <div className='col-span-1 text-end mr-6 text-slate-500 dark:text-slate-300'>{`$${total}`}</div>
            </section>

            <div className='w-full flex justify-center'>
                <button 
                onClick={() => navigate('/me/shipping')}
                className='bg-violet-500 w-40 rounded-full text-white mt-10 py-2'>
                Checkout</button>
            </div>
        </main>
            }
        </Fragment>
    )
}

export default Cart
