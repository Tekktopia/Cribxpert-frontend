import React from "react";

export interface Amenity {
  input: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>;
  icon: string;
  description: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListAmenity = ({ input, icon, description, onChange }: Amenity) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Checkbox */}
      <input
        {...input}  // Spread remaining input attributes like id, name, etc.
        type="checkbox"
        checked={input.checked}  // Ensure checkbox reflects the current checked state
        onChange={onChange}  // Handle change externally via prop
        className="w-5 h-5"
      />
      
      {/* Icon and description */}
      <div className="flex items-center space-x-2">
        {/* Icon */}
        <img src={icon} alt={description} className="w-6 h-6" />
        
        {/* Description */}
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ListAmenity;
