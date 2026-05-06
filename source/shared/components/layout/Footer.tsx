import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={`bg-neutral-950 text-white mt-20 ${className}`}>
      <div className="w-full px-[2%] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/CribXpert.svg" alt="CribXpert" className="w-10 h-10 brightness-0 invert" />
              <h3 className="text-2xl font-bold tracking-tight text-white font-sans">CribXpert</h3>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Experience luxury living with curated short-term accommodations. Find your perfect sanctuary for work, travel, or leisure.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-neutral-500 hover:text-secondary premium-transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-secondary premium-transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-secondary premium-transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-secondary premium-transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-6">Explore</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/discover" className="text-neutral-400 hover:text-white premium-transition">
                  Find Properties
                </Link>
              </li>
              <li>
                <Link to="/saved-listings" className="text-neutral-400 hover:text-white premium-transition">
                  Saved Listings
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-neutral-400 hover:text-white premium-transition">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/payments" className="text-neutral-400 hover:text-white premium-transition">
                  Payment Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/support" className="text-neutral-400 hover:text-white premium-transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-neutral-400 hover:text-white premium-transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-neutral-400 hover:text-white premium-transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-neutral-400 hover:text-white premium-transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col">
                <span className="text-neutral-600 text-xs mb-1">Email</span>
                <a href="mailto:info@cribxpert.com" className="text-neutral-400 hover:text-white premium-transition">info@cribxpert.com</a>
              </li>
              <li className="flex flex-col">
                <span className="text-neutral-600 text-xs mb-1">Phone</span>
                <a href="tel:+2341234567890" className="text-neutral-400 hover:text-white premium-transition">+234 123 456 7890</a>
              </li>
              <li className="flex flex-col">
                <span className="text-neutral-600 text-xs mb-1">Address</span>
                <span className="text-neutral-400">123 Main Street, Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <p>© {new Date().getFullYear()} CribXpert. Designed for premium living.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-neutral-400">Security</a>
            <a href="#" className="hover:text-neutral-400">Cookies</a>
            <a href="#" className="hover:text-neutral-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
