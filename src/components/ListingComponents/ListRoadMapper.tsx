import React, { useState } from 'react';

const steps = Array.from({ length: 8 }, (_, i) => `Step ${i + 1}`);

const RoadmapStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="w-full p-6">
      {/* Stepper */}
      <div className="flex justify-between items-center overflow-x-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 min-w-[100px] text-center relative">
            <div
              className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center
                ${index === activeStep ? 'bg-[#1D5C5C] text-white' : 'bg-gray-300 text-gray-700'}
              `}
            >
              {index + 1}
            </div>
            <p className="text-sm mt-2">{step}</p>

            {/* Line connector */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 right-[-50%] h-px bg-gray-300 z-0"></div>
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={activeStep === 0}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={nextStep}
          disabled={activeStep === steps.length - 1}
          className="bg-[#1D5C5C] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoadmapStepper;
