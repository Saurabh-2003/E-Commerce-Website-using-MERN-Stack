import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, forgotPasswordReset, clearError } from '../slices/profileSlice';
import Loading from '../components/Loading';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.profile);
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }

    if (message) {
      alert(message);
      dispatch(forgotPasswordReset());
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className='grid place-items-center h-[100svh] w-[100svw]'>
          <div>
            <h1 className='text-slate-500 text-xl w-2/3 mx-auto text-center border-b-2 mb-6'>Forgot Password</h1>
            <form
              onSubmit={handleForgotPassword}
              className='h-[200px] w-[300px] bg-slate-100 shadow-lg flex flex-col gap-10 items-center justify-center'>
              <input
                className='px-2 py-2 outline-none'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email'
              />
              <button
                className='font-serif bg-violet-500 hover:bg-violet-700 text-white px-2 py-2 rounded-full'
                type='submit'>
                Send Confirmation Mail
              </button>
            </form>
          </div>
        </main>
      )}
    </>
  );
};

export default ForgotPassword;
