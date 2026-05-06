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
    <section className="py-6">
      <p className="mb-8 text-neutral-600 text-sm md:text-base leading-relaxed tracking-wide">
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          className="text-neutral-900 font-bold text-[10px] uppercase tracking-[0.3em] hover:text-primary transition-colors border-b border-neutral-200 pb-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Show Full Description'}
        </button>
      )}
    </section>
  );
};

export default PropertyDescription;
