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
      <div className="w-full bg-[#FBFBFB] py-7 px-4 md:px-10">
        <div className="flex flex-col md:flex-row  items-start justify-start gap-8">
          <div>
            <h2 className="text-[20px] text-[#040404] font-[400]">
              Damage and incidentals
            </h2>
          </div>
          <div className="max-w-[1280px]">
            <p className="text-[#6F6F6F] text-[14px]">{damagePolicy}</p>
          </div>
        </div>
      </div>

      {/* Cancellation Section */}
      <div className="w-full bg-[#FBFBFB] py-4 px-4 md:px-10">
        <div className="flex flex-col md:flex-row items-start justify-start gap-8">
          <div>
            <h2 className="text-[20px] text-[#040404] font-[400]">
              Cancellation
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-[1280px]">
            {cancellationPeriods.map((period, index) => (
              <div key={index} className="mb-6">
                <p className="text-[#6F6F6F] text-[14px]">
                  {period.deadline} [{period.refundType}]
                </p>
                <p className="text-[#6F6F6F] text-[14px]">
                  {period.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Information Section - Optional */}
      {importantInfo && (
        <div className="w-full bg-[#FBFBFB] py-2 md:py-6 px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-start justify-start gap-8">
            <div>
              <h2 className="text-[20px] inline-block text-[#040404] font-[400]">
                Important information
              </h2>
            </div>
            <div className="max-w-[1280]">
              <p className="text-[#6F6F6F] text-[14px]">{importantInfo}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyPolicies;
