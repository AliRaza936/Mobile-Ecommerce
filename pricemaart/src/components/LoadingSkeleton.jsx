import React from 'react'

const LoadingSkeleton = () => {
  return (
    <>
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="animate-pulse border rounded-md p-4 xs:w-[130px] xs:h-[200px] sm:w-[190px] w-[240px] h-[300px] bg-gray-200"></div>
    ))}
  </>
  )
}

export default LoadingSkeleton