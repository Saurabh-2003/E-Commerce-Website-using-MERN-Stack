import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, getAllReview , clearReviewsErrors} from '../../slices/adminReviewsSlice';
import toast, { Toaster } from 'react-hot-toast';
import UpdateReviewModal from '../../modals/UpdateReviewModal'
import {Trash} from 'lucide-react'

const AdminReviews = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState('');
  const [selectedReview, setSelectedReview] = useState(null); // State to track the selected review for update
  const { reviews, loading, error , success} = useSelector((state) => state.adminReviews);

  const handleSearch = () => {
    if (productId.trim() !== '') {
      dispatch(getAllReview(productId));
    }
    if(success) {
      toast.success('Reviews Fetched Successfully')
     }
    dispatch(clearReviewsErrors());
  };

  const openUpdateModal = (review) => {
    setSelectedReview(review);
  };

  const closeUpdateModal = () => {
    setSelectedReview(null);
  };

  const handleUpdate = (review) => {
    openUpdateModal(review);
  };

  const handleDelete =  ({id}) => {
     dispatch(deleteReview({productId, id}));
     
     if(success) {
      toast.success('Review Deleted Successfully')
     }
     dispatch(clearReviewsErrors());
  };

 

  return (
    <section className="h-[85vh] w-4/5 bg-white p-8">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4">
              <h2 className="text-xl font-semibold mb-2">Review ID: {review._id}</h2>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
              <p className="flex justify-between mt-4">
                <button onClick={() => handleUpdate(review)} className="bg-violet-500 text-white px-3 py-1 hover:bg-violet-700">
                  Update
                </button>
                <button onClick={() =>handleDelete({"id":review._id})} className=" text-red-500 hover:bg-red-500 px-2 py-2 rounded-full transition-colors hover:text-white">
                    <Trash />
                </button>
              </p>
            </div>
          ))}
        </div>
      )}
      {selectedReview && (
        <UpdateReviewModal
          review={selectedReview}
          isOpen={!!selectedReview}
          onRequestClose={closeUpdateModal}
        />
      )}
    </section>
  );
};

export default AdminReviews;
