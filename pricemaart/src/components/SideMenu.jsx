import React, { useState, useRef, useEffect, useContext } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  let context = useContext(MyContext)
  const [openSection, setOpenSection] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="  p-2 md:mr-5 md:-ml-1  nlg:hidden"
      >
         <Menu className="text-white w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" />
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 flex transition-opacity duration-300 ${
          isOpen ? 'bg-black bg-opacity-30' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* Sidebar */}
        <div
          ref={menuRef}
          className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-white shadow-lg z-50 p-3 sm:p-4 overflow-y-auto transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-base sm:text-lg font-semibold mb-5 sm:mb-6">Menu</h2>

          <ul className="divide-y divide-gray-200 text-sm sm:text-base text-gray-800">
          {/* Smartphones */}
<li className="py-2 sm:py-3 cursor-pointer" onClick={() => toggleSection('smartphones')}>
  <div className="flex justify-between items-center">
    <span>SMARTPHONES</span>
    {openSection === 'smartphones' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
  </div>

  {openSection === 'smartphones' && (
    <ul className="mt-2 ml-4 space-y-1 divide-y divide-gray-200 text-gray-600 text-xs sm:text-sm">
      <li>
        <Link onClick={() => setIsOpen(false)} to={'/all-products'} className="block py-1">
          All SmartPhone
        </Link>
      </li>
      {context.allCategories?.categories?.map((item, i) => (
        <li key={i}>
          <Link onClick={() => setIsOpen(false)}  to={`/brand/${item.name}`} className="block py-1">
            <span className='capitalize'>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )}
</li>


            {/* Accessories */}
            <li className="py-2 sm:py-3 cursor-pointer" onClick={() => toggleSection('accessories')}>
              <div className="flex justify-between items-center">
                <span>ACCESSORIES</span>
                {openSection === 'accessories' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              {openSection === 'accessories' && (
               <ul className="mt-2 ml-4 space-y-1 divide-y divide-gray-200 text-gray-600 text-xs sm:text-sm">
               <li>
                 <Link onClick={() => setIsOpen(false)} to={'/all-accessory'} className="block py-1">
                   All Accessories
                 </Link>
               </li>
               {context.accessory?.map((item, i) => (
                 <li key={i}>
                   <Link  onClick={() => setIsOpen(false)}  to={`/single-accessory/${item.name}`} className="block py-1">
                     <span className='capitalize'>{item.name}</span>
                   </Link>
                 </li>
               ))}
             </ul>
              )}
            </li>
<hr />
            {/* Others */}
              <Link to={'/sale-offer'} onClick={() => setIsOpen(false)} >
            <li className="py-2 sm:py-3 hover:bg-gray-100 cursor-pointer">
              <span className='capitalize'>Sales & Offers</span>
            </li>
              </Link>
            <hr />
              <Link to={'/wishlist'} onClick={() => setIsOpen(false)} >
            <li className="py-2 sm:py-3 hover:bg-gray-100 cursor-pointer">
              <span className='capitalize'>WishList</span>
            </li>
              </Link>
           
          </ul>
        </div>

        {/* Clickable area to close sidebar */}
        <div className="flex-1" />
      </div>
    </>
  );
};

export default SideMenu;
  