import Brands from "../components/home-panels/Brands";
import Panel1 from "../components/home-panels/Panel1";
import CustomerReviews from "../components/home-panels/CustomerReviews";
import FeaturedProducts from "../components/home-panels/FeaturedProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts , productsSelecter} from "../slices/productSlice";
import { useEffect } from "react";
import Services from "../components/home-panels/Services";

const Home = () => {
  const dispatch  = useDispatch();
  const {products, loading, hasErrors} = useSelector(productsSelecter)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])
  
  return (
    <section className=' overflow-x-hidden w-full flex flex-col scroll-smooth flex-wrap'>
      <section>
        <Panel1/>
      </section>
      <section>
        <Services/>
      </section>
      <section>
        <Brands/>
      </section>
      <section>
        <CustomerReviews/>
      </section>
      <section>
        <FeaturedProducts products={products}/>
      </section>
      
    </section>
  )
}

export default Home