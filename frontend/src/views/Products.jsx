import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, productsSelecter } from '../slices/productSlice';
import { useEffect, useState } from 'react';
import Paginate from '../components/Paginate';

const Products = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const { products, loading, hasErrors, total, count, filterCount } = useSelector(productsSelecter);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    dispatch(fetchProducts(keyword, 1));
    setCurrentPage(1);
  };

  useEffect(() => {
    console.log('Fetching products with page:', currentPage);
    dispatch(fetchProducts(keyword, currentPage));
  }, [dispatch, currentPage, keyword]);

  return (
    <div className=' py-24 dark:bg-black gap-4 bg-gray-100 flex '>
      <section className='w-1/5 bg-white max-h-[80svh] dark:bg-gray-700/50  rounded-3xl ml-6'>
        <Sidebar setKeyword={setKeyword} onSearch={handleSearch} />
      </section>
      <section className='flex flex-col sm:w-full justify-center items-center gap-10'>
        <h1 className='text-slate-500 border-b-2 w-1/3 text-xl text-center'> PRODUCTS</h1>
        <p className='text-slate-600 font-serif'>Showing Page  {currentPage} of {Math.ceil(total/count)} </p>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-col-1  gap-10 flex-grow px-20  min-h-[100svh]'>
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
        <div>
          {
            total <= count ? "" :
            <Paginate 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              total={total} 
              count={count} 
              maxPagesToShow={2} 
              />
          }
          
        </div>
      </section>
    </div>
  );
};

export default Products;
