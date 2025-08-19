import React, { useState } from 'react';
import ListingCardSteps from '../ListingComponents/ListingCardSteps';
import { stepData } from './data/Listingsteps';
import PropertyTypeLabelIcon from '../ListingComponents/PropertyTypeLabelIcon';
import { propertyTypeData } from './data/PropertyTypeData';
import { ListingCardStepTwoData } from './data/ListingCardTwoData';
import ListingCardStepTwo from './ListingCardStepTwo';
import ListingMap from './LisitingMap';
import ListAmenity from './ListAmenity';
import { AmenityData } from './ListAmenityData';
import ListingPropertyPage from './ListingPropertyPage';
import PropertyPage from './PropertyPage';
import PricingPage from './Pricing&Availbility';
import HouseRulesPage from './HouseRulesPage';
import { useCreateOrUpdateListingMutation } from '@/features/listing/listingService';

interface RoadmapStepperProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const RoadmapStepper: React.FC<RoadmapStepperProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('');
  const [checkedAmenities, setCheckedAmenities] = useState<
    Record<string, boolean>
  >({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [cleaningFee, setCleaningFee] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');

  // New states for API-required fields:
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateAddr, setStateAddr] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [houseRules, setHouseRules] = useState<string[]>([]);
  const [guestNo, setGuestNo] = useState(1);
  const [size, setSize] = useState(0);
  const [bathroomNo, setBathroomNo] = useState(0);
  const [bedroomNo, setBedroomNo] = useState(0);

  // Helper function to validate ObjectId format
  const isValidObjectId = (id: string): boolean => {
    return typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/) !== null;
  };

  const nextStep = () => {
    if (activeStep < stepData.length - 1) setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    console.log('Selected property type:', type);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setCheckedAmenities((prev) => ({
      ...prev,
      [id]: e.target.checked,
    }));
    console.log(`Checkbox for ${id} changed: ${e.target.checked}`);
  };

  const handleUploadTrigger = () => {
    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) {
      uploadBox.scrollIntoView({ behavior: 'smooth' });
    }
    document.getElementById('upload-start')?.click();
  };

  // Callback for HouseRulesPage to update selected house rules
  const handleHouseRulesChange = (selectedRules: string[]) => {
    setHouseRules(selectedRules);
  };

  // New callback for ListingMap to update location data
  const handleLocationUpdate = (locationData: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    longitude?: number;
    latitude?: number;
  }) => {
    if (locationData.street) setStreet(locationData.street);
    if (locationData.city) setCity(locationData.city);
    if (locationData.state) setStateAddr(locationData.state);
    if (locationData.postalCode) setPostalCode(locationData.postalCode);
    if (locationData.country) setCountry(locationData.country);
    if (typeof locationData.longitude === 'number')
      setLongitude(locationData.longitude);
    if (typeof locationData.latitude === 'number')
      setLatitude(locationData.latitude);
  };

  const [createOrUpdateListing] = useCreateOrUpdateListingMutation();

  const handleCreateListing = async () => {
    try {
      // Add validation before sending
      if (!title.trim()) {
        console.error('Title is required');
        alert('Please enter a title for your listing');
        return;
      }

      if (!selectedPropertyType) {
        console.error('Property type is required');
        alert('Please select a property type');
        return;
      }

      // Validate propertyType is a valid ObjectId
      if (!isValidObjectId(selectedPropertyType)) {
        console.error('Invalid property type ID:', selectedPropertyType);
        alert(
          'Invalid property type selected. Please go back and select a valid property type.'
        );
        return;
      }

      const actualUserId = '64a1b2c3d4e5f6789abcdef0';

      // Get selected amenities and validate they are ObjectIds
      const selectedAmenityIds = Object.keys(checkedAmenities).filter(
        (key) => checkedAmenities[key]
      );
      const validAmenities = selectedAmenityIds.filter((id) =>
        isValidObjectId(id)
      );

      if (selectedAmenityIds.length > 0 && validAmenities.length === 0) {
        console.error('No valid amenity IDs found');
        alert(
          'Invalid amenities selected. Please go back and select amenities again.'
        );
        return;
      }

      // Build the listing data object
      const listingData: any = {
        userId: actualUserId,
        name: title,
        description: description || '',
        amenities: validAmenities,
        propertyType: selectedPropertyType,
        street: street || '',
        city: city || '',
        state: stateAddr || '',
        postalCode: postalCode || '',
        country: country || '',
        longitude: longitude || 0,
        latitude: latitude || 0,
        basePrice: Number(basePrice) || 0,
        securityDeposit: Number(securityDeposit) || 0,
        cleaningFee: Number(cleaningFee) || 0,
        avaliableFrom: availableFrom || '', // Note: typo matches backend
        avaliableUntil: availableUntil || '', // Note: typo matches backend
        guestNo: guestNo || 1,
        size: size || 0,
        bathroomNo: bathroomNo || 0,
        bedroomNo: bedroomNo || 0,
      };

      // Only include houseRules if there are valid ObjectIds
      if (houseRules && houseRules.length > 0) {
        const validHouseRules = houseRules.filter((rule) =>
          isValidObjectId(rule)
        );
        if (validHouseRules.length > 0) {
          listingData.houseRules = validHouseRules;
        }
      }

      // Only include files if there are any
      if (selectedFiles && selectedFiles.length > 0) {
        listingData.files = selectedFiles.map((file) => file.name).slice(0, 5);
      }

      console.log('Sending listing data:', listingData);

      const response = await createOrUpdateListing(listingData).unwrap();
      console.log('Listing created successfully:', response);
      setUploadCompleted(true);
      nextStep();
    } catch (error: any) {
      console.error('Error creating listing:', error);

      if (error?.data) {
        console.error('Server error details:', error.data);
      }
      if (error?.status) {
        console.error('HTTP status:', error.status);
      }

      alert(
        'Failed to create listing. Please check the console for details and try again.'
      );
    }
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
            {propertyTypeData.map((item) => (
              <PropertyTypeLabelIcon
                key={item.type}
                selectedType={selectedPropertyType}
                onSelect={handlePropertyTypeSelect}
                type={item.type}
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
                onChange={(newCount) => {
                  // Update the appropriate state based on the title
                  const titleLower = item.title.toLowerCase();
                  if (titleLower.includes('guest')) {
                    setGuestNo(newCount);
                  } else if (titleLower.includes('bedroom')) {
                    setBedroomNo(newCount);
                  } else if (titleLower.includes('bathroom')) {
                    setBathroomNo(newCount);
                  } else if (
                    titleLower.includes('size') ||
                    titleLower.includes('sqft')
                  ) {
                    setSize(newCount);
                  }
                  console.log(`${item.title} count changed to:`, newCount);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="max-w-[760px] max-h-[560px] mx-auto">
          <ListingMap onLocationUpdate={handleLocationUpdate} />
        </div>
      )}

      {activeStep === 3 && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {AmenityData.map((item) => (
              <ListAmenity
                key={item.inputProps.id}
                inputProps={item.inputProps}
                icon={item.icon}
                description={item.description}
                checked={checkedAmenities[item.inputProps.id] ?? false}
                onChange={(e) => handleCheckboxChange(e, item.inputProps.id)}
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
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
        </div>
      )}

      {activeStep === 5 && (
        <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          <PropertyPage
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
          />
        </div>
      )}

      {activeStep === 6 && (
        <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          <PricingPage
            basePrice={basePrice}
            setBasePrice={setBasePrice}
            securityDeposit={securityDeposit}
            setSecurityDeposit={setSecurityDeposit}
            cleaningFee={cleaningFee}
            setCleaningFee={setCleaningFee}
            availableFrom={availableFrom}
            setAvailableFrom={setAvailableFrom}
            availableUntil={availableUntil}
            setAvailableUntil={setAvailableUntil}
          />
        </div>
      )}

      {activeStep === 7 && (
        <div className="max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <HouseRulesPage
            selectedRules={houseRules}
            onChange={handleHouseRulesChange}
          />
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
            onClick={handleCreateListing}
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
