import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { IoBagCheckOutline } from 'react-icons/io5';
import { MyContext } from '../App';
import format from 'format-number'
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { IoRadioButtonOn, IoRadioButtonOff } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addOrder } from '../store/feature/order/orderSlice';
import { clearAllCart } from '../store/feature/cart/cartSlice';
import useValidateAuth from '../utils/authutiles';

const Checkout = () => {
  const validateAuth = useValidateAuth();

  const [selected, setSelected] = useState("cod");
let dispatch = useDispatch()
let context = useContext(MyContext)
    let navigate = useNavigate()
    let cartItems = useSelector((state) => state?.cart);
    let [loading ,setLoading] = useState(false)
 
    let [inputField,setinputField] = useState({
        fullName : '',
        country:'Pakistan',
        streetAddressLine1:'',
        streetAddressLine2:'',

        city:'',
        state:'',
        zipCode:'',
        phoneNumber:'',
        email:'',
        products:[],
       
        
        })
        const totalAmount = cartItems && cartItems.items
        ? format()(
            cartItems.items
              .map((product) => Number(product.price) * product.quantity)
              .reduce((total, value) => total + value, 0).toFixed(2)
          )
        : 0;
      let handleChange = (e)=>{
        setinputField({
            ...inputField,
            [e.target.name]:e.target.value
        })
      }
      
      let handleSubmit = async (e) => {

          e.preventDefault()
          if (!validateAuth()) return;
          const userJSON = localStorage.getItem("user");
  
     
          const parsedUser = JSON.parse(userJSON);
          const userId = parsedUser?.userId;
          let products = cartItems?.items.map((product) => {
            return {
              productId: product.id,
             color:product.color,
              quantity: product.quantity,
              price: product.price,
              ram:product.ram,
              weight:product.weight,
              size:product.size,
              modelType:product?.modelType
            };
          });
        
          let orderData = {
            ...inputField,
            products: products,
            amount: totalAmount,
            method:selected,
              address:inputField.streetAddressLine1 + ' ' + inputField.streetAddressLine2

           
          };

          if (inputField.fullName === '') {
            context.setOpen({ open: true, message: 'please fill full name', severity: 'error' })
            return
        }
          if (inputField.country === '') {
            context.setOpen({ open: true, message: 'please fill  country', severity: 'error' })
            return
        }
          if (inputField.streetAddressLine1 === '') {
            context.setOpen({ open: true, message: 'please fill  street address', severity: 'error' })
            return
        }
          if (inputField.city === '') {
            context.setOpen({ open: true, message: 'please fill city', severity: 'error' })
            return
        }
          if (inputField.state === '') {
            context.setOpen({ open: true, message: 'please fill state', severity: 'error' })
            return
        }
          if (inputField.zipCode === '') {
            context.setOpen({ open: true, message: 'please fill zip code', severity: 'error' })
            return
        }
          if (inputField.phoneNumber === '') {
            context.setOpen({ open: true, message: 'please fill phone number', severity: 'error' })
            return
        }
          if (inputField.email === '') {
            context.setOpen({ open: true, message: 'please fill your email', severity: 'error' })
            return
        }
        setLoading(true)

        dispatch(addOrder({inputs:orderData,userId}))
        .unwrap()
        .then((response) => {
          
          if (response?.success == true) {
            
            context.setOpen({ open: true, message: response?.message, severity: 'success' })
            setLoading(false)
            setTimeout(() => {
              dispatch(clearAllCart())
              navigate("/")
      // window.location.reload()
  
            }, 1500);
          } else {
            context.setOpen({ open: true, message: response?.message, severity: "error" });
            setLoading(false)


          }
        })
        .catch((error) => {
          context.setOpen({ open: true, message: error, severity: "error" });
          setLoading(false)


        });
      }
   
  return (
    <div className='flex w-full justify-center pt-5'>
       <div className="flex mt-10 max-w-[1250px] w-full justify-center p-4 xs:p-0">
        {/* <form onSubmit={handleSubmit}> */}
             <form onSubmit={handleSubmit} className="px-5 xs:px-0 w-[100%] md:flex mx-auto">
            <div className='md:w-[50%] sm:w-full xs:w-full xs:pr-3 pr-10 xs:px-5'>

            <h2 className="text-xl mb-4 font-semibold text-gray-700">BILLING DETAILS</h2>
            <TextField fullWidth label="Country" variant="outlined" name='country' onChange={handleChange} value={inputField?.country}     size="small"/>
            <div className='mt-6 flex flex-col gap-1'>
            <label htmlFor="name">Full Name</label>


            <TextField fullWidth id='name' label="Full Name" variant="outlined"name='fullName' onChange={handleChange}   size="small"/>
            </div>
            <div className='mt-5 flex flex-col gap-5'>
               <div className='flex  flex-col gap-1'>
               <label className='' htmlFor="street">Street Address</label>
               <TextField className='' id='street' fullWidth label="House number and street name" variant="outlined" name='streetAddressLine1' onChange={handleChange}   size="small"/>
               </div>
           
            <TextField id='street' fullWidth label="Apartment, suite, unit, etc. (optional)" variant="outlined" name='streetAddressLine2' onChange={handleChange} size="small"/>

            </div>
            <div className='mt-4 flex flex-col gap-2'>
                <label htmlFor="city">Town/City</label>
            <TextField  id='city' fullWidth label="City" variant="outlined"  size="small" name='city' onChange={handleChange} />

            </div>
            <div className='mt-4 flex flex-col gap-2'>
                <label htmlFor="State">State</label>
            <TextField  id='State' fullWidth label="State" variant="outlined" name='state' onChange={handleChange}  size="small"/>

            </div>
            <div className='mt-4 flex flex-col gap-2'>
                <label htmlFor="ZIP">Postcode/ZIP</label>
            <TextField type='number' id='ZIP' fullWidth label="ZIP code" variant="outlined"  size="small" name='zipCode' onChange={handleChange} />

            </div>
            <div className='mt-5 md:flex items-center gap-5'>
        
            <div className='mt-4 flex flex-col gap-2'>
                <label htmlFor="phone">Phone Number</label>

               <TextField type='tel'  
   id='phone' className=''  fullWidth label="03XXXXXXXXX" variant="outlined" name='phoneNumber' onChange={handleChange}  size="small"   inputProps={{
    maxLength: 11,
    pattern: "03[0-9]{9}",
  }}/>
            </div>
               
         
           <div className='mt-4 flex flex-col gap-2'>
                <label htmlFor="email">Email</label>

            <TextField type='email' id='email' fullWidth label="Email Address" variant="outlined" name='email' onChange={handleChange}  size="small"/>
            </div>
               

            </div>
            <div className="mt-5">
                 <div className="max-w-lg mx-auto  bg-white  rounded-lg ">
                   <h2 className="text-lg font-semibold">Method</h2>
                   {/* <p className="text-gray-600 text-sm">All transactions are secure and encrypted.</p> */}
                   
                   {/* PayFast Option */}
                   {/* <div
                     className={`border rounded-lg p-3 mt-4 cursor-pointer ${selected === "payfast" ? "border-blue-500" : "border-gray-300"}`}
                     onClick={() => setSelected("payfast")}
                   >
                     <div className="md:flex items-center gap-3">
                       {selected === "payfast" ? (
                         <IoRadioButtonOn className="text-blue-600 text-xl" />
                       ) : (
                         <IoRadioButtonOff className="text-gray-500 text-xl" />
                       )}
                       <span className=" text-[14px] xs:text-[12px]">PAYFAST (Pay via Debit/Credit/Wallet/Bank Account)</span>
                       <div className="flex gap-1 ml-auto">
                         <FaCcVisa className="text-blue-600 text-xl" />
                         <FaCcMastercard className="text-red-600 text-xl" />
                       </div>
                     </div>
                     {selected === "payfast" && (
                       <div className="border-t mt-3 pt- text-sm flex flex-col justify-center items-center gap-">
                       <div className=" rounded-md ">
                       <CiCreditCard1 className="text-[170px] scale- text-gray-500 xs:text-[120px]"/>
             </div>
             
                         <p className="text-center font- max-w-[350px] xs:text-[13px]">
                         After clicking “Pay now”, you will be redirected to PAYFAST(Pay via Debit/Credit/Wallet/Bank Account) to complete your purchase securely.
                         </p>
                       </div>
                     )}
                   </div> */}
             
                   {/* Cash on Delivery Option */}
                   <div
                     className={`border rounded-lg p-3 mt-2 cursor-pointer ${selected === "cod" ? "border-blue-500" : "border-gray-300"}`}
                     onClick={() => setSelected("cod")}
                   >
                     <div className="flex items-center gap-3">
                       {selected === "cod" ? (
                         <IoRadioButtonOn className="text-blue-600 text-xl" />
                       ) : (
                         <IoRadioButtonOff className="text-gray-500 text-xl" />
                       )}
                       <span className="font-semibold">Cash on Delivery (COD)</span>
                     </div>
                   </div>
                 </div>
              <button type='submit' disabled={loading ? true : false} className="text-xl xs:text-[16px] bg-primary px-10 p-2 font-semibold text-white  items-center w-full justify-center hover:bg-secondary mt-8  gap-2 rounded-md  flex"> { loading  ?'Completing...':'Complete Order'}</button>

            </div>
            </div>
            <div className='xs:w-full xs:mt-4 sm:mt-4 md:mt-0 md:w-[50%]  bg-gray-200 sticky top-10  md:min-h-[100vh] '>
                <div className='p-5 xs:px-4 px-10  sticky top-0 rounded-md  '>
                    <h2 className='text-xl font-semibold'> YOUR ORDER</h2>
                    <br /><hr />
                    <div className='flex my-4  justify-between'>
                        <h2 className='font-semibold'>Products</h2>
                        <h2 className='w-[25%] font-semibold'>SubTotals</h2>
                    </div>
                    <hr />
                    {
                      
                        cartItems.items&&
                        cartItems.items.map((item)=>{
                            return(
                                <div key={`${item?.id}-${item.color}`}className='flex mt-3 items-center   justify-between '>
                                  <div className='flex items-center gap-2'>
                                     <div className='relative xs:w-[60px] xs:h-[60px] w-[70px] h-[70px] rounded-lg border-gray-500 flex justify-center items-center bg-white border'>
                                  <div className='w-[60px] h-[60px] xs:w-[50px] xs:h-[50px]'>
                                    <img src={item?.pictureUrl} alt={item?.name} className='w-full h-full object-cover' />
                                  </div>
                                  <div className='absolute -top-2 w-[20px] h-[20px] rounded-full -right-2 opacity-80 flex justify-center items-center bg-black'>
                                   <span className='text-white'>{item?.quantity}</span>
                                  </div>
                                  </div>


                       <div> 
                       <span className='flex  gap-1 text-[15px] text-gray-800 font-semibold'>{item?.name} </span>
                       <p className='text-sm'>{item?.color}</p>
                       </div>
                                  </div>
                                 
                        <p className='flex w-[30%] '><span>Rs.</span>{format()((item?.price *item?.quantity).toFixed(2))}</p>
                    </div>
                            )
                        })
                    }
                    
                  
                    <div className='flex justify-between mt-5'>
                       <h2 className='text-[14px]'>SubTotal - {cartItems?.items?.length} items</h2>
                                             <p className="font-semibold  w-[30%] flex gap-1 text-green-700"><span>Rs.</span>{
                                                totalAmount
                                             }
                                             </p>
                    </div>
                    <div className='flex justify-between mt-2'>
                       <h2 className='text-[15px]'>Shipping</h2>
                                             <p className=" text-gray-800  w-[30%] flex gap-1">Free
                                             </p>
                    </div>
                    <div className='flex xs:w-[80%] xs:mt-3  justify-between mt-2'>
                       <h2 className='text-xl font-semibold xs:text-[16px]'>TOTAL</h2>
                       <p className="font-semibold text-xl w-[30%] flex gap-1 xs:text-[16px]"><span>Rs.</span>{
                                                totalAmount
                                             }
                                             </p>
                    </div>
                   

                </div>
                
            </div>
            
        </form>
        {/* </form> */}
       
    </div>
    </div>
   
  )
}

export default Checkout