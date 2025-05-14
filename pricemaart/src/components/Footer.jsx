
import logo from '/logo.png'


import { Link } from 'react-router-dom';
import { FaFacebookF,  FaWhatsapp, FaTiktok, FaPinterest, FaInstagram, FaSnapchatGhost, FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
const Footer = () => {
    return (
        <footer className="bg-primary border-t py-8 px-4 sm:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm text-gray-700">
    
            {/* Logo and Description */}
            <div className="flex flex-col items-start">
             <Link to={'/'}> <img src={logo} alt="Logo" className="w-24 mb-3" /></Link>
              <p className="font-bold text-lg mb-2 text-white uppercase">Pricemaart</p>
              <div className="h-1 w-10 bg-blue-600 mb-2"></div>
              <p className="mb-4    text-white">
                Your one-stop shop for authentic mobile phones. Retail and wholesale deals on top brands at great prices!
              </p>
    
              {/* Social Icons */}
              <div className="flex flex-wrap gap-2">
              <a   rel="noopener noreferrer" className="bg-blue-700 cursor-pointer text-white p-2 rounded-full text-lg">
  <FaFacebookF />
</a>

<a  rel="noopener noreferrer" className="bg-green-500 cursor-pointer text-white p-2 rounded-full text-lg">
  <FaWhatsapp />
</a>

<a   rel="noopener noreferrer" className="bg-black cursor-pointer text-white p-2 rounded-full text-lg">
  <FaTiktok />
</a>

<a   rel="noopener noreferrer" className="bg-red-600 cursor-pointer text-white p-2 rounded-full text-lg">
  <FaPinterest />
</a>

<a   rel="noopener noreferrer" className="bg-gradient-to-tr cursor-pointer from-yellow-400 via-pink-500 to-purple-600 text-white p-2 rounded-full text-lg">
  <FaInstagram />
</a>

<a   rel="noopener noreferrer" className="bg-yellow-400 cursor-pointer text-white p-2 rounded-full text-lg">
  <FaSnapchatGhost />
</a>

              </div>
            </div>
    
            {/* Spacer on medium screens */}
            <div className="hidden md:block"></div>
    
            {/* Contact Info */}
            <div>
              <h3 className=" font-semibold mb-2 text-base text-white">Contact Us</h3>
              <div className="h-1 w-10 bg-blue-600 mb-3"></div>
              <div className="flex items-start gap-2 mb-2">
                <MdLocationOn className="text-white mt-1" />
                <p className='text-white'>xyz, Punjab, Pakistan</p>
              </div>
              <div className="flex items-start gap-2 mb-2">
                <MdAccessTime className="text-white -1" />
                <p className='text-white'>Sun - Sat : 9:00 AM - 09:00 PM</p>
              </div>
              <div className="flex items-start gap-2 mb-1">
                <FaPhoneAlt className="text-white mt-1" />
                <p className='text-white'>0321-0000000</p>
              </div>
              <div className="flex items-start gap-2 mb-1">
                <FaPhoneAlt className="text-white mt-1" />
                <p className='text-white'>0321-0000000</p>
              </div>
              <div className="flex items-start gap-2">
                <FaPhoneAlt className="text-white mt-1" />
                <p className='text-white'>0313-0000000</p>
              </div>
            </div>
          </div>
        </footer>
      );
}

export default Footer