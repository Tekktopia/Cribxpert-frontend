import Support from '@/features/support/components/Support';
import SupportHeader from '@/features/support/components/SupportHeader';
import Footer from '@/shared/components/layout/Footer';

const SupportPage = () => {
  return (
    <div>
      <div className="">
        <SupportHeader title="FAQs" />
        <div className="lg:p-8 container mx-auto">
          <Support />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SupportPage;
