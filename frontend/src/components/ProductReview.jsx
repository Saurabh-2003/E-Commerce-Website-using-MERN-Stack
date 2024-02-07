import React from 'react'

const ProductReview = ({reviews}) => {

  return (
    <section className='pt-28 text-slate-600'>
      <h1 className='text-3xl mx-auto text-center border-b-2 border-slate-300 w-1/4'> Reviews</h1>
      <div className='flex flex-col'>
        {
            reviews.length === 0 ? 
            <div className='text-slate-600 text-center mt-10 capitalize'>
              No Reviews Currently for this Product</div>
             :reviews.map((review) => (
                <div key={review.name} className='bg-white/30  rounded-xl h-[100px] gap-10'>
                    <h1>{review.name}</h1>
                    <p>{review.comment}</p>
                </div>
            ))
        }
    </div>
    </section>
  )
}

export default ProductReview