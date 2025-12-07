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
  // Type the query data - API returns { data: HouseRuleData[] }
  const { data: houseRulesResponse, isLoading, isError } = useGetHouseRulesQuery();

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedRules, id]);
    } else {
      onChange(selectedRules.filter((ruleId) => ruleId !== id));
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading house rules...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error loading house rules.</div>;

  // Extract the data array from the response - API returns { data: HouseRuleData[] }
  // But check if it's already an array (in case API structure is different)
  let rules: HouseRule[] = [];
  
  if (houseRulesResponse) {
    // Check if response is already an array
    if (Array.isArray(houseRulesResponse)) {
      rules = houseRulesResponse as HouseRule[];
    } 
    // Check if response has a data property
    else if (houseRulesResponse.data && Array.isArray(houseRulesResponse.data)) {
      rules = houseRulesResponse.data as HouseRule[];
    }
  }

  // Debug logging
  console.log('House Rules Response:', houseRulesResponse);
  console.log('Extracted Rules:', rules);
  console.log('Selected Rules:', selectedRules);

  if (!rules || rules.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No house rules available.</p>
        <p className="text-sm mt-2">Please contact support if you believe this is an error.</p>
      </div>
    );
  }

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
