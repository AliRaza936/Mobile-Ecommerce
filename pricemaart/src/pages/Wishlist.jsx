import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/feature/whishList/whishList";
import format from 'format-number'
import { Link } from "react-router-dom";
const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="max-w-4xl min-h-[400px] mx-auto mt-10 bg-white p-6 xs:p-3 rounded-lg ">

        <h2 className="text-2xl font-semibold text-gray-700 xs:text-lg mb-4">Your Wishlist</h2>
      {wishlist.length > 0 ? (
          <table className="w-full border-collapse border  border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border  xs:text-[14px] p-3 text-left">Image</th>
              <th className="border xs:text-[14px] p-3 text-left">Name</th>
              <th className="border xs:text-[14px] p-3 text-left">Price</th>
              <th className="border xs:text-[14px] p-3 text-center"><span className="xs:hidden">Remove</span></th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item) => (
              <tr key={item._id} className="border">
                <td className="border p-3">
                  <img src={item.images[0]} alt="Product" className="lg:w-16 lg:h-16 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-md" />
                </td>
                <td className="border xs:text-[12px] underline p-3"><Link to={`/product/${item._id}`}><p className="hover:text-blue-500">{item.name}</p></Link></td>
                <td className="border  xs:text-[12px] p-3">Rs.{format()(item.price)}</td>
                <td className="border text-center p-3">
                  <button
                    onClick={() => dispatch(removeFromWishlist(item._id))}
                    className="text-red-500 font-semibold text-2xl"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-xl  h-[200px] flex justify-center items-center text-center">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
