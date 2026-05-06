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
    <div className="w-full bg-white py-12 border-t border-neutral-100">
      <div className="flex flex-col">
        <h2 className="text-2xl font-light tracking-tight text-neutral-900 mb-10 uppercase">
          House <span className="font-bold">Rules</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 w-full">
          <div className="flex flex-col gap-6">
            {firstColumnRules.map((rule, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100/50">
                    <img
                      src={rule.icon}
                      alt={rule.title}
                      className="w-4 h-4 opacity-60"
                    />
                  </div>
                  <p className="text-neutral-900 font-bold text-[10px] uppercase tracking-[0.2em]">
                    {rule.title}
                  </p>
                </div>
                {rule.description && (
                  <p className="text-neutral-500 text-xs tracking-wide leading-relaxed ml-11">
                    {rule.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {secondColumnRules.map((rule, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100/50">
                    <img
                      src={rule.icon}
                      alt={rule.title}
                      className="w-4 h-4 opacity-60"
                    />
                  </div>
                  <p className="text-neutral-900 font-bold text-[10px] uppercase tracking-[0.2em]">
                    {rule.title}
                  </p>
                </div>
                {rule.description && (
                  <p className="text-neutral-500 text-xs tracking-wide leading-relaxed ml-11">
                    {rule.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyRules;
