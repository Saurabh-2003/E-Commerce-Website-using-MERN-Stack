import  { Fragment, useEffect , useState} from "react";
import { Link, useLocation } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast'
import { updateOrderStatus , clearMyOrdersError} from "../slices/myOrderSlice";



const OrderDetails = () => {
  const location = useLocation();
  const order = location.state.order;
  const { name, role } = useSelector((state) => state.user.user.user);
  const isAdmin = role === "admin";
  const dispatch = useDispatch()
  const {success, error} = useSelector(state =>  state.myorders)
  // State for selected status
  const [selectedStatus, setSelectedStatus] = useState(order.orderStatus);

  // Function to handle status change
// Function to handle status change
const handleStatusChange = (e) => {
  dispatch(updateOrderStatus({ id: order._id, status: selectedStatus }));
  dispatch(clearMyOrdersError())
  toast.success(`Order Status Changed : ${selectedStatus}`);
};


  useEffect(() => {
    if(success === true){
      toast.success('Order Status Updated Succesfully')
    }else if(success === false){
      toast.error(error)
    }
  }, [success, error])


  return (
          <div className=" bg-gradient-to-br from-blue-200 to-white px-10 py-16">
             <h1 className="text-3xl text-center text-violet-600">
                OrderID: #{order && order._id}
              </h1>
            <div className="flex max-sm:flex-col gap-10 pt-10">
             
              <div className="flex w-2/3 flex-1 max-sm:w-full flex-col flex-wrap gap-10">
                    <div className=" bg-white/80 text-slate-500 rounded-3xl  shadow-md px-8 py-6">
                      <h1 className="text-2xl font-serif text-slate-700 mb-3">SHIPPING INFO</h1>
                        <div className="flex gap-4">
                          <p className="font-semibold">Name:</p>
                          <span className="capitalize">{name}</span>
                        </div>
                        <div className="flex gap-4">
                          <p className="font-semibold">Phone:</p>
                          <span>
                            {order.shippingInfo && order.shippingInfo.phoneNo}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <p className="font-semibold ">Address:</p>
                          <span>
                            {order.shippingInfo &&
                              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                          </span>
                        </div>
                  </div>
                  
                  <div className=" bg-white/80 text-slate-700 rounded-3xl  shadow-md px-8 py-6">
                  <h1 className="text-2xl font-serif text-slate-700 mb-3">PAYMENT</h1>
                    <div className="">
                      <p
                        className={`${
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? `text-green-500`
                            : `text-red-500`}`}
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div className="flex gap-4 text-slate-500">
                      <p className="font-bold">Amount:</p>
                      <span>₹{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>
              </div>
              
              
              <div className="flex flex-col flex-wrap justify-start gap-10">
                  <div className=" bg-white/80 rounded-3xl h-28  shadow-md px-8 py-6">
                      <h1 className="text-2xl text-slate-700 text-center font-serif">ORDER STATUS</h1>
                        <div className="text-slate-500 text-center">
                          <p
                            className={`${
                              order.orderStatus && order.orderStatus === "Delivered"
                                ? `text-green-500`
                                : `text-red-500`
                            }`}
                          >
                            {order.orderStatus && order.orderStatus}
                          </p>
                        </div>
                  </div>

                  {isAdmin && (
                    <div className=" bg-white/80 rounded-3xl flex flex-col gap-1 shadow-md px-8 py-6">
                      <h1 className="text-2xl text-slate-700 text-center font-serif">
                        MODIFY ORDER STATUS
                      </h1>
                      {/* Order status dropdown */}
                      <select
                        className="mt-2 p-2 w-full rounded-md bg-white/80"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="Processing" className="text-red-500">
                          Processing
                        </option>
                        <option value="Shipped" className="text-red-500">Shipped</option>
                        <option value="Delivered" className="text-green-500">Delivered</option>
                      </select>

                      <button
                        className="bg-violet-500 text-white py-1 rounded-full mt-4"
                        onClick={handleStatusChange}
                      >
                        Update Status
                      </button>
                    </div>
                  )}

              </div>

            </div>

            <div className=" bg-white/80 rounded-3xl  shadow-md px-8 py-6 mt-10 ">
              <h1 className="text-2xl font-serif text-center text-slate-700 max-sm:text-center mb-6">ORDER ITEMS</h1>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className="flex my-6 py-3 lg:justify-around px-2 rounded-xl bg-white text-slate-500 items-center justify-between">
                      <img src={item.image} className="h-20 w-20" alt="Product" />
                      <Link to={`/product/${item.product}`} className="capitalize text-violet-500">
                        {item.name}
                      </Link>{" "}
                      <span className="font">
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
  );
};

export default OrderDetails;