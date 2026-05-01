import { useLocation } from 'react-router';
import Footer from './Footer';

// True when the app is running as an installed PWA (standalone window, no browser chrome)
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as unknown as { standalone?: boolean }).standalone === true;

const FooterWrapper = () => {
  const location = useLocation();

  // Only show footer on the landing page — and never inside the installed PWA
  const shouldShowFooter = location.pathname === '/' && !isPWA;

  if (!shouldShowFooter) return null;

  return <Footer />;
};

export default FooterWrapper;
