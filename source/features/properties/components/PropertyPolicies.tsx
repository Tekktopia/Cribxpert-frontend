import React from 'react';

interface CancellationPeriod {
  deadline: string;
  refundType: string;
  description: string;
}

interface PropertyPoliciesProps {
  damagePolicy: string;
  cancellationPeriods: CancellationPeriod[];
  importantInfo?: string;
}

const PropertyPolicies: React.FC<PropertyPoliciesProps> = ({
  damagePolicy,
  cancellationPeriods,
  importantInfo,
}) => {
  return (
    <>
      {/* Damage and Incidentals Section */}
      <div className="w-full py-12 border-t border-neutral-100">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-light tracking-tight text-neutral-900 uppercase">
              Damage <br/> <span className="font-bold">& incidentals</span>
            </h2>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl">{damagePolicy}</p>
          </div>
        </div>
      </div>

      {/* Cancellation Section */}
      <div className="w-full py-12 border-t border-neutral-100">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-light tracking-tight text-neutral-900 uppercase">
              Cancellation <br/> <span className="font-bold">Policy</span>
            </h2>
          </div>
          <div className="w-full md:w-2/3 flex flex-col gap-8">
            {cancellationPeriods.map((period, index) => (
              <div key={index} className="flex flex-col gap-2">
                <p className="text-neutral-900 font-bold text-[10px] uppercase tracking-[0.2em]">
                  {period.deadline} — {period.refundType}
                </p>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-xl">
                  {period.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Information Section - Optional */}
      {importantInfo && (
        <div className="w-full py-12 border-t border-neutral-100">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="w-full md:w-1/3">
              <h2 className="text-2xl font-light tracking-tight text-neutral-900 uppercase">
                Important <br/> <span className="font-bold">Information</span>
              </h2>
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl">{importantInfo}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyPolicies;
