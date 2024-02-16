import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateUserRole } from '../slices/adminUserSlice';

const UpdateUserRoleModal = ({ isOpen, onRequestClose, userId, role, name, email }) => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(role ); // Set default value to '' if role is null

  const handleUpdateUserRole = () => {
    dispatch(updateUserRole({ id: userId, name, email, role: selectedRole }));
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update User Role"
      style={{
        content: {
          width: '400px',
          height: '400px',
          margin: 'auto',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'
        }
      }}
    >
      <h2 className='text-center text-xl text-violet-500 mb-10'>Update User Role</h2>
      <p>User ID: {userId}</p>
      <p>UserName: {name}</p>
      <p>Email: {email}</p>
      <label htmlFor="role">Role:</label>
      <select
        id="role"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="User">User</option>
        <option value="admin">admin</option>
      </select>
      <p>
        <button
          className='text-slate-100 bg-violet-500 mb-4 mt-10 w-full py-1 '
          onClick={handleUpdateUserRole}>Update Role</button>
      </p>
      <p>
        <button
          className='text-slate-100 bg-red-500 w-full py-1 '
          onClick={onRequestClose}>Close</button>
      </p>
    </Modal>
  );
};

export default UpdateUserRoleModal;
