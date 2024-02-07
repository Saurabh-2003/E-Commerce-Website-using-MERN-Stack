import { useNavigate } from "react-router-dom";
import { star } from "../assets/icons";
const ProductCard = ({product}) => {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate('/product', { state: { product } });
  };
  return (
    <div className=' cursor-pointer dark:bg-black dark:hover:bg-zinc-700  hover:shadow-lg 
      hover:-translate-y-3 p-6 flex  flex-col 
      w-[200px] h-[300px] max-sm:w-full max-sm:items-center bg-slate-50/80 transition-all ease-in-out 
        duration-500' onClick={goToProduct}>
        <img src = {product.images[0].url} alt={product.name} className='w-[150px] h-[150px]'/>
        <div className='mt-8 flex justify-start gap-2.5'>
            <img src={star} alt='rating' width={15} height={15} />
            <p className=' font-mono text-sm leading-normal dark:text-slate-200'>{product.rating}</p>
        </div>
        <h3 className=' dark:text-slate-300 mt-2 text-md leading-normal font-semibold '>{product.name}</h3>
        <p className='mt-2 font-bold font-serif text-purple-500 text-md leading-normal'>{`$${product.price}`}</p>
    </div>
  )
}

export default ProductCard;