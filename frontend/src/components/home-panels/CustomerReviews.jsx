import ReviewCard from "./ReviewCard"
import { reviews } from "../../constants"
const CustomerReviews = () => {
  return (
    <section className=" dark:bg-black transition-all ease duration-500
        dark:text-slate-400 py-10 box-content">
      <h3 className=" font-mono text-center text-4xl font-bold ">What Our 
        <span className=" text-violet-500"> Customers</span> Say ?
      </h3>
      <p className=" text-slate-500 font-serif m-auto mt-4 max-w-lg text-center">Hear genuine stories from our satisfied customers about their 
        exceptional experiences with us.
      </p>

      <div className="mt-24 flex flex-col lg:mx-40 max-md:mx-0 justify-evenly items-center  gap-14">
      {
        reviews.map((review) => (
          <ReviewCard
            key={review.customerName}
            imgUrl = {review.imgURL}
            customerName = {review.customerName}
            rating = {review.rating}
            feedback = {review.feedback}
          />
        ))
      }
      </div>
    </section>
  )
}

export default CustomerReviews