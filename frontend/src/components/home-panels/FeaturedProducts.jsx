import ProductCard from "../ProductCard";
const FeaturedProducts = ({products}) => {
  return (
    <section id="products"
    className=" dark:bg-black px-[15%] max-sm:mt-12 transition-all ease-in-out duration-500 py-8 ">
      <div className="flex flex-col justify-start gap-5">
        <h2 className=" dark:text-slate-400 text-4xl font-mono font-bold self-center">Our 
        <span className=" text-violet-500 "> Popular</span> Products</h2>
        <p className=" text-center self-center lg:max-w-lg mt-2 font-serif text-slate-500">Experience top notch SuperQuality
          ans style with out sought-after selections.
          Discover a world of comfort , design and value.
        </p>
      </div>
      <div className=" sm:gap-6 gap-14 mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  grid-cols-1">
        {
          products.map((product) =>(
            <ProductCard key={product.name} product={product}/>
          ))
        }
      </div>
    </section>
  )
}

export default FeaturedProducts