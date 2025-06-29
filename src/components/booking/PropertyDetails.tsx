import React from 'react';

interface PropertyDetailsProps {
  name?: string;
  location?: string;
  rating?: number;
  feedbackCount?: number;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  name = 'Property Name',
  location = 'Federal Capital Territory Gombe',
  rating = 4.5,
  feedbackCount = 115,
}) => (
  <div>
    <h2 className="mt-2 text-[#040404] font-[400] text-[14px]">{name}</h2>
    <p className="text-[#6F6F6F] text-[14px] mb-5">{location}</p>
    <p className="text-[#999999]">
      ⭐{rating} [{feedbackCount} verified positive feedbacks]
    </p>
    <div className="w-full border border-[#cccccc] bg-[#F1E6F14D]/30 mt-4 p-2 rounded-md">
      <p className="text-[#6F6F6F] font-[400] text-[14px]">
        Great choice! Secure your booking now before it's gone.
      </p>
    </div>
  </div>
);

export default PropertyDetails;
