import React from 'react';
import { useGetHouseRulesQuery } from '@/features/houseRule/houseRuleService';
import ListAmenity from './ListAmenity';

// Define a type for a single house rule
interface HouseRule {
  _id: string;
  name: string;
  icon?: {
    fileUrl: string;
  };
}

interface HouseRulesPageProps {
  selectedRules: string[];
  onChange: (selectedRules: string[]) => void;
}

const HouseRulesPage: React.FC<HouseRulesPageProps> = ({
  selectedRules,
  onChange,
}) => {
  // Type the query data as an array of HouseRule
  const { data, isLoading, isError } = useGetHouseRulesQuery() as {
    data?: HouseRule[];
    isLoading: boolean;
    isError: boolean;
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedRules, id]);
    } else {
      onChange(selectedRules.filter((ruleId) => ruleId !== id));
    }
  };

  if (isLoading) return <div>Loading house rules...</div>;
  if (isError) return <div>Error loading house rules.</div>;

  const rules: HouseRule[] = data ?? [];
  console.log('House Rules:', rules);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {rules.map((rule) => (
        <ListAmenity
          key={rule._id}
          inputProps={{ id: rule._id }}
          icon={rule.icon?.fileUrl ?? '/path/to/default-icon.png'}
          description={rule.name}
          checked={selectedRules.includes(rule._id)}
          onChange={(e) => handleCheckboxChange(rule._id, e.target.checked)}
        />
      ))}
    </div>
  );
};

export default HouseRulesPage;
