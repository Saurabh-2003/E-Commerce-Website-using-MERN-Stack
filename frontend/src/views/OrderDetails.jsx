import  { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {useSelector} from 'react-redux'
const OrderDetails = () => {
  const location = useLocation();
  const order = location.state.order;
  const {name} = useSelector(state => state.user.user.user)

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