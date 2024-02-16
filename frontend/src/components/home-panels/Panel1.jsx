import Button from '../Button'
import {ChevronsDown} from 'lucide-react';

const homeImg = "https://images.pexels.com/photos/8721340/pexels-photo-8721340.jpeg?auto=compress&cs=tinysrgb&w=1200";

const Panel1 = () => {
  return (
    <section className='  relative h-full w-full flex '>
        <img className=' h-[100svh] w-full brightness-50 overflow-hidden  object-cover' src={homeImg}/>
        <div className=' absolute pt-20 h-full flex flex-col '>
          <div className='flex flex-col flex-wrap  lg:px-36 '>
            <h1 className=' text-slate-100 text-6xl  font-bold text-center  font-mono max-sm:mt-44 mx-auto max-md:mt-18  mt-28 text-wrap '
                            > Welcome to the <span
                            className=' text-purple-500'>E-Commerce</span> Store</h1>
            <p
            className=' text-wrap font-serif text-center  max-sm:hidden text-slate-200 mt-8 text-lg w-full'
            >Welcome to our treasure trove of quality finds, 
              where every click unveils a world of possibilities. 
              Dive into our curated collection of premium products, 
              meticulously chosen to elevate your lifestyle. Uncover 
              unbeatable deals and a seamless shopping experience, 
              making us your ultimate destination. Join our community 
              of savvy shoppers and indulge in the joy of discovering your
               next favorite thing.</p>
          </div>
          <div className=' self-center mt-auto mb-6'><Button icon={<ChevronsDown/> } label="Discover Amazing Products"/></div>
        </div>
      </section>
  )
}

export default Panel1;