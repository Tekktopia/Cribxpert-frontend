import { HeaderSpacer } from '@/shared/components/layout/Header';
import Support from '@/features/support/components/Support';
import SupportHeader from '@/features/support/components/SupportHeader';

const SupportPage = () => {
  return (
    <div>
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
