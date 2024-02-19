// AdminUsers.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUsersErros, deleteUser, getAllUsersDetails } from '../../slices/adminUserSlice';
import toast, { Toaster } from 'react-hot-toast';
import UpdateUserRoleModal from '../../modals/UpdateUserRoleModal'
const AdminUsers = () => {
  const dispatch = useDispatch();
  const { loading, success, error, users, message } = useSelector(state => state.adminUsers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getAllUsersDetails());
    if (success === true) {
      toast.success('Users fetched successfully');
    } else if (error === true) {
      toast.error(message);
    }
    dispatch(clearUsersErros());
  }, [dispatch]);

  const handleDeleteUser = ({ id }) => {
    dispatch(deleteUser({ id }));
    if (success) {
      toast.success('User Deleted Successfully');
    } else {
      toast.error(message);
    }
    dispatch(clearUsersErros());
  };

  const openModalForUpdateRole = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <section className='h-[85vh] w-4/5 bg-white p-8'>
      <Toaster />
      <h1 className='text-2xl font-bold mb-4'>Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : success && users.length > 0 ? (
        <div className='grid grid-cols-3 gap-4'>
          {users.map(user => (
            <div key={user._id} className='border p-4'>
              <h2 className='text-xl font-semibold mb-2'>User ID: {user._id}</h2>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role : {user.role}</p>
              <p className='flex justify-between'>
                <button
                  onClick={() => openModalForUpdateRole(user)}
                  className='bg-violet-500 text-slate-100 hover:bg-violet-700 hover:text-white px-2 p-1'>
                  Update Role
                </button>
                <button
                  onClick={() => handleDeleteUser({ "id": user._id })}
                  className='bg-red-500 text-slate-100 px-2 p-1 hover:bg-red-700 hover:text-white'>
                  Delete User
                </button>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}

      {/* Modal for updating user role */}
      <UpdateUserRoleModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        userId={selectedUser ? selectedUser._id : null}
        role={selectedUser ? selectedUser.role : null}
        name={selectedUser ? selectedUser.name : null}
        email={selectedUser ? selectedUser.email : null}
      />
    </section>
  );
};

export default AdminUsers;
