import React from 'react';

export interface PropertyTypeLabelIconProps {
  description: string;
  image: string;
}

const PropertyTypeLabelIcon: React.FC<PropertyTypeLabelIconProps> = ({ description, image }) => {
  return (
    <div className="flex flex-col items-center justify-center border border-gray-300 p-2 w-full h-[160px]">
      <img src={image} alt={description} className="w-10 h-10 object-cover" />
      <h2 className="text-center text-sm font-medium">{description}</h2>
    </div>
  );
};

export default PropertyTypeLabelIcon;
