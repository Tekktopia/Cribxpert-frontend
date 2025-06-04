import React from 'react';

// Smoking Allowed:

const Rules = () => {
  return (
    <div className="text-[#6F6F6F] p-4">
      <div className="flex lg:flex-row flex-col justify-between lg:items-center mb-4">
        <div className="mb-4 lg:mb-1">
          <h1 className="font-semibold text-[#313131]">Rules</h1>
        </div>
        <div className="flex flex-col gap-3 lg:gap-6 mb-4 lg:mb-0">
          <div className="flex lg:items-center gap-2">
            <p className="flex flex-col lg:flex-row  lg:items-center gap-2">
              <span className="font-semibold">Smoking Allowed:</span>
              No
            </p>
          </div>
          <div className="flex lg:items-center gap-2">
            <p className="flex flex-col lg:flex-row  lg:items-center gap-2">
              <span className="font-semibold">Pets Allowed: </span>
              No
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:gap-6">
          <div className="flex lg:items-center  gap-2">
            <p className="flex flex-col lg:flex-row  lg:items-center gap-2">
              <span className="font-semibold">Food Allowed:</span>
              {/* boilerplate */}yes
            </p>
          </div>
          <div className="flex lg:items-center gap-2">
            <p className="flex flex-col lg:flex-row  lg:items-center gap-2">
              <span className="font-semibold">Party Allowed:</span>
              {/* boilerplate */}
              yes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
