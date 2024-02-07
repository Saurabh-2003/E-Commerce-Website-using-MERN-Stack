import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from "../components/dasboardComponents/AdminSidebar";
import AdminDashboard from '../components/dasboardComponents/AdminDashboard';
import AdminProducts from '../components/dasboardComponents/AdminProducts';
import AdminCreateProduct from '../components/dasboardComponents/AdminCreateProduct';
import AdminOrders from '../components/dasboardComponents/AdminOrders';
import AdminUsers from '../components/dasboardComponents/AdminUsers';
import AdminReviews from '../components/dasboardComponents/AdminReviews';

const Dashboard = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div className='flex pt-20 px-10 gap-6 bg-gradient-to-tr from-blue-100 py-6 to-slate-100'>
            <AdminSidebar />
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="createproduct" element={<AdminCreateProduct />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reviews" element={<AdminReviews />} />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
};

export default Dashboard;
