 
 // PropertyTypeData.ts
export interface PropertyTypeItem {
  type: string;
  description: string;
  image: string;
}

 
 interface PropertyTypeLabelIconProps {
  selectedType: string;
  onSelect: (type: string) => void;
  type: string;
  image: string;
  description: string;
}
const PropertyTypeLabelIcon: React.FC<PropertyTypeLabelIconProps> = ({
  selectedType, onSelect, type, image, description
}) => {
  const isSelected = selectedType === type;

  return (
    <div
      onClick={() => onSelect(type)}
      className={`p-3 sm:p-4 border rounded cursor-pointer text-center transition-colors duration-200 
        ${isSelected ? 'bg-[#1D5C5C]/10 border-[#1D5C5C]' : 'border-gray-300'}
        w-full sm:w-auto`}
    >
      <img
        src={image}
        alt={type}
        className="mx-auto mb-2 w-16 h-16 sm:w-20 sm:h-20 object-contain"
      />
      <p className="text-xs sm:text-sm md:text-base">{description}</p>
    </div>
  );
};

export default PropertyTypeLabelIcon;