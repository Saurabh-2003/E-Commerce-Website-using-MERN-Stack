import { star } from "../../assets/icons"
import {Star} from 'lucide-react'
const ReviewCard = ({imgUrl, customerName, rating, feedback}) => {
  return (
    <div className="flex max-md:flex-col  relative justify-start px-28 gap-28 items-center  h-96 w-full ">
        <img src={imgUrl} className="rounded-full object-cover h-5/6"/>
        <div className="flex flex-col">
            <div className="flex items-center gap-10">
              <h3 className="text-slate-700 dark:text-slate-400 font-mono text-3xl text-center font-bold">{customerName}</h3>
              <div className=" flex items-center  gap-2.5">
                  <Star className=" text-violet-500 fill-violet-500" size={25}/>
                  <p className=" text-[17px] font-serif text-slate-gray">{rating}</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-slate-500 font-serif  text-sm">{feedback}</p>
        </div>

    </div>
  )
}

export default ReviewCard