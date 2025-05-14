

import { IoSearchSharp } from "react-icons/io5";
const Search = () => {
  return (
    <>
    <div className="max-w-[300px] xs:w-[200px] w-[600px] p-2 flex bg-green-100 rounded-md items-center">
        <p className="pr-2"><IoSearchSharp className="text-2xl"/></p>
        <input type="text" className="outline-none bg-transparent p1 " placeholder="Search here..." />
    </div>
    </>
  )
}

export default Search