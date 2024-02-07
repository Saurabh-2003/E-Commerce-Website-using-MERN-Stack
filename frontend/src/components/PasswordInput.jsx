import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ label, value, onChange, icon: Icon, color}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='w-2/3 relative flex items-center'>
      <input
        type={showPassword ? 'text' : 'password'}
        className='w-full py-3 pl-12 pr-12 border border-gray-300'
        value={value}
        onChange={onChange}
        placeholder={label}
      />
      <Icon className={`absolute ml-2 ${color}`} size={30} />
      <div
        onClick={togglePasswordVisibility}
        className='cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2'
      >
        {showPassword ? (
          <EyeOff size={30} className='text-slate-500' />
        ) : (
          <Eye size={30} className='text-slate-400' />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
