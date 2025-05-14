import { Link } from "react-router-dom";
import QuantityDrop from "../components/QuantityDrop"
import Rating from '@mui/material/Rating';
import { RxCross2 } from "react-icons/rx";
import { IoBagCheckOutline, IoHome } from "react-icons/io5";

import format from 'format-number'




import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "../store/feature/cart/cartSlice";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { useContext } from "react";
import { MyContext } from "../App";

const Cart = () => {


   let dispatch = useDispatch();
   let context = useContext(MyContext)
   let cartItems = useSelector((state) => state?.cart);
 
   let totalAmount = cartItems?.items?.reduce(
    (total,item)=>{
       return total + item.price * item.quantity
    },0)



    let handleChangeQuantity = (id,color,quantity) => {
      console.log(id,color,quantity)
        if(quantity < 1 ) return;
        dispatch(updateCart({id,color,quantity}))
        context.setOpen({open:true,message:'Product Update',severity:'success'})

    };

    let handleRemoveCart = (id,color) => {
        dispatch(removeFromCart({id,color}));
        context.setOpen({open:true,message:'product remove from the cart',severity:'success'})


      };
  
  return (
    <>
        <div className="flex justify-center min-h-[70vh] py-4 items-center px-4 w-full">
    {
        cartItems?.items?.length !== 0 ?
        <div className="max-w-[1150px]  w-full ">
            <h2 className="font-semibold text-center mb-3 text-2xl">YOUR CART</h2>
        <div>
            <p>There are <span className="text-red-600 font-bold">{cartItems?.items?.length}</span> products in your cart</p>
        </div>
     
           <div className=" flex flex-wrap mt-3 gap-5 ">
          <div className=" bg-white  w-full lg:max-w-[730px]  flex-grow  mb-3 rounded-lg overflow-hidden">
            <table className='border w-full  rounded-lg '>
<thead className="bg-gray-200   h-[50px] ">
  <tr className="">
    <th className="w-[45%] text-left "><div className="ml-2 xs:text-[13px]">Product</div></th>
    <th className="w-[10%] xs:hidden  md:visible">Price</th>
    <th className="sm:w-[20%] xs:w-[15%] xs:text-[13px]">Quantity</th>
    <th className="w-[15%] xs:hidden sm:hidden md:table-cell">Subtotal</th>
    <th className="w-[10%] xs:text-[13px]  "><div className="mr-2 xs:hidden">Remove</div></th>

  </tr>
</thead>
<tbody className="">  
    {
        cartItems &&
        cartItems.items.map((item)=>{
            return(
                <tr key={`${item.id}-${item.color}`}  className="border-b   xs:pr-3">
    <td className="flex  mt-3 mb-1 py-3 pl-2 gap-3">
      <div className=" min-w-[70px] xs:min-w-[50px] xs:h-[50px] h-[70px] max-h-[70px] overflow-hidden"  >
        <img className="w-full h-full object-cover" src={item?.pictureUrl} alt="" />
      </div>
      
  <div className="flex flex-col  justify-center">
  <Link to={item.productType == true ? `/accessory-product/${item.id}` : `/product/${item.id}`} className="hover:text-primary mb-1 underline font-medium sm:hidden text-[14px]">{item?.name?.substring(0,20) + '...'}</Link>
  <Link to={item.productType == true ? `/accessory-product/${item.id}` : `/product/${item.id}`} className="hover:text-primary mb-1 underline font-medium xs:hidden text-[14px]">{item?.name}</Link>

<span className="text-nowrap text-[12px] ">color: {item?.color}</span>
<span className="text-nowrap text-[12px] flex">Rs: <p className="font-semibold">{format()(item?.price)}</p></span>
  </div>
    </td>
    <td className="text-center xs:hidden  md:table-cell"><span className="flex gap-1 text-sm font-semibold justify-center "><p>Rs: </p> {format()(item?.price)}</span></td>
    <td className="  0">
         <div className="flex mx-auto justify-center sm:w-[110px] md:w-[120px] xs:w-[80px] border p-1 scale-90  rounded-full shadow">
            <button  onClick={() => {
                        handleChangeQuantity(item?.id, item?.color, item.quantity - 1);
                      }} className="  flex justify-center items-center text-x">
                            <MdOutlineHorizontalRule className=" "/>
                          </button>
                          <input
                            type="text"
                            className="text-center outline-none w-16 xs:w-9 sm:w-12 bg-transparent"
                            
                            onChange={(e)=>{
                                    handleChangeQuantity(
                                        item?.id,
                                        item?.color,
                                        parseInt(e.target.value)
                                    )
                            }}
                            value={item?.quantity}
                          />
                          <button onClick={() => {
                            handleChangeQuantity(item?.id, item?.color, item.quantity + 1);
                          }} className=" flex justify-center items-center ">
                            <FiPlus />
                          </button>
            </div>
    </td>
    <td className=" text-center xs:hidden sm:hidden md:table-cell"><span className="flex justify-center text-sm font-semibold  gap-1 "><p>RS: </p> {format()(item?.price * item.quantity)}</span></td>
    <td className="text-center"><button  onClick={() => {
                    handleRemoveCart(item?.id,item?.color);
                  }} className="text-2xl "><RxCross2 className="hover:text-red-500"/></button></td>
   
  </tr>
            )
        })
    }

  
  
 
 
</tbody>
</table>
          </div>
          
          <div className=" w-full md:w-auto flex-grow ">
            <div className="w-full bg-gray-50  border p-2 pb-4 px-5 rounded-md">
         
              <div className="flex flex-col gap-3 mt-3">
                  <div className="flex justify-between">
                      <h2 className="font-semibold ">SUBTOTAL</h2>
                      
                      <p className="font-semibold ">Rs:{format()(totalAmount)}</p>
                  </div>
                
                  <p className="text-sm text-wrap font-medium text-gray-800">Shipping & taxes calculated <br /> at checkout</p>
              </div>
                  <Link to={'/checkout'}>
                      <button className="text-xl bg-primary rounded-full px-10 p-2 font-semibold text-white  items-center w-full justify-center hover:bg-secondary mt-3  gap-2 flex"> <IoBagCheckOutline className="text-2xl"/> Cheackout</button>
                  </Link>
          </div>
          </div>
          
      </div>
      
       
       
        </div>
     :
     <div className="flex flex-col items-center">
     <div >
       <img src="" alt="" className="w-[150px]"/>
     </div>
     <h2 className="text-[2rem] text-gray-800 xs:text-[20px] text-center"> You don't have any items in your cart.</h2>
     <Link to={'/'}><button className="bg-primary hover:bg-secondary p-2 flex mt-4 mb-10 items-center text-[1.2rem] gap-2 w-[230px] justify-center rounded-full font-semibold text-white"><IoHome className="text-2xl"/>Continue Shoping</button></Link>
   </div>
       
    }
    </div>
    
    
    </>
  )
}

export default Cart