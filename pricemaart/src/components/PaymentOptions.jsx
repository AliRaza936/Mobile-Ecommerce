import { useState } from "react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { IoRadioButtonOn, IoRadioButtonOff } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { BsCreditCard } from "react-icons/bs";
import code from '/code.svg'
const PaymentOptions = () => {

  return (
    <div className="max-w-lg mx-auto  bg-white  rounded-lg ">
      <h2 className="text-lg font-semibold">Payment</h2>
      <p className="text-gray-600 text-sm">All transactions are secure and encrypted.</p>
      
      {/* PayFast Option */}
      <div
        className={`border rounded-lg p-3 mt-4 cursor-pointer ${selected === "payfast" ? "border-blue-500" : "border-gray-300"}`}
        onClick={() => setSelected("payfast")}
      >
        <div className="flex items-center gap-3">
          {selected === "payfast" ? (
            <IoRadioButtonOn className="text-blue-600 text-xl" />
          ) : (
            <IoRadioButtonOff className="text-gray-500 text-xl" />
          )}
          <span className=" text-[14px]">PAYFAST (Pay via Debit/Credit/Wallet/Bank Account)</span>
          <div className="flex gap-1 ml-auto">
            <FaCcVisa className="text-blue-600 text-xl" />
            <FaCcMastercard className="text-red-600 text-xl" />
          </div>
        </div>
        {selected === "payfast" && (
          <div className="border-t mt-3 pt- text-sm flex flex-col justify-center items-center gap-">
          <div className=" rounded-md ">
          <CiCreditCard1 className="text-[170px] scale- text-gray-500"/>
</div>

            <p className="text-center font- max-w-[350px]">
            After clicking “Pay now”, you will be redirected to PAYFAST(Pay via Debit/Credit/Wallet/Bank Account) to complete your purchase securely.
            </p>
          </div>
        )}
      </div>

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
  );
};

export default PaymentOptions;
