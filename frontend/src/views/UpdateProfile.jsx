import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, UserCircle } from "lucide-react";
import { clearError, updateProfile, updateProfileReset } from '../slices/profileSlice';
import { loadUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Loading
 from '../components/Loading';
const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const { user, error } = useSelector(state => state.user.user);
  const {isUpdated, loading} = useSelector(state => state.profile)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }
  
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  
    if (isUpdated) {
      console.log("Profile Updated Successfully");
      console.log("isUpdated:", isUpdated);
      dispatch(loadUser());
      navigate('/account');
      dispatch(updateProfileReset());
    }
    
  }, [dispatch, error, isUpdated, user, navigate]); // Add navigate to the dependency array
  
  

  const updateProfileDataChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const handleGoBack = () => {
    navigate('/account')
  }


  return (
    <Fragment>
      {
        loading ? <Loading /> :
        <main className='h-[100svh] box-content grid place-items-center'>
          <div className='bg-gray-100 relative h-2/3 w-2/3  shadow-xl'>
            <h1 className='text-xl text-slate-500 border-b-2 w-2/3 mt-16 mx-auto text-center mb-14'>
              UPDATE PROFILE
            </h1>
            <form 
            className='max-sm:w-full max-sm:h-full mx-auto my-auto flex flex-col items-center justify-center gap-6'
            encType='multipart/form-data'
            onSubmit={updateProfileSubmit}
            >
              <div className='relative flex w-2/3'>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='py-3 pl-10 outline-none pr-4 text-ellipsis w-full'
                />
                <UserCircle className='absolute h-full' size={35} fill='blue' color='white' />
              </div>
              <div className='relative flex w-2/3'>
                <input
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='py-3 pl-10 pr-4 outline-none text-ellipsis w-full'
                />
                <Mail className='absolute h-full' size={35} fill='blue' color='white' />
              </div>

              <div className='bg-white flex gap-3 overflow-hidden items-center w-2/3 relative'>
                <img src={avatar} alt='Avatar' className='h-[45px] w-[45px] rounded-full' />
                <label className=' cursor-pointer w-full  bg-blue-700 hover:bg-blue-500'>
                  <input
                    type='file'
                    onChange={updateProfileDataChange}
                    className='hidden w-1/3' // Hide the actual file input
                  />
                  <span className='text-white cursor-pointer block w-full h-full text-center py-2'>
                    Choose Image
                  </span>
                </label>
              </div>
              <div className='w-full flex items-center justify-center mt-8'>
              <button 
              className='bg-blue-500 px-4 py-2  text-white hover:bg-blue-700 '
              type='submit'
              value='update'
              > Update</button>
              </div>
              <button 
              className='absolute top-1 bg bg-red-500 w-8 text-white right-1'
              onClick={handleGoBack}
              >X</button>
            </form>
          
          </div>
    </main>
      }
    </Fragment>
  );
};

export default UpdateProfile;
