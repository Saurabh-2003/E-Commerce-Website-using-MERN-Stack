import React from 'react'

const Button = ({label, icon}) => {
  function jumpToProducts() {
    // Get the target element by ID
    const targetElement = document.getElementById('products');
    
    // Scroll to the target element
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  return (
    <button onClick={jumpToProducts} className=' max-sm:px-2 max-sm:py-1 sm:text-sm max-sm:h-8 max-sm:w-fit group transition-all ease-in-out duration-500 font-mono  w-fit px-5 h-10 rounded-full text-white
                        text-xs flex items-center gap-2  bg-gradient-to-tr from-blue-500 to-violet-500'>
        {label}
        <div className='group-hover:translate-y-2 transition-all ease-in-out duration-500'>{icon}</div>
    </button>
  )
}

export default Button