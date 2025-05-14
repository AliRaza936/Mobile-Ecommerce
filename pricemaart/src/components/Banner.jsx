import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BannerSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [hovered, setHovered] = useState(false);

  const changeSlide = (next = true) => {
    if (images.length < 2) return;

    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        next
          ? (prevIndex + 1) % images.length
          : prevIndex === 0
          ? images.length - 1
          : prevIndex - 1
      );
      setFade(false);
    }, 150);
  };

  // Auto slide only if more than one image
  useEffect(() => {
    if (images.length < 2)  return;
    const interval = setInterval(() => changeSlide(true), 5000);
    return () => clearInterval(interval);
  }, [currentIndex, images]);

  // Reset current index when images are loaded
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div
      className="relative w-full  mx-auto overflow-hidden"
      onMouseEnter={() => {
        if(images.length >1){
          setHovered(true)
        }
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative ">
        <img
          src={images[currentIndex]}
          alt="Banner"
          className={`w-full h-auto  object-cover transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Left Arrow */}
        <button
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white xs:p-1 p-2 rounded-full shadow-md transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => changeSlide(false)}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 xs:p-1 rounded-full shadow-md transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => changeSlide(true)}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default BannerSlider;
