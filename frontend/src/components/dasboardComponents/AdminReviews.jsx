import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllReview } from '../../slices/adminReviewsSlice';

const AdminReviews = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState('');
  const { reviews, loading, error } = useSelector(state => state.adminReviews);

  const handleSearch = () => {
    if (productId.trim() !== '') {
      dispatch(getAllReview(productId));
    }
  };

  return (
    <section className='h-[85vh] w-4/5 bg-white p-8'>
      <h1 className='text-2xl font-bold mb-4'>Reviews</h1>
      <div className='flex items-center mb-4'>
        <input
          type='text'
          placeholder='Enter Product ID'
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className='mr-2 p-2 border rounded'
        />
        <button onClick={handleSearch} className='p-2 bg-blue-500 text-white rounded'>Search</button>
      </div>
      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className='grid grid-cols-1 gap-4'>
          {reviews.map((review) => (
            <div key={review._id} className='border p-4'>
              <h2 className='text-xl font-semibold mb-2'>Review ID: {review._id}</h2>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminReviews;
