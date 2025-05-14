import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling 200px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-orange-400 text-white hover:bg-orange-600 shadow-gray-600 shadow-lg transition-opacity duration-300"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default BackToTop;
