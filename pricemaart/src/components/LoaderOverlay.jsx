import React from "react";
import { useSelector } from "react-redux";

const LoaderOverlay = ({loading}) => {


  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="bg-white rounded-md p-4 shadow-lg">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoaderOverlay;
