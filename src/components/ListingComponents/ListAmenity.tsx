import { useState } from "react";

export interface Amenity {
  input: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>;
  icon: string;
  description: string;
 
}

const ListAmenity = ({ input, icon, description }: Amenity) => {
  const [isChecked, setIsChecked] = useState(input.checked);

  const handleChange = () => {
       setIsChecked((prevState: boolean ) => !prevState); //
  };
  console.log('Checked:', isChecked);

  return (
    <div className="flex justify-center">
      <div className="flex items-center mb-4">
        {/* No need to spread 'input' here, just manage 'checked' */}
        <input 
          {...input} 
          checked={isChecked} 
          onChange={handleChange} 
          type="checkbox" 
          className="mr-2 w-4 h-4" 
        />
        <img src={icon} alt={description} className="w-6 h-6 mr-2" />
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ListAmenity;
