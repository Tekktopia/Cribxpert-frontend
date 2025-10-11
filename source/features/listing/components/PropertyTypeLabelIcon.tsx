 
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
      className={`flex flex-col items-center justify-center p-2 sm:p-4 border rounded cursor-pointer text-center transition-colors duration-200
        ${isSelected ? 'bg-primary/10 border-primary' : 'border-neutralLight'}
        w-full sm:w-auto min-w-[80px]`}
    >
      <img
        src={image}
        alt={type}
        className="mb-1 sm:mb-2 w-12 h-12 sm:w-16 sm:h-16 object-contain"
      />
      <p className="text-[10px] sm:text-sm md:text-base leading-tight">{description}</p>
    </div>
  );
};

export default PropertyTypeLabelIcon;