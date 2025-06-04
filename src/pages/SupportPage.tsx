import Header, { HeaderSpacer } from '@/components/layout/Header';
import Support from '@/components/support/Support';
import SupportHeader from '@/components/support/SupportHeader';

const SupportPage = () => {
  return (
    <div>
      <Header />
      <HeaderSpacer />
      <div className="container mx-auto">
        <SupportHeader />
        <div className="lg:p-8">
          <Support />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
