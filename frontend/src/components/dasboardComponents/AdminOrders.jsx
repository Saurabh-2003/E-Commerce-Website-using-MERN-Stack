import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from '../../slices/orderSlice';
import toast, {Toaster} from 'react-hot-toast';


const AdminOrders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders , success} = useSelector(state => state.order.orders)

  useEffect(() => {
    // Fetch orders from the backend when the component mounts
    const fetchOrders = async () => {
      try {
         dispatch(getAllOrders())
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [dispatch]); // Adding dispatch as a dependency

  useEffect(() => {
    if(success === true){
      toast.success('Orders Fetched Successfully')
    }else if(success === false){
      toast.error('Error Fetching the Orders Details!')
    }
  }, [success])
  
  return (
    <section className="min-h-[85vh] w-4/5 bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="grid grid-cols-3 gap-4">
        {orders && orders.map((order) => (
          <div key={order._id} className="border p-4">
            <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
            <p>Status: {order.orderStatus}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <button onClick={() => navigate(`/curorder/${order._id}`, { state: { order} })} className="text-blue-500 mt-2 block"> View Details</button>
          </div>
        ))}
      </div>
      <Toaster />
    </section>
  );
  
};

export default AdminOrders;
