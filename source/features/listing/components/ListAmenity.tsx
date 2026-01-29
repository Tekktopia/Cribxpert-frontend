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
    <div className="flex items-center justify-start gap-3 sm:gap-4 p-3 sm:p-2 hover:bg-neutralLight transition w-full max-w-full sm:max-w-[300px] sm:mx-auto min-h-[44px] sm:min-h-0">
      <input
        {...inputProps}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 flex-shrink-0"
      />
      <div className="flex items-center gap-2 min-w-0">
        <img src={icon} alt={description} className="w-6 h-6 flex-shrink-0" />
        <span className="text-sm sm:text-base break-words">{description}</span>
      </div>
    </div>
  );
};

export default ListAmenity;
