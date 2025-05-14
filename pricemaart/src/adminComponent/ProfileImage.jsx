import { useContext } from 'react'

import { MyContext } from '../App'


const ProfileImage = ({user}) => {
  if (!user || !user.email) {
    return (
      <div className="w-[40px] h-[40px] rounded-full bg-gray-300 animate-pulse" />
    );
  }

  const firstLetter = user.email.charAt(0).toUpperCase();
  return (
    <>
     <div className="border-2 p-[2px] rounded-full border-green-500">
                   <div className="bg-green-400 rounded-full w-[40px] h-[40px] overflow-hidden flex justify-center items-center">
           
                       <span  className='uppercase text-white text-lg font-semibold'>{firstLetter}</span>
                    </div>
                   </div>
    </>
  )
}

export default ProfileImage