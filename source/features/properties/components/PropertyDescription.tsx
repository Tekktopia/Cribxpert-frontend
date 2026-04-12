import React, { useState } from 'react';

interface PropertyDescriptionProps {
  description: string;
  maxLength?: number;
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({
  description,
  maxLength = 300,
}) => {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = description.length > maxLength;

  const displayText =
    expanded || !shouldTruncate
      ? description
      : `${description.substring(0, maxLength)}...`;

  return (
    <section className="py-4 sm:py-6">
      <h3 className="font-medium text-lg sm:text-xl text-[#050505] mb-3 sm:mb-4">
        About this property
      </h3>
      <p className="mb-4 sm:mb-5 text-sm sm:text-[14px] md:text-base text-[#313131] font-[400] leading-6 sm:leading-7">
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          className="text-[#6F6F6F] font-[400] text-sm sm:text-[14px] hover:text-[#050505] transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'see less' : 'see more'}
        </button>
      )}
    </section>
  );
};

export default PropertyDescription;
