import { useLocation } from 'react-router';
import Footer from './Footer';

const FooterWrapper = () => {
  const location = useLocation();

  // Only show footer on the landing page (/)
  const shouldShowFooter = location.pathname === '/';

  // Don't render the footer if not on landing page
  if (!shouldShowFooter) {
    return null;
  }

  // Otherwise, render the footer
    // Otherwise, render the footer
  return <Footer />;
};

export default FooterWrapper;
