import Header from '@/components/layout/Header';
import Support from '@/components/support/Support';
import SupportHeader from '@/components/support/SupportHeader';

const SupportPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-1">
        <SupportHeader />
        <div className="lg:p-8">
          <Support />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
