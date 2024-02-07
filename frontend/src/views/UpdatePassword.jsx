import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Unlock, Lock, Key } from 'lucide-react';
import PasswordInput from '../components/PasswordInput';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { updatePassword } from '../slices/profileSlice';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loading } = useSelector(state => state.profile);

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
    navigate('/account');
  };

  useEffect(() => {
    document.title = 'Change Password';
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className='grid place-items-center h-screen'>
          <section className='relative h-[500px] w-[600px] bg-gray-100 shadow-xl'>
            
            <form onSubmit={handleChangePassword} className='flex flex-col mt-28 gap-8 items-center justify-center'>
              <PasswordInput icon={Key} color='text-yellow-500' label='Old Password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              <PasswordInput icon={Unlock} color='text-blue-500' label='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <PasswordInput icon={Lock} color='text-green-500' label='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button
                type='submit'
                className='bg-violet-500 py-2 w-2/3 text-white rounded-full hover:bg-violet-700'
              >
                Change
              </button>
            </form>
            <button
              className='absolute top-1 right-1 bg-red-500 w-8 text-white'
              onClick={() => navigate('/account')}
            >
              X
            </button>
          </section>
        </main>
      )}
    </>
  );
};

export default UpdatePassword;
