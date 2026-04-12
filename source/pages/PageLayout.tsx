import React from 'react';
import Header from '@/shared/components/layout/Header';
import { HeaderSpacer } from '@/shared/components/layout/Header';

interface PageLayoutProps {
  children: React.ReactNode;
  header?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, header = true }) => {
  return (
    <div className="h-full relative">
      {header && <Header />}
      <div className="">
        {header && <HeaderSpacer />}
        {children}
      </div>
      
    </div>
  );
};

export default PageLayout;
