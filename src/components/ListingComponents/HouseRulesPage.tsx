import React from 'react';
import { ListingHouseRulesData, HouseRule } from './ListingHouseRulesData';
import ListAmenity from './ListAmenity';

interface HouseRulesPageProps {
  selectedRules: string[];                // array of selected rule IDs
  onChange: (selectedRules: string[]) => void;
}

const HouseRulesPage: React.FC<HouseRulesPageProps> = ({ selectedRules, onChange }) => {
  // Handle checkbox changes to add/remove rule IDs
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      onChange([...selectedRules, id]);
    } else {
      onChange(selectedRules.filter(ruleId => ruleId !== id));
    }
  };

  // Split rules into two columns for layout
  const firstColumn = ListingHouseRulesData.slice(0, 4);
  const secondColumn = ListingHouseRulesData.slice(4);

  return (
    <div className="ml-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-x-4 w-full max-w-[700px]">
        {/* First Column */}
        <div className="flex flex-col gap-y-2">
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
        <div className="flex flex-col gap-y-2 ml-12">
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
