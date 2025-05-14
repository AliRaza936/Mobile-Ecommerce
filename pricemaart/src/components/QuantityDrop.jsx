
import { MdOutlineHorizontalRule } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";

const QuantityDrop = (props) => {
    let [inputValue , setInputValue] = useState(props.value || 1)
    let [initialValue, setInitialValue] = useState(props.value )

    let minusValue = ()=>{
        if(inputValue !==1 && inputValue > 0){
            setInputValue(inputValue - 1)

        }
        
    }
    let handleChange = (event) => {
      setInputValue(event.target.value);
    };
    let plusValue = ()=>{
        setInputValue(inputValue + 1)
    }
useEffect(()=>{
  if(props.id){
  setInputValue(1)
}},[props.id])
useEffect(()=>{

  
  
  if (inputValue !== initialValue) {
 
  
    props?.quantity(inputValue)

    setInitialValue(inputValue) 
  }
},[inputValue])
  return (
    <div className="flex border xs:p-1 sm:p-1 md:p-2 rounded-full shadow">
    <button onClick={minusValue} className="  flex justify-center items-center xs:text-[14px]">
                    <MdOutlineHorizontalRule className=" "/>
                  </button>
                  <input
                    type="text"
                    className="text-center outline-none w-16 bg-transparent xs:w-12 xs:text-[12px]"
                    readOnly
                    onChange={handleChange}
                    value={inputValue}
                  />
                  <button onClick={plusValue} className=" flex justify-center items-center xs:text-[14px]">
                    <FiPlus />
                  </button>
    </div>
  )
}

export default QuantityDrop