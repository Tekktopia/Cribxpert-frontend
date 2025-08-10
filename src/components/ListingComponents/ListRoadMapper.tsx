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
import PropertyPage from './PropertyPage';
import PricingPage from './Pricing&Availbility';
import HouseRulesPage from './HouseRulesPage';

interface RoadmapStepperProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const RoadmapStepper: React.FC<RoadmapStepperProps> = ({ currentStep, setCurrentStep }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const nextStep = () => {
    if (activeStep < stepData.length - 1) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    console.log(`Checkbox for ${id} changed: ${e.target.checked}`);
  };

  const handleUploadTrigger = () => {
    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) {
      uploadBox.scrollIntoView({ behavior: 'smooth' });
    }
    document.getElementById('upload-start')?.click();
  };

  return (
    <div className="w-full p-6">
      {/* Step Indicators */}
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

      {/* Step Card Content */}
      <div className="flex justify-center text-center mb-8">
        <ListingCardSteps
          title={stepData[activeStep].title}
          description={stepData[activeStep].description}
          image={stepData[activeStep].image}
        />
      </div>

      {/* Step Content */}
      {activeStep === 0 && (
        <div className="max-w-[760px] max-h-[560px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
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
        <div className="ml-[13rem]">
          <div className="grid grid-cols-2 mx-auto mt-15 max-w-5xl gap-y-3">
            {AmenityData.map((item) => (
              <ListAmenity
                key={item.input.id}
                input={item.input}
                icon={item.icon}
                description={item.description}
                onChange={(e) => handleCheckboxChange(e, item.input.id)}
              />
            ))}
          </div>
        </div>
      )}

      {activeStep === 4 && (
        <div className="flex justify-center mx-auto">
          <ListingPropertyPage
            nextStep={nextStep}
            prevStep={prevStep}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            uploadCompleted={uploadCompleted}
            setUploadCompleted={setUploadCompleted}
          />
        </div>
      )}

      {activeStep === 5 && (
        <div className="w-[700px] h-[450px] justify-center mx-auto">
          <PropertyPage />
        </div>
      )}

      {activeStep === 6 && (
        <div className="w-[700px] h-[630px] justify-center mx-auto">
          <PricingPage />
        </div>
      )}

      {activeStep === 7 && (
        <div className="w-[700px] h-[330px] justify-center mx-auto">
          <HouseRulesPage />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-[3rem] max-w-[70rem] mx-auto w-full">
        <button
          onClick={prevStep}
          disabled={activeStep === 0}
          className="bg-gray-300 px-8 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {activeStep === 4 ? (
          <button
            onClick={() => {
              if (uploadCompleted) {
                nextStep();
              } else {
                handleUploadTrigger();
              }
            }}
            className="bg-[#1D5C5C] hover:bg-[#C18B3F] text-white px-12 py-2 rounded transition"
            disabled={isUploading}
          >
            {uploadCompleted ? 'Next' : isUploading ? 'Uploading...' : 'Upload'}
          </button>
        ) : activeStep === 7 ? (
          <button
            onClick={() => {
              console.log('Creating listing...');
            }}
            className="bg-[#1D5C5C] hover:bg-[#C18B3F] text-white px-8 py-4 rounded transition"
          >
            Create Listing
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="bg-[#1D5C5C] hover:bg-[#C18B3F] text-white px-12 py-2 rounded transition"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default RoadmapStepper;
