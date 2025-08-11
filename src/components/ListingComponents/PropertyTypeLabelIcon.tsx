 
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
      className={`p-4 border rounded cursor-pointer text-center ${isSelected ? 'bg-[#1D5C5C]/10 border-[#1D5C5C]' : 'border-gray-300'}`}
    >
      <img src={image} alt={type} className="mx-auto mb-2" />
      <p>{description}</p>
    </div>
  );
};

export default PropertyTypeLabelIcon;