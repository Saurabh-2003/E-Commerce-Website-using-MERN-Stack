import React, { Fragment, useState } from 'react';
import { Home, Building, MapPinned, MapPin, Phone, Globe2 } from 'lucide-react';
import { Country, State } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { saveTheShippingInfo } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from  "../components/cart/CheckOutSteps"


const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  // Save the shipping info :
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert('Phone Number should be 10 digits Long');
      return;
    }
    dispatch(
      saveTheShippingInfo({
        address,
        city,
        pinCode,
        phoneNo,
        country,
        state,
      })
    );
    navigate('/order/confirm');
  };

  return (
    <main className='bg-gradient-to-tr from-sky-50 to-white h'>

        <CheckOutSteps activeStep ={0}/>

        <div className='min-h-[100svh]  max-sm:min-h-fit   grid place-content-center'>
      <div className='min-w-2/3 min-h-2/3 bg-transparent max-sm:pt-20 max-sm:pb-20 shadow-lg rounded-lg flex flex-col gap-8 box-content max-sm:px-4 max-sm:py-10 px-20 py-20'>
        <h1 className='text-center text-slate-700 text-2xl font-serif border-b-2 border-slate-300'>
          SHIPPING DETAILS
        </h1>
        <form
          encType='multipart/form-data'
          onSubmit={shippingSubmit}
          className='flex flex-col font-mono gap-4 '
        >
          {/* ... other form fields ... */}
          <div className='relative flex items-center'>
            <input
              required
              className='pl-10 pr-2 py-2 w-full'
              type='text'
              placeholder=' Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Home className='absolute ml-2' />
          </div>

          <div className='relative flex items-center'>
            <input
              required
              className='pl-10 pr-2 py-2 w-full'
              type='text'
              placeholder=' City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Building className='absolute ml-1' />
          </div>

          <div className='relative  flex items-center'>
            <input
              required
              className='pl-10 pr-2 py-2 w-full'
              type='number'
              placeholder='PIN Code'
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
            <MapPin className='absolute ml-1' />
          </div>

          <div className='relative flex items-center'>
            <input
              required
              className='pl-10 pr-2 py-2 w-full'
              type='text'
              placeholder=' Phone'
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <Phone className='absolute ml-1' />
          </div>

          <div className='relative flex items-center'>
            <select
              className='pl-10 w-[300px] py-2'
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
            </select>
            <Globe2 className='absolute ml-1' />
          </div>

          {country && (
            <div className='relative flex items-center'>
              <select
                required
                value={state}
                className='pl-10 w-[300px] py-2 '
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
              </select>
              <MapPinned className='absolute ml-1' />
            </div>
          )}

          <button type='submit' disabled={!state} className='bg-violet-500 text-white py-2 rounded-full'>
            Continue
          </button>
        </form>
      </div>
    </div>
    </main>
  );
};

export default Shipping;
