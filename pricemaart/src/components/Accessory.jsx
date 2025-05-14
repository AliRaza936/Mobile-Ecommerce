import React from 'react'
import { Link } from 'react-router-dom'

const Accessory = ({accessories}) => {

  return (
    <div className='flex justify-around w-full'>
        {
            accessories&& accessories.map((item)=>{
                return(
                    <Link to={`/single-accessory/${item?.name}`} key={item?._id} className=' flex flex-col cursor-pointer group items-center'>
                        <div className='w-[40px]'>
                            <img src={item?.images} className='w-full h-full group-hover:scale-[1.1] transition-all duration-300'  />
                        </div>
                        <h1 className='capitalize text-[11px]'>{item?.name}</h1>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default Accessory