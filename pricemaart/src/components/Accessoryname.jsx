import React, { useContext } from 'react'
import { MyContext } from '../App'
import { Link } from 'react-router-dom'

const Accessoryname = () => {
    let context = useContext(MyContext)
  return (
    <>
          {
          context.accessory &&  <div className='flex lg:hidden justify-around py-2  bg-white shadow-sm  shadow-gray-400'>
          {
            context.accessory.map((item,i)=>{
              return(
                <Link to={`/single-accessory/${item.name }`} key={i}>
                <div key={i} className='flex flex-col  items-center'>
                  <div className='xs:w-[30px] sm:w-[40px]'>
                    <img src={item.images} className='w-full h-full object-cover' alt="" />
                  </div>
                  <span className='capitalize xs:text-[11px] sm:text-[13px]'>{item?.name}</span>

                </div></Link>
              )
            })
          }
        </div>
         }
    </>
  )
}

export default Accessoryname