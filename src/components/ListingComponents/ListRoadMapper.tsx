import React, { useState } from 'react';
import ListingCardSteps from '../ListingComponents/ListingCardSteps';
import { stepData } from '../ListingComponents/Listingsteps';
import PropertyTypeLabelIcon from '../ListingComponents/PropertyTypeLabelIcon';
import { propertyTypeData } from '../ListingComponents/PropertyTypeData';
import { ListingCardStepTwoData } from './ListingCardTwoData';
import ListingCardStepTwo from './ListingCardStepTwo';
import ListingMap from './LisitingMap';
import ListAmenity from './ListAmenity';
import { AmenityData } from './ListAmenityData';
import ListingPropertyPage from './ListingPropertyPage';

const RoadmapStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < stepData.length - 1) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <div className="w-full p-6">
      {/* Step Indicators (hide on step 5) */}
      {activeStep !== 4 && (
        <div className="relative flex items-center justify-between mb-10">
          <div className="absolute left-0 right-0 top-5 h-1 bg-gray-300 z-0" />
          <div
            className="absolute top-5 h-1 bg-[#1D5C5C] z-10 transition-all duration-300"
            style={{ width: `${(activeStep / (stepData.length - 1)) * 100}%` }}
          />
          {stepData.map((_, index) => (
            <div key={index} className="flex flex-col items-center relative z-20">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= activeStep
                    ? 'bg-[#1D5C5C] text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step Content */}
    {activeStep !== 4 && (
  <div className="flex justify-center text-center mb-8">
    <ListingCardSteps
      title={stepData[activeStep].title}
      description={stepData[activeStep].description}
      image={stepData[activeStep].image}
    />
  </div>
)}

      {activeStep === 0 && (
        <div className="max-w-[760px] max-h-[560px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-4">
            {propertyTypeData.map((item, index) => (
              <PropertyTypeLabelIcon
                key={index}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div className="max-w-xl max-h-[560px] mx-auto">
          <div className="grid grid-cols-1 gap-y-4">
            {ListingCardStepTwoData.map((item, index) => (
              <ListingCardStepTwo
                key={index}
                title={item.title}
                number={item.number}
                image={item.image}
              />
            ))}
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="max-w-[760px] max-h-[560px] mx-auto">
          <ListingMap />
        </div>
      )}

      {activeStep === 3 && (
        <div className="grid grid-cols-2 mx-auto mt-20 max-w-5xl">
          {AmenityData.map((item) => (
            <ListAmenity
              key={item.input.id}
              input={item.input}
              icon={item.icon}
              description={item.description}
            />
          ))}
        </div>
      )}

      {activeStep === 4 && (
        <div className="flex justify-center mx-auto">
          <ListingPropertyPage nextStep={nextStep} prevStep={prevStep} />
        </div>
      )}

      {/* Navigation for steps 0-3 only (hide on step 5) */}
      {activeStep !== 4 && (
        <div className="flex justify-between items-center mt-8 max-w-[760px] mx-auto w-full">
          <button
            onClick={prevStep}
            disabled={activeStep === 0}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="bg-[#1D5C5C] text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RoadmapStepper;
