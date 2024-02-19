import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import ProductReview from '../components/ProductReview';
import { ShoppingBag } from 'lucide-react';
import { Star } from "lucide-react";
import { addItemsToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearReviewErrors, newReview, newReviewReset } from '../slices/reviewSlice';
import Loading from '../components/Loading'
// StarRating Component
const StarRating = ({ rating, onRatingChange }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center mt-4">
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          className={`cursor-pointer text-2xl select-none ${
            star <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

// Review Component
const Review = ({ toggle, productId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const dispatch = useDispatch();
  const {loading, success, error} = useSelector(state=> state.newReview)
  const onReviewSubmit = () => {
    dispatch(newReview({ rating, comment: review, productId: productId }));
  };

  useEffect(() => {
    if(error) {
      alert(error)
      dispatch(clearReviewErrors())
    }
    if(success) {
      alert("Review Submitted Successfully")
      toggle(false)
      dispatch(newReviewReset())
    }

  }, [success, error])

  return (
    <>
      loading ? <Loading />:
      <div className="fixed h-full w-full bg-black/40 backdrop-blur-sm  top-0 pt-28">
      <div className="mx-auto relative  px-6 bg-white max-sm:bg-black/40 backdrop-blur-sm h-[500px] w-[800px]">
        <div className="py-10 h-full w-full">
          <input
            onChange={(e) => setReview(e.target.value)}
            type="text"
            className="w-full bg-gray-100 h-3/4 px-2 rounded-lg"
            placeholder="Write your review..."
          />
          <StarRating rating={rating} onRatingChange={(newRating) => setRating(newRating)} />

          <button
            onClick={onReviewSubmit}
            className="bg-violet-600 w-full mt-6 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>

        <button
          onClick={() => toggle(false)}
          className="bg-red-500 absolute top-1 text-white right-1 text-center w-[25px]"
        >
          X
        </button>
      </div>
    </div>
    </>
  );
};

// Product Component
const Product = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [review, setReview] = useState(false);
  const product = location.state.product;

  if (!product) {
    return <h1>No Product Found</h1>;
  }

  // Add to cart Handle
  const [quantity, setQuantity] = useState(0);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(product._id, quantity));
    alert("Items Added to cart");
  };

  return (
    <section className='flex dark:bg-black flex-col h-full  lg:w-5/5 max-md:w-full  mx-auto pt-28  pb-20'>
      <section className='flex dark:bg-gray-900 px-20 max-md:flex-col pb-10 gap-20 mx-28 py-10 bg-gray-100 rounded-2xl'>
        <section className='w-2/5 h-[70svh]  max-sm:w-full max-sm:px-10  max-sm:h-[60svh] '>
          <ImageCarousel images={product.images} />
        </section>

        {/* Product info */}
        <section className='flex flex-col w-3/5 border-l-2 border-white/50 px-4 '>
          <div className='text-5xl font-mono capitalize dark:text-slate-200 text-slate-700 flex gap-4 items-center'>
            {product.name}
          </div>
          <div className='flex items-center gap-4 font-serif pb-6'>
            <span className='dark:text-slate-300 text-slate-500 capitalize'>{product.category}</span>
            {product.stock !== 0 ? (
              <span className=' border-l-2 pl-4 font-serif text-green-400 '>
                In stock
              </span>
            ) : (
              <span className='border-l-2 pl-4 font-serif text-red-500'>Out of stock</span>
            )}
          </div>
          <div className='flex gap-3 items-center text-sm border-b-2 text-slate-600 pb-2'>
            <Star size={20} fill='gold' color='gold' /> {product.rating} / 5
          </div>
          <div className='text-2xl mt-4 font-serif text-violet-600'> {`$${product.price}`}</div>
          <div className='text-slate-800 mt-6 font-bold text-xl'>Description 
          <p className='text-slate-500 text-sm font-thin'>{product.description}</p></div>

          <div className=' flex flex-col items-center mt-auto'>
            <div className='flex gap-3 mb-4 text-gray-600 text-lg'>
              <div
                className='bg-violet-500 text cursor-pointer rounded-sm w-[25px]
               text-center text-white'
                onClick={() => setQuantity(quantity - 1 < 0 ? 0 : quantity - 1)}
              >
                -
              </div>
              {quantity}
              <div
                className='bg-violet-500 cursor-pointer rounded-sm w-[25px]
               text-center text-white'
                onClick={() =>
                  setQuantity(quantity + 1 > product.stock ? product.stock : quantity + 1)
                }
              >
                +
              </div>
            </div>
            <button
              disabled={quantity === 0}
              onClick={addToCartHandler}
              className='group bg-violet-600 rounded-full py-2 
            hover:bg-violet-500 text-white w-3/5 max-sm:w-full  
            mb-4 flex gap-6 items-center justify-center'
            >
              <ShoppingBag
                className='text-white transition-transform 
                transform duration-300 group-hover:translate-x-2 
                group-hover:-translate-y-1 '
              />
              Add to Cart
            </button>
          </div>
          <button
            onClick={() => setReview(!review)}
            className='bg-blue-600 hover:bg-blue-700 py-2 text-white'
          >
            Submit Review
          </button>
        </section>
      </section>

      <section>
        <ProductReview reviews={product.reviews} />
      </section>

      {review && <Review productId={product._id} toggle={setReview} />}
    </section>
  );
};

export default Product;
