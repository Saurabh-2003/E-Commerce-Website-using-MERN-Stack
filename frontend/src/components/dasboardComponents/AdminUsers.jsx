import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersDetails } from '../../slices/adminUserSlice';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { loading, success, error, users } = useSelector(state => state.adminUsers);

  useEffect(() => {
    dispatch(getAllUsersDetails());
  }, [dispatch]);

  return (
    <section className='h-[85vh] w-4/5 bg-white p-8'>
      <h1 className='text-2xl font-bold mb-4'>Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : success && users.length > 0 ? (
        <div className='grid grid-cols-3 gap-4'>
          {users.map(user => (
            <div key={user.id} className='border p-4'>
              <h2 className='text-xl font-semibold mb-2'>User ID: {user.id}</h2>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              {/* Add more user details as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </section>
  );
};

export default AdminUsers;
