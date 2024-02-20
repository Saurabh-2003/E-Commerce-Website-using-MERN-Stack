import {Truck, CircleDollarSign, Headphones, Wallet} from "lucide-react"
const Services = () => {
  return (
    <div className="grid transition-all ease-in-out duration-500 dark:bg-black place-items-center gap-2 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 pt-20 px-28">
        <div className="flex flex-col gap-3">
            <Truck size={40} className=" text-violet-600"/>
            <div>
            <h2 className="font-bold dark:text-slate-300 font-serif">Free Shipping</h2>
            <p className="text-sm text-slate-500">Free Shipping for order above $180</p>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <CircleDollarSign size={40} className=" text-violet-600"/>
            <div>
                <h2 className="font-bold dark:text-slate-300 font-serif">Money Guarentee</h2>
                <p className="text-sm text-slate-500">Free Shipping for order above $180</p>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <Headphones size={40} className=" text-violet-600"/>
           <div>
           <h2 className="font-bold dark:text-slate-300 font-serif">Online Support</h2>
            <p className="text-sm text-slate-500">24 hours a day and 7 days a week</p>
           </div>
        </div>
        <div className="flex flex-col gap-3">
            <Wallet size={40} className=" text-violet-600"/>
            <div>
            <h2 className="font-bold dark:text-slate-300 font-serif">Flexible Payment</h2>
            <p className="text-sm text-slate-500">
                Pay with Card, UPI, Net banking etc.</p>
            </div>
        </div>
    </div>
  )
}

export default Services