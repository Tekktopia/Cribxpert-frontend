import React from 'react';
import { ListingHouseRulesData} from './data/ListingHouseRulesData';
import ListAmenity from './ListAmenity';

interface HouseRulesPageProps {
  selectedRules: string[];                // array of selected rule IDs
  onChange: (selectedRules: string[]) => void;
}

const HouseRulesPage: React.FC<HouseRulesPageProps> = ({ selectedRules, onChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      onChange([...selectedRules, id]);
    } else {
      onChange(selectedRules.filter(ruleId => ruleId !== id));
    }
  };

  const firstColumn = ListingHouseRulesData.slice(0, 4);
  const secondColumn = ListingHouseRulesData.slice(4);

  return (
    <div className="mx-4 sm:mx-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-x-8 max-w-[700px] mx-auto">
        {/* First Column */}
        <div className="flex flex-col gap-y-3">
          {firstColumn.map((item) => (
            <ListAmenity
              key={item.inputProps.id}
              inputProps={item.inputProps}
              icon={item.icon}
              description={item.description}
              checked={selectedRules.includes(item.inputProps.id)}
              onChange={(e) => handleCheckboxChange(e, item.inputProps.id)}
            />
          ))}
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-y-3">
          {secondColumn.map((item) => (
            <ListAmenity
              key={item.inputProps.id}
              inputProps={item.inputProps}
              icon={item.icon}
              description={item.description}
              checked={selectedRules.includes(item.inputProps.id)}
              onChange={(e) => handleCheckboxChange(e, item.inputProps.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HouseRulesPage;
