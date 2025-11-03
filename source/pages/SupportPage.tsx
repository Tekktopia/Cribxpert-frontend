import Support from '@/features/support/components/Support';
import SupportHeader from '@/features/support/components/SupportHeader';

const SupportPage = () => {
  return (
    <div>
      <div className="">
        <SupportHeader />
        <div className="lg:p-8 container mx-auto">
          <Support />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
