import React from 'react';
import Header from '@/components/layout/Header';
import {HeaderSpacer} from '@/components/layout/Header';

interface PageLayoutProps {
  children: React.ReactNode;
  header?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, header = true }) => {
  return (
    <div className="h-full relative">
      {header && <Header />}
      <div className="pb-6 lg:pb-8">
        {header && <HeaderSpacer />}
        {children}
      </div>
      {/* <div className="px-[30px] lg:px-[80px] container mx-auto">
        {children}
      </div> */}
    </div>
  );
};

export default PageLayout;
