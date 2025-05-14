import { useEffect, useState } from "react";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Products from "../pages/products";
import AccessoryProduct from "../pages/AccessoryProduct";
import LoadingSkeleton from "./LoadingSkeleton";




const AllAccessoryProduct = ({product ,loading:initialLoading}) => {

    const [isOpen, setIsOpen] = useState(false);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300000);
    const [internalLoading, setInternalLoading] = useState(false);
    const loading = internalLoading || initialLoading;
    const [sortBy, setSortBy] = useState(""); 

    const [currentPage, setCurrentPage] = useState(1);
const [productsPerPage, setProductsPerPage] = useState(20);


  
 
   


      
 


    const filteredProducts = product.filter((item) => {
    

      if (item.price < minPrice || item.price > maxPrice) {
          return false;
      }

      return true;
  });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "") {
            // Default: New to Old
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        
      switch (sortBy) {
       
          case "name-asc":
              return a.name.localeCompare(b.name);
          case "name-desc":
              return b.name.localeCompare(a.name);
          case "price-low-high":
              return a.price - b.price;
          case "price-high-low":
              return b.price - a.price;
          case "date-new-old":
              return new Date(b.createdAt) - new Date(a.createdAt);
          case "date-old-new":
              return new Date(a.createdAt) - new Date(b.createdAt);
          default:
              return 0;
      }
  });
 
    const clearAllFilters = () => {

      setMinPrice('');
      setMaxPrice(300000);
  };

  

    const applyFilters = () => {
      setIsOpen(false);
        setInternalLoading(true);
        setTimeout(() => {
            setInternalLoading(false);
        }, 1000);
    };
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    return (
        <div>
               
        
        <div className="flex  justify-center min-h-[500px] py-5 px-5 relative">
       
       <div className="w-full  max-w-[1300px]">
      <div className="flex justify-between items-center mb-8">
      <button onClick={() => setIsOpen(true)} className="bg-secondary  text-white lg:px-4 lg:py-2 lg:w-[100px] rounded-md  xs:text-[13px] xs:px-2 xs:w-[70px] xs:py-1  sm:text-[14px] sm:px-2 sm:w-[80px] sm:py-1">
           Filter
       </button>
       <p className=" xs:text-[11px] md:text-sm">Result: {sortedProducts.length} Products</p>
       <div className="relative rounded-md overflow-hidden">
                   <select 
                       className="border outline-none py-1 text-[12px]  xs:text-[10px] xs:w-[80px] sm:w-[100px] md:w-[130px] xl:w-[180px]" 
                       value={sortBy} 
                       onChange={(e) => setSortBy(e.target.value)}
                   >
                       <option className="" value="">Sort By</option>
                       
                       <option value="name-asc">Alphabetically, A-Z</option>
                       <option value="name-desc">Alphabetically, Z-A</option>
                       <option value="price-low-high">Price, low to high</option>
                       <option value="price-high-low">Price, high to low</option>
                       <option value="date-new-old">Date, new to old</option>
                       <option value="date-old-new">Date, old to new</option>
                   </select>
               </div>
      </div>
      <div
className={`fixed top-0 left-0 h-full w-64 sm:w-64 md:w-72 bg-white z-20 shadow-lg 
         p-3 sm:p-4 md:p-6 transform transition-transform duration-300 ease-in-out
         ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
>
{/* Close Button */}
<button
className="absolute top-2 right-2 text-lg sm:text-lg md:text-2xl"
onClick={() => setIsOpen(false)}
>
❌
</button>

{/* Clear Filters */}
<button
onClick={clearAllFilters}
className="py-1 rounded-md hover:text-blue-500 underline mb-3 text-sm sm:text-base"
>
Clear All
</button>

{/* Filters Title */}
<h2 className="text-base sm:text-lg md:text-xl font-semibold mb-1">Filters</h2>

{/* RAM Filter */}




{/* Price Filter */}
<div className="mb-4">
<h3 className="font-medium text-sm sm:text-base mb-1">Price</h3>
<label className="text-xs sm:text-sm">Min range:</label>
<input
 type="number"
 className="border w-full p-1 text-sm sm:text-base"
 value={minPrice}
 onChange={(e) => setMinPrice(e.target.value)}
/>
<label className="text-xs sm:text-sm mt-2 block">Max range:</label>
<input
 type="number"
 className="border w-full p-1 text-sm sm:text-base"
 value={maxPrice}
 onChange={(e) => setMaxPrice(e.target.value)}
/>
</div>

{/* Apply Button */}
<button
className="bg-blue-600 text-white w-full py-2 rounded-md text-sm sm:text-base"
onClick={applyFilters}
>
Apply
</button>
</div>

      {/* Products Grid - Fully Responsive */}
   {/* Products Grid - Fully Responsive */}
<div className="grid w-full gap-4 
xsp:grid-cols-2 
xs:grid-cols-2 
sm:grid-cols-3 
md:grid-cols-3 
lg:grid-cols-4 
xl:grid-cols-5
2xl:grid-cols-6"
>
{loading ? (
<div className="flex flex-wrap gap-4 col-span-full justify-center">
 <LoadingSkeleton />
</div>
) : sortedProducts.length > 0 ? (
currentProducts.map((item) =>
 item.type === 'accessory' ? (
   <AccessoryProduct key={item._id} product={item} />
 ) : (
   <Products key={item._id} product={item} />
 )
)
) : (
<div className="col-span-full flex justify-center w-full py-10">
 <p className="text-gray-500 text-lg">No products found</p>
</div>
)}
</div>

       </div>
       {isOpen && <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>}

     
   </div>
   {sortedProducts.length > productsPerPage && (
<div className="flex justify-center my-6 pb-5">

 <Pagination
   count={totalPages}
   page={currentPage}
   onChange={(event, value) => setCurrentPage(value)}
   color="primary"
 />

</div>

)}
   </div>
  
       
    );
};

export default AllAccessoryProduct;