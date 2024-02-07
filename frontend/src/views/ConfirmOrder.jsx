import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, ShoppingCart} from 'lucide-react'
import CheckOutSteps from '../components/cart/CheckOutSteps'
import CartItemCard from '../components/CartItemCard'

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const {shippingInfo, cartItems} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.user.user)
    const subtotal = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)
    const shippingCharges = subtotal > 1000 ? 0 : 200
    const tax = subtotal * 0.18
    const totalPrice = subtotal + tax + shippingCharges
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`
    
    // Go to Payment Box :
    const proceedToPayment = () => {
        const data  = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        navigate('/process/payment');
    }
  
  return (
    <section className='flex min-h-[100svh]  px-auto flex-col bg-gradient-to-tr from-sky-50 to-white '>
        <CheckOutSteps  activeStep={1}/>
        <div className='flex gap-6 max-sm:flex-col mt-14 w-10/12 mx-auto'>
            <div className='w-2/3 flex max-sm:w-full flex-col gap-10 flex-wrap mb-10'>
                
                {/* Shipping Info */}
                <div className='bg-white flex flex-col gap-4 shadow-md rounded-xl py-6 px-6'>
                    <div className='flex gap-2 text-violet-500 items-center text-2xl'>
                        <MapPin  size={35}/>Shipping Info
                    </div>
                    <div className='text-sm text-slate-500 ml-10 flex flex-col gap-1 '>
                        <p className=''>{user.name.toUpperCase()}</p>
                        <p>{user.email}</p>
                        <p>Address : {address}</p>
                        <p> PinCode : {shippingInfo.pinCode}</p>
                        <p>Mobile : {shippingInfo.phoneNo}</p>
                    </div>
                </div>

                {/* Cart Items */}
                <div className='bg-white flex flex-col gap-4 shadow-md rounded-xl py-6 px-6'>
                    <div className='flex gap-3 items-center text-violet-500 text-lg'>
                        <ShoppingCart size={30} className=' fill-violet-500'/> Your Cart <span className='text-sm'>({cartItems.length})</span>
                    </div>

                    {/* Cart Items */}
                    <div>
                    <section className='grid grid-cols-5  py-2 px-4 text-slate-500 '>
                        <div className='ml-6 col-span-3 '> Product</div>
                        <div className='col-span-1 ml-4'> Quantity</div>
                        <div className='text-end col-span-1 mr-3 '> Subtotal</div>
                    </section>
                        {
                            cartItems.map((item) => (
                                <CartItemCard key={item.product} item={item}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            

            {/* Order Bill */}
            <div className='w-1/3 max-sm:w-full bg-white mb-10 flex max-h-[55svh] flex-col gap-6 shadow-md rounded-xl py-6 px-6'>
                <h1 className='text-violet-500 text-2xl border-b-[1px] w-11/12 font-serif mx-auto border-violet-300 text-center'>
                    Order Summary</h1>
                    <p className='flex justify-between text-slate-500 font-serif'>Total <span>₹{subtotal}</span></p>
                    <p className='flex justify-between text-slate-500 font-serif'>Shipping Charges <span>₹{shippingCharges}</span></p>
                    <p className='flex justify-between text-slate-500 font-serif'>GST <span>₹{tax}</span></p>
                    <p className='border-t-[1px] border-violet-300 w-11/12 mx-auto'/>
                    <p className='flex text-lg justify-between text-slate-600 font-serif'>Grand Total <span>₹{totalPrice}</span></p>
                    <button 
                        onClick={proceedToPayment}
                        className='bg-violet-500 py-2 rounded-full text-white mt-3'
                    >
                    Proceed To Payment</button>
            </div>
        </div>
    </section>
  )
}

export default ConfirmOrder