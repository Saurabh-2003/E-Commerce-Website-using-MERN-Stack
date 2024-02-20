
import {Copyright, Command, Facebook, Twitter, YoutubeIcon} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {

  const location = useLocation();

  // Check if the current route is "/admin"
  const isAdminRoute = location.pathname.startsWith('/admin');

  // If it is an admin route, do not render the Footer
  if (isAdminRoute) {
    return null;
  }

  return (
    <footer>
        <section className=' dark:bg-black/95 m-0 bg-slate-200 transition-all ease-in-out duration-500'>
          <div className='flex flex-wrap flex-col w-full text-slate-500'>
            <div className=' dark:text-slate-400 flex items-start flex-wrap justify-between px-5 pt-2 min-sm:flex-col'>
              <div  className='flex flex-wrap'>
                <ul className=' capitalize  text-sm leading-6 font-bold'>
                  <li>< Command/></li>
                  <li>Become a member</li>
                  <li>Send a feedback</li>
                  <li className='flex justify-between pt-2'> 
                      <Facebook color='blue' fill='white' /> 
                      <Twitter className=' text-blue-500'/> 
                      <YoutubeIcon color='red'/> 
                  </li>
                </ul>
              </div>
              <div className='flex justify-around flex-1 text-sm text-slate-500'>
                    <ul>
                      <li><h1 className='text-black/80 dark:text-slate-300'>GET HELP</h1></li>
                      <li>Order Status</li>
                      <li>Delivery</li>
                      <li>Returns</li>
                      <li>Payment options</li>
                      <li>Contact Us</li>
                      <li>Inquiries</li>
                    </ul>
                    <ul>
                      <li><h1 className='dark:text-slate-300 text-black/80'>ABOUT US</h1></li>
                      <li>News</li>
                      <li>Careers</li>
                      <li>Investors</li>
                      <li>Sustainability</li>
                    </ul>
              </div>
            </div>
            <div className=' flex justify-between items-center px-5 py-3 text-xs text-slate-600'>
              <p className='flex'><Copyright size={13}/> Saurabh Thapliyal. All Rights Reserved. </p>
              <p className="ml-auto"> Terms & Conditions</p>
            </div>
          </div>
        </section>
    </footer>
  )
}

export default Footer