import React from 'react';
import Header from '@/shared/components/layout/Header';
import { HeaderSpacer } from '@/shared/components/layout/Header';

import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
  children: React.ReactNode;
  header?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, header = true }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="h-full relative">
      {header && <Header />}
      <div className="">
        {header && !isHomePage && <HeaderSpacer />}
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
