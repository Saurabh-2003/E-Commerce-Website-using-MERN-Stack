import Button from '../Button'
import {ChevronsDown} from 'lucide-react';

const homeImg = "https://images.pexels.com/photos/8721340/pexels-photo-8721340.jpeg?auto=compress&cs=tinysrgb&w=1200";

const Panel1 = () => {
  return (
    <section className='  relative h-full w-full flex '>
        <img className=' z-[-1] h-[100svh] w-full overflow-hidden  object-cover' src={homeImg}/>
        <div className=' absolute pt-20 h-full flex flex-col '>
          <div className='flex flex-col flex-wrap  max-sm:px-2 px-16 lg:w-[60%]'>
            <h1 className=' max-sm:text-[30px]  font-mono text-white font-bold pt-14 text-6xl 
                            max-sm:w-[80%] w-[50%] max-md:text-5xl max-sm:p-2 text-wrap '
                            > Welcome to the <span
                            className=' text-purple-500'>E-Commerce</span> Store</h1>
            <p
            className=' text-wrap font-serif text-slate-100 max-sm:text-[13px]  md:w-[100%]  w-[70] sm:w-full max-sm:px-0'
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