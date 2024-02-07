import { star } from "../../assets/icons"

const ReviewCard = ({imgUrl, customerName, rating, feedback}) => {
  return (
    <div className="flex justify-center items-center flex-col shadow-xl w-80 dark:bg-slate-900 bg-slate-100 h-96 rounded-3xl">
        <img src={imgUrl} className="rounded-full object-cover w-[120px] h-[120px]"/>
        <p className="mt-6 max-w-sm text-center  text-sm">{feedback}</p>
        <div className="mt-3 flex justfy-center items-center gap-2.5">
            <img src={star} height={16} width={16} className="object-contain m-0"/>
            <p className="text-sm font-montserrat text-slate-gray">{rating}</p>
        </div>
        <h3 className="mt-1 font-palanquin text-xl text-center font-bold">{customerName}</h3>
    </div>
  )
}

export default ReviewCard