import React from "react";

export interface Amenity {
  inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'type'> & {
    id: string; // make sure id is mandatory
  };
  icon: string;
  description: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListAmenity = ({ inputProps, icon, description, checked, onChange }: Amenity) => {
  return (
    <div className="flex items-center justify-center sm:justify-start sm:space-x-4 p-2 hover:bg-neutralLight transition w-full max-w-[300px] mx-auto">
      <input
        {...inputProps}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 flex-shrink-0"
      />
      <div className="flex items-center space-x-2">
        <img src={icon} alt={description} className="w-6 h-6 flex-shrink-0" />
        <span className="text-sm sm:text-base break-words">{description}</span>
      </div>
    </div>
  );
};

export default ListAmenity;
