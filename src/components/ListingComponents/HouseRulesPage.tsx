import React, { useState } from "react";
import { ListingHouseRulesData } from './ListingHouseRulesData'; // Correct path
import ListAmenity from './ListAmenity';

const HouseRulesPage = () => {
  const [rulesState, setRulesState] = useState(ListingHouseRulesData);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedRules = rulesState.map(rule =>
      rule.input.id === id
        ? { ...rule, input: { ...rule.input, checked: e.target.checked } }
        : rule
    );
    setRulesState(updatedRules);  // Update the state with the modified rule
  };

  // Split rulesState into two separate arrays: 
  const firstColumn = rulesState.slice(0, 4); // First 4 items
  const secondColumn = rulesState.slice(4);   // Remaining items

  return (
    <>
    <div className="ml-14">

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-x-4 w-full max-w-[700px]  ">
      {/* First Column */}
      <div className="flex flex-col gap-y-2">
        {firstColumn.map((item) => (
            <ListAmenity
            key={item.input.id}
            input={item.input}
            icon={item.icon}
            description={item.description}
            onChange={(e) => handleCheckboxChange(e, item.input.id || "")}
            />
        ))}
      </div>

      {/* Second Column */}
      <div className="flex flex-col gap-y-2 ml-12">
        {secondColumn.map((item) => (
            <ListAmenity
            key={item.input.id}
            input={item.input}
            icon={item.icon}
            description={item.description}
            onChange={(e) => handleCheckboxChange(e, item.input.id || "")}
            />
        ))}
      </div>
    </div>
            </div>
        <div className="ml-14 mt-6">
            <section>
                <label htmlFor="property-description" className="block mb-2 font-medium">
                    Additional Rules
                </label>
                <textarea 
                    id="property-description"
                    placeholder="Enter any additional rules or information guests should know..."
                    maxLength={2500}
                    className="w-full border border-gray-300 p-2 rounded h-40 resize-none"
                    // value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                />
                {/* <p className="text-sm text-gray-500 mt-1">
                    {description.length}/2500 characters
                </p> */}
            </section>
        </div>
        </>
  );
};

export default HouseRulesPage;
