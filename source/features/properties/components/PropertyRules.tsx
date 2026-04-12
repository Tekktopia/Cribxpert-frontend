import React from 'react';

export interface Rule {
  icon: string;
  title: string;
  description: string;
}

interface PropertyRulesProps {
  rules: Rule[];
}

const PropertyRules: React.FC<PropertyRulesProps> = ({ rules }) => {
  // Split rules into two columns for better display
  const midPoint = Math.ceil(rules.length / 2);
  const firstColumnRules = rules.slice(0, midPoint);
  const secondColumnRules = rules.slice(midPoint);

  return (
    <div className="w-full bg-[#FBFBFB] py-6 sm:py-8 px-4 sm:px-10">
      <div className="flex flex-col">
        <h2 className="text-lg sm:text-[20px] text-[#040404] font-medium mb-4 sm:mb-6">
          House Rules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 w-full max-w-[600px]">
          <div className="flex flex-col gap-3">
            {firstColumnRules.map((rule, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-2">
                  <img
                    src={rule.icon}
                    alt={rule.title}
                    className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                  />
                  <p className="text-[#6F6F6F] font-[400] text-sm sm:text-[14px]">
                    {rule.title}
                  </p>
                </div>
                <p className="text-[#6F6F6F] font-[400] text-sm sm:text-[14px] ml-6">
                  {rule.description}
                </p>
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {secondColumnRules.map((rule, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-2">
                  <img
                    src={rule.icon}
                    alt={rule.title}
                    className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                  />
                  <p className="text-[#6F6F6F] font-[400] text-sm sm:text-[14px]">
                    {rule.title}
                  </p>
                </div>
                <p className="text-[#6F6F6F] font-[400] text-sm sm:text-[14px] ml-6">
                  {rule.description}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyRules;
