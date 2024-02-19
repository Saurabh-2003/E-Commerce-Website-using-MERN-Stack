import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Unlock, Lock } from 'lucide-react';
import PasswordInput from '../components/PasswordInput';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, resetPassword } from '../slices/profileSlice';
import Loading from '../components/Loading';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { error, loading, success } = useSelector(state => state.profile);

  // Use the useParams hook to access the route parameters
  const { token } = useParams();

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, newPassword, confirmPassword }));
    navigate('/login');
  };

  useEffect(() => {
    if (error) {
      console.error(error);
      alert('An error occurred: ' + error);
      dispatch(clearError());
    }

    if (success) {
      alert('Password Reset Successfully');
      dispatch(clearError());
      navigate('/login');
    }
  }, [dispatch, alert, error, success, navigate]);

  useEffect(() => {
    document.title = 'Reset Password';
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className='grid place-items-center h-screen'>
          <section className='relative h-[500px] w-[600px] bg-gray-100 shadow-xl'>
            <form
              onSubmit={handleResetPassword}
              className='flex flex-col mt-28 gap-8 items-center justify-center'>
              <PasswordInput
                icon={Unlock}
                color='text-blue-500'
                label='New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <PasswordInput
                icon={Lock}
                color='text-green-500'
                label='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type='submit'
                className='bg-violet-500 py-2 w-2/3 text-white rounded-full hover:bg-violet-700'>
                Change Password
              </button>
            </form>
            <button
              className='absolute top-1 right-1 bg-red-500 w-8 text-white'
              onClick={() => navigate('/login')}>
              X
            </button>
          </section>
        </main>
      )}
    </>
  );
};

export default ResetPassword;
