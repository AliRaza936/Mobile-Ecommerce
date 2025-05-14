import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import BASE_URL from "../../apiConfig";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW
  const navigate = useNavigate();
  const searchRef = useRef(null);
let context = useContext(MyContext)
  let fetchProducts = async (searchQuery) => {
    
    if (!searchQuery) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true); // ✅ Start loading
    setShowDropdown(true)
    try {
      let result = await axios.get(`${BASE_URL}/search/combined?q=${searchQuery}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResults(result?.data?.results);
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
      setResults([]);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchProducts(value);
    setSearchTerm(value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowDropdown(false);
    context.setIsOpenPopup(false)
     console.log("setIsSearchOpen triggered to false");
    }
  };

  return (
    <div className="relative xs:w-[100%] sm:w-[100%] md:min-w-[320px] lg:w-[350px] ">
      {/* Search Input */}
      <div className="bg-white rounded-lg overflow-hidden flex border border-gray-300 shadow-sm">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={(e) =>{ e.key === "Enter" && handleSearch()}}
          autoFocus
          placeholder="Search for products..."
          className="w-full outline-none px-3 md:py-[6px] lg:py-2 xs:py-2 md:text-[15px] xs:text-[12px]  sm:py-1.5 sm:text-[12px]"
        />
        <span onClick={handleSearch} className="w-[50px] flex justify-center cursor-pointer items-center text-2xl border-l">
          <IoIosSearch className="xs:text-[16px] sm:text-2xl text-3xl text-gray-600" />
        </span>
      </div>

      {(showDropdown && query.trim()) && (loading || results.length > 0 || (!loading && results.length === 0)) && (
  <div
    ref={searchRef}
    className="absolute w-full  bg-white shadow-lg rounded-lg mt-1 max-h-[400px] py-2 z-[3] overflow-y-auto border border-gray-200"
  >
    {loading ? (
      <div className="text-center py-4 text-gray-500 text-sm">Loading...</div>
    ) : results.length > 0 ? (
      results.map((product) => (
        <div
          key={product._id}
          className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            const route = product.type === "accessory"
              ? `/accessory-product/${product._id}`
              : `/product/${product._id}`;
            navigate(route);
            setShowDropdown(false);
    context.setIsOpenPopup(false)

          }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="xs:w-12 xs:h-12 w-14 h-14 object-cover rounded-md mr-3"
          />
          <div className="flex-1">
            <h3 className="xs:text-[12px] text-sm font-medium text-wrap">{product.name}</h3>
            <p className="text-xs text-gray-500">
              {product.countInStock !== 0 ? (
                <span className="xs:text-[11px] text-green-600">In Stock</span>
              ) : (
                <span className="xs:text-[11px] text-red-600">Out of Stock</span>
              )}
            </p>
          </div>
          <p className="xs:text-[13px] text-sm font-semibold text-gray-800">
            Rs. {product.price.toLocaleString()}
          </p>
        </div>
      ))
    ) : (
      <div className="text-center py-4 text-gray-500 text-sm">No products found</div>
    )}
  </div>
)}


    </div>
  );
};

export default Search;
