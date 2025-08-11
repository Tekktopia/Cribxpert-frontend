import React from "react";

export interface Amenity {
  inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'type'> & {
    id: string;  // make sure id is mandatory
  };
  icon: string;
  description: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const ListAmenity = ({ inputProps, icon, description, checked, onChange }: Amenity) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        {...inputProps}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5"
      />
      <div className="flex items-center space-x-2">
        <img src={icon} alt={description} className="w-6 h-6" />
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ListAmenity;
