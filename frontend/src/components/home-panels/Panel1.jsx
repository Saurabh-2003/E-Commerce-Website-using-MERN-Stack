import Button from '../Button'
import {ChevronsDown} from 'lucide-react';

const backgroundImage = "https://images.pexels.com/photos/8721340/pexels-photo-8721340.jpeg?auto=compress&cs=tinysrgb&w=1200";

const Panel1 = () => {
  return (
    <section className='relative h-screen w-full flex items-center'>
      <img className='absolute inset-0 h-full w-full object-cover brightness-50' src={backgroundImage} alt="Background"/>
      <div className='relative z-10 max-w-screen-md mx-auto text-center'>
        <h1 className='text-stone-200 text-6xl font-bold font-mono bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent mb-8'>
        Welcome to the <span
                            className=' bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent'>E-Commerce</span> Marketplace
        </h1>
        <p className='text-slate-200 text-lg font-serif max-w-xl mx-auto mb-8'>
          Explore our curated selection of premium products, handpicked to elevate your lifestyle and fulfill your desires.
        </p>
        <div className='grid place-content-center'>
        <Button icon={<ChevronsDown/>} label="Discover Amazing Products"/>
        </div>
      </div>
    </section>
  )
}

export default Panel1;
