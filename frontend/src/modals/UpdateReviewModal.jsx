import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateAReview } from '../slices/adminReviewsSlice';

const UpdateReviewModal = ({ review, isOpen, onRequestClose }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleSubmit = () => {
    dispatch(updateAReview({ productId: review._id, rating, comment }));
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} 
    style={{
      content: {
        width: '400px',
        height: '400px',
        margin: 'auto',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
      }
    }}>
      <h2 className='text-3xl text-violet-500  text-center mb-4'>Update Review</h2>
      <form 
      className=' font-serif flex flex-col gap-y-6 items-start
        '
      onSubmit={handleSubmit}>
          <p className='flex justify-between w-full'>
             <span>Review : </span>
             <span className='bg-slate-100/50 px-4 py-2'>{review._id}</span>
          </p>
          <p className=' flex justify-between w-full'>
            <span>Rating : </span>
            <input 
            className='bg-slate-100/50 px-2 py-2'
            type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
          </p>
          <p className=' flex justify-between w-full'>
            <span>Comment : </span>
          <textarea 
          className='bg-slate-100/50 px-2 py-2 min-h-[150px]'
          value={comment} onChange={(e) => setComment(e.target.value)} />
          </p>
        <button 
        className='bg-violet-500 text-slate-200 hover:text-white hover:bg-violet-700 px-12 py-2'
        type="submit">Update</button>
      </form>
    </Modal>
  );
};

export default UpdateReviewModal;
