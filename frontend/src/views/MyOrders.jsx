import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearMyOrdersError, getAllMyOrders } from '../slices/myOrderSlice';
import Loading from "../components/Loading";
import Paginate from "../components/Paginate";
import { XCircle, Link } from 'lucide-react';
import {useNavigate} from 'react-router-dom'
const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, orders } = useSelector(state => state.myorders);
  const { user } = useSelector(state => state.user.user);
  const [Alert, setAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const showAlert = () => {
      if (error) {
        alert(error);
        dispatch(clearMyOrdersError());
      }
    };

    showAlert();
    dispatch(getAllMyOrders());
  }, [dispatch, error]);

  // Calculate the indexes of orders to display based on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <main className="pt-28 w-full min-h-[100svh]">
          <div className="px-10 h-[540px]  ">
            <div className="grid grid-cols-5 py-4 bg-violet-500 text-white px-2 font-mono border-r-2 border-slate-300">
              <div className="border-r-2 border-slate-300">Order ID</div>
              <div className="text-center border-r-2 border-slate-300">Order Status</div>
              <div className="text-center border-r-2 border-slate-300">Quantity</div>
              <div className="text-center border-r-2 border-slate-300">Price</div>
              <div className="text-right">See Order Details</div>
            </div>
            <div className="border-b-2">
              {currentOrders.map((order, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 px-2 py-3 ${
                    index % 2 === 0 ? 'bg-slate-200' : 'bg-white'
                  }`}
                >
                  <div>{order._id}</div>
                  <div className={`text-center ${order.orderStatus === 'delivered' ? `text-green-500` : `text-red-500`}`}>{order.orderStatus}</div>
                  <div className="text-center">{order.orderItems.length}</div>
                  <div className="text-center">₹{order.totalPrice}</div>
                  <div 
                  onClick={() => navigate(`/curorder/${order._id}`, { state: { order} })}
                  className="hover:cursor-pointer hover:text-blue-400"
                >
                    <Link className="ml-auto mr-6"/></div>
                </div>
              ))}
            </div>
          </div>
          <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} total={orders.length} count={ordersPerPage} maxPagesToShow={3} />
        </main>
      )}
    </Fragment>
  );
};

export default MyOrders;
