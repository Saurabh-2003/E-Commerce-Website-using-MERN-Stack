import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductsForAdmin } from "../../slices/adminProductsSlice"
import {Pen, Trash} from 'lucide-react'

const AdminProducts = () => {
  const dispatch = useDispatch()
  const {products} = useSelector(state => state.adminProducts)
  useEffect(() => {
      dispatch(getProductsForAdmin())
  }, [dispatch])

  return (
    <section className='h-[85svh] w-4/5 rounded-lg bg-white overflow-y-scroll'>
        <div className="flex flex-col ">
        <div className="grid grid-cols-6 place-items-center text-lg text-white bg-violet-500 w-full even:bg-violet-100 px-3 py-2">
          <div className="col-span-2">Product ID</div>
          <div>Product Name</div>
          <div>Quantity</div>
          <div>Price</div>
          <div className="text-right">Actions</div>
        </div>
          {
            products.map((product) => (
                <div key={product._id} className="grid text-slate-700 place-items-center grid-cols-6 w-full even:bg-violet-100 px-1 h-14">
                    <div className="col-span-2">{product._id}</div>
                    <div>{product.name}</div>
                    <div>{product.stock}</div>
                    <div>₹{product.price}</div>
                    <div className="flex gap-3 justify-end">
                        <div className="px-2 py-2 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer rounded-full"><Pen /> </div>
                        <div className="px-2 py-2 text-red-500 hover:bg-red-500 cursor-pointer rounded-full hover:text-white"><Trash/></div>
                    </div>
                </div>
            ))
          }
        </div>
    </section>
  )
}

export default AdminProducts