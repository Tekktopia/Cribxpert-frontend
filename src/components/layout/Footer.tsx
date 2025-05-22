import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#730071] text-white mt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CribXpert</h3>
            <p className="text-sm text-gray-200 mb-4">
              Find your perfect short-term accommodation with ease.
              Discover amazing properties for your next stay.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-gray-300"><FaLinkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/discover" className="hover:underline">Find Properties</Link></li>
              <li><Link to="/saved-listings" className="hover:underline">Saved Listings</Link></li>
              <li><Link to="/my-bookings" className="hover:underline">My Bookings</Link></li>
              <li><Link to="/payments" className="hover:underline">Payment Options</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/support" className="hover:underline">Help Center</Link></li>
              <li><Link to="/support-info" className="hover:underline">FAQs</Link></li>
              <li><Link to="#" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@cribxpert.com</li>
              <li>Phone: +234 123 456 7890</li>
              <li>Address: 123 Main Street, Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-purple-400 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} CribXpert. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;