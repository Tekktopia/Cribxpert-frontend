import React from 'react';
import Header from '@/components/layout/Header';
import {HeaderSpacer} from '@/components/layout/Header';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <Header />
      <div className="pb-6 lg:pb-8">
        <HeaderSpacer />
        {children}
      </div>
      {/* <div className="px-[30px] lg:px-[80px] container mx-auto">
        {children}
      </div> */}
    </div>
  );
};

export default PageLayout;
