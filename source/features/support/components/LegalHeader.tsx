import { supportBanner } from '@/assets';

interface LegalHeaderProps {
  title?: string;
  subtitle?: string;
  lastUpdated?: string;
}

const LegalHeader = ({ 
  title = "Legal Information", 
  subtitle, 
  lastUpdated 
}: LegalHeaderProps) => {
  return (
    <div className="relative min-h-[447px]">
      <div
        className="bg-cover bg-no-repeat absolute inset-0"
        style={{ backgroundImage: `url(${supportBanner})` }}
      >
        <div className="bg-[#1D5C5C66] absolute inset-0">
          <div className="relative flex-col py-6 px-8 h-[447px] w-full flex text-white justify-end">
            <div className="inline-flex flex-col gap-4 items-start lg:w-[650px]">
              <h1 className="font-bold text-4xl">{title}</h1>
              {subtitle && <p className="text-lg font-normal">{subtitle}</p>}
              {lastUpdated && (
                <p className="text-sm font-normal text-white/80">
                  Last Updated: {lastUpdated}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalHeader;