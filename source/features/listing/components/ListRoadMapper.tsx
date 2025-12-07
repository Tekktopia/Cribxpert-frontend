import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropertyListing } from '@/types';
import ListingCardSteps from '../components/ListingCardSteps';
import { stepData } from './data/Listingsteps';
import PropertyTypeLabelIcon from '../components/PropertyTypeLabelIcon';
import { ListingCardStepTwoData } from './data/ListingCardTwoData';
import ListingCardStepTwo from './ListingCardStepTwo';
import ListingMap from './LisitingMap';
import ListAmenity from './ListAmenity';
import ListingPropertyPage from './ListingPropertyPage';
import PropertyPage from './PropertyPage';
import PricingPage from './Pricing&Availbility';
import HouseRulesPage from './HouseRulesPage';
import { useCreateOrUpdateListingMutation, useGetListingByIdQuery } from '@/features/listing/listingService';
import { useGetPropertyTypesQuery } from '@/features/propertyType/propertyTypeService';
import { useGetAmenitiesQuery } from '@/features/amenities/amenitiesService';
import { useGetHouseRulesQuery } from '@/features/houseRule/houseRuleService';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useNavigate } from "react-router-dom";


interface RoadmapStepperProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  editingListing?: PropertyListing | null;
  onListingSaved?: () => void;
}


interface ListingData {
  userId: string;
  name: string;
  description: string;
  amenities?: string[];
  propertyType: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  longitude: number;
  latitude: number;
  basePrice: number;
  securityDeposit: number;
  cleaningFee: number;
  avaliableFrom: string;
  avaliableUntil: string;
  guestNo: number;
  size: number;
  bathroomNo: number;
  bedroomNo: number;
  houseRules?: string[];
  files?: File[];
}


const RoadmapStepper: React.FC<RoadmapStepperProps> = ({
  currentStep,
  setCurrentStep,
  editingListing,
  onListingSaved,
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const activeStep = currentStep;
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
  const [addressInput, setAddressInput] = useState('');
  const [houseRules, setHouseRules] = useState<string[]>([]);
  const [guestNo, setGuestNo] = useState(1);
  const [size, setSize] = useState(0);
  const [bathroomNo, setBathroomNo] = useState(0);
  const [bedroomNo, setBedroomNo] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hideStatus, setHideStatus] = useState(false); // false = published, true = draft

  // New state to hold created listing ID
  const [listingId, setListingId] = useState<string | null>(null);

  // Populate form when editing a listing
  useEffect(() => {
    if (editingListing) {
      // Set property type
      const propertyTypeId = typeof editingListing.propertyType === 'object' && 'name' in editingListing.propertyType
        ? (editingListing.propertyType as { _id: string })._id
        : (typeof editingListing.propertyType === 'string' ? editingListing.propertyType : '');
      setSelectedPropertyType(propertyTypeId);
      
      // Set basic info
      setTitle(editingListing.name || '');
      setDescription(editingListing.description || '');
      
      // Set property details
      setBedroomNo(editingListing.bedroomNo || 0);
      setBathroomNo(editingListing.bathroomNo || 0);
      setGuestNo(editingListing.guestNo || 1);
      setSize(editingListing.size || 0);
      
      // Set location
      setStreet(editingListing.street || '');
      setCity(editingListing.city || '');
      setStateAddr(editingListing.state || '');
      setPostalCode(editingListing.postalCode || '');
      setCountry(editingListing.country || '');
      setLongitude(editingListing.longitude || 0);
      setLatitude(editingListing.latitude || 0);
      
      // Build address input from location fields
      const addressParts = [
        editingListing.street,
        editingListing.city,
        editingListing.state,
        editingListing.country
      ].filter(part => part && part.trim() !== '');
      setAddressInput(addressParts.join(', '));
      
      // Set pricing
      setBasePrice(editingListing.basePrice?.toString() || '');
      setSecurityDeposit(editingListing.securityDeposit?.toString() || '');
      setCleaningFee(editingListing.cleaningFee?.toString() || '');
      
      // Set availability dates
      if (editingListing.avaliableFrom) {
        const fromDate = new Date(editingListing.avaliableFrom);
        setAvailableFrom(fromDate.toISOString().split('T')[0]);
      }
      if (editingListing.avaliableUntil) {
        const untilDate = new Date(editingListing.avaliableUntil);
        setAvailableUntil(untilDate.toISOString().split('T')[0]);
      }
      
      // Set house rules - will be handled when house rules data loads in separate useEffect
      // This ensures house rules are properly mapped when houseRulesData is available
      
      // Set amenities - will be handled when amenities data loads in separate useEffect
      // This ensures amenities are properly mapped when amenitiesData is available
      
      // Set listing ID for update
      setListingId(editingListing._id);
      
      // Set hideStatus (draft status)
      setHideStatus(editingListing.hideStatus || false);
    }
  }, [editingListing]);

  // Helper function to validate ObjectId format
  const isValidObjectId = (id: string): boolean => {
    return typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/) !== null;
  };

const navigate = useNavigate();

  // Validation function to check if current step is valid (returns boolean)
  const isCurrentStepValid = (): boolean => {
    switch (activeStep) {
      case 0: // Property Type
        return !!selectedPropertyType;

      case 1: // Property Details (guests, bedrooms, bathrooms, size)
        return guestNo > 0 && (bedroomNo > 0 || bathroomNo > 0 || size > 0);

      case 2: // Location
        // Check if address input has text OR if coordinates are set OR if at least one address field is filled
        const hasAddressInput = addressInput.trim().length > 0;
        const hasCoordinates = longitude !== 0 && latitude !== 0;
        const hasAddressFields = city || street || stateAddr || postalCode || country;
        return hasAddressInput || hasCoordinates || hasAddressFields;

      case 3: // Amenities - must select at least one
        return Object.values(checkedAmenities).some(checked => checked === true);

      case 4: // Photos - minimum 5 photos required (existing + new)
        const existingCount = (refetchedListing?.listing?.listingImg || editingListing?.listingImg || []).length;
        return (existingCount + selectedFiles.length) >= 5;

      case 5: // Property Page (title and description) - both required
        return title.trim().length > 0 && description.trim().length > 0;

      case 6: // Pricing & Availability
        return (
          !!basePrice &&
          Number(basePrice) > 0 &&
          !!availableFrom &&
          !!availableUntil
        );

      case 7: // House Rules - optional, no validation needed
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < stepData.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handlePropertyTypeSelect = (id: string) => {
    setSelectedPropertyType(id);
    console.log('Selected property type:', id);
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

  // Callback for ListingMap to update address input value
  const handleAddressInputChange = (value: string) => {
    setAddressInput(value);
  };

  const [createOrUpdateListing, { isLoading: isSaving }] =
    useCreateOrUpdateListingMutation();

  const handleCreateListing = async (saveAsDraft: boolean = false) => {
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

      if (!currentUser?._id) {
        alert('Please sign in before creating a listing.');
        return;
      }

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
      const listingData: ListingData & { id?: string; hideStatus?: boolean } = {
        userId: currentUser._id,
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
        hideStatus: saveAsDraft, // Use parameter instead of state
      };

      // Include listing ID if editing
      if (listingId) {
        listingData.id = listingId;
      }

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
        listingData.files = selectedFiles.slice(0, 8);
      }

      console.log('Sending listing data:', listingData);

      const response = await createOrUpdateListing(listingData).unwrap();
      console.log('Listing saved successfully:', response);
      // Save the listing ID if creating new
      if (!listingId && response?.listing?._id) {
        setListingId(response?.listing?._id);
      }
      if (activeStep === 7) {
        setShowSuccessModal(true); // Show modal only at the last step
        // Call callback immediately to refresh listings (cache invalidation will also trigger refetch)
        if (onListingSaved) {
          // Call immediately to ensure listings are refreshed
          onListingSaved();
        }
      } else {
        nextStep();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        alert(error.message || 'Failed to create listing');
      } else {
        console.error('An unknown error occurred');
        alert('An unknown error occurred while creating the listing.');
      }
    }
  };

  const {
    data: propertyTypeData,
    isLoading:isLoadingPropertyTypes,
    error,
  } = useGetPropertyTypesQuery();
  
  const { data: amenitiesData, isLoading:isLoadingAmenities , error: amenitiesError } = useGetAmenitiesQuery();
  const { data: houseRulesData } = useGetHouseRulesQuery();

  // Refetch listing when editing to get updated images
  const { data: refetchedListing, refetch: refetchListing } = useGetListingByIdQuery(
    listingId || '',
    { skip: !listingId || !editingListing }
  );

  // Update amenities when they load and we're editing
  useEffect(() => {
    if (editingListing && amenitiesData && Array.isArray(amenitiesData) && Array.isArray(editingListing.amenities)) {
      const amenitiesMap: Record<string, boolean> = {};
      editingListing.amenities.forEach((amenityId) => {
        if (typeof amenityId === 'string') {
          amenitiesMap[amenityId] = true;
        } else if (typeof amenityId === 'object' && amenityId !== null && '_id' in amenityId) {
          amenitiesMap[(amenityId as { _id: string })._id] = true;
        }
      });
      setCheckedAmenities(amenitiesMap);
    }
  }, [editingListing, amenitiesData]);

  // Update house rules when they load and we're editing (similar to amenities)
  useEffect(() => {
    if (editingListing && houseRulesData?.data && Array.isArray(houseRulesData.data) && Array.isArray(editingListing.houseRules)) {
      const houseRuleIds = editingListing.houseRules.map((rule) => {
        if (typeof rule === 'string') {
          return rule;
        } else if (typeof rule === 'object' && rule !== null && '_id' in rule) {
          return (rule as { _id: string })._id;
        }
        return '';
      }).filter((id) => id !== '');
      setHouseRules(houseRuleIds);
    }
  }, [editingListing, houseRulesData]);
 
  return (
    <div className="w-full p-6">
      {/* Step Indicators */}
      <div className="relative flex items-center justify-between mb-10">
        <div className="absolute left-0 right-0 top-5 h-1 bg-neutralLight z-0" />
        <div
          className="absolute top-5 h-1 bg-primary z-10 transition-all duration-300"
          style={{ width: `${(activeStep / (stepData.length - 1)) * 100}%` }}
        />
        {stepData.map((_, index) => (
          <div key={index} className="flex flex-col items-center relative z-20">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= activeStep
                  ? 'bg-primary text-white'
                  : 'bg-neutralLight text-neutral'
              }`}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Step Card Content */}
      <div className="flex justify-center text-center mb-8">
  {activeStep === 4 && uploadCompleted ? (
    <div className="text-center flex flex-col items-center">
      <div className='flex justify-center items-end gap-1'>
      <img
        src="/other-icons/review-icon.svg"
        alt="Review photos icon"
        className=" w-8 h-8"
        />
      <h2 className="text-xl font-semibold mb-1">Review Your Photos</h2>
        </div>
      <p className="text-neutral text-sm max-w-md">
        Click to select a cover photo. By default, the first image will be used as the cover.
      </p>
    </div>
  ) : (
    <ListingCardSteps
      title={stepData[activeStep].title}
      description={stepData[activeStep].description}
      image={stepData[activeStep].image}
    />
  )}
</div>




      {/* Step Content */}
      {activeStep === 0 && (
        <div className="max-w-[760px] max-h-[560px] mx-auto">
          {isLoadingPropertyTypes ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
              {propertyTypeData?.data.map((item, index) => (
                <PropertyTypeLabelIcon
                  key={index}
                  selectedType={selectedPropertyType}
                  onSelect={handlePropertyTypeSelect}
                  type={item._id}
                  description={item.name}
                  image={item.icon.fileUrl}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeStep === 1 && (
        <div className="max-w-xl max-h-[560px] mx-auto">
          <div className="grid grid-cols-1 gap-y-4">
            {ListingCardStepTwoData.map((item, index) => {
              // Determine which value to use based on the title
              const titleLower = item.title.toLowerCase();
              let currentValue = item.number; // Default to data value
              
              if (titleLower.includes('guest')) {
                currentValue = guestNo;
              } else if (titleLower.includes('bedroom')) {
                currentValue = bedroomNo;
              } else if (titleLower.includes('bathroom') || titleLower.includes('toilet')) {
                // Toilet is treated as bathroom
                currentValue = bathroomNo;
              } else if (titleLower.includes('size') || titleLower.includes('sqft')) {
                currentValue = size;
              }
              
              return (
                <ListingCardStepTwo
                  key={index}
                  title={item.title}
                  number={currentValue}
                  image={item.image}
                  onChange={(newCount) => {
                    // Update the appropriate state based on the title
                    if (titleLower.includes('guest')) {
                      setGuestNo(newCount);
                    } else if (titleLower.includes('bedroom')) {
                      setBedroomNo(newCount);
                    } else if (titleLower.includes('bathroom') || titleLower.includes('toilet')) {
                      // Toilet updates bathroom count
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
              );
            })}
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="max-w-[760px] mx-auto overflow-visible">
          <ListingMap 
            onLocationUpdate={handleLocationUpdate}
            onInputChange={handleAddressInputChange}
            initialStreet={street}
            initialCity={city}
            initialState={stateAddr}
            initialPostalCode={postalCode}
            initialCountry={country}
            initialLongitude={longitude}
            initialLatitude={latitude}
            initialAddressInput={addressInput}
          />
        </div>
      )}

      {activeStep === 3 && (
  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    {isLoadingAmenities ? (
      <div>Loading...</div>
    ) : amenitiesError ? (
      <div>Error</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
        {amenitiesData?.map((item, index) => (
          <ListAmenity
            key={index}
            inputProps={{ id: item._id }}  
            icon={item.icon?.fileUrl ?? '/path/to/default-icon.png'}  
            description={item.name}
            checked={checkedAmenities[item._id] ?? false}
            onChange={(e) => handleCheckboxChange(e, item._id)}
          />
        ))}
      </div>
    )}
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
            existingImages={(refetchedListing?.listing?.listingImg || editingListing?.listingImg || []).map((img) => ({
              _id: typeof img === 'object' && '_id' in img ? img._id : img.toString(),
              fileUrl: typeof img === 'object' && 'fileUrl' in img ? img.fileUrl : '',
              fileName: typeof img === 'object' && 'fileName' in img ? img.fileName : undefined,
            }))}
            listingId={listingId || undefined}
            onImageDeleted={() => {
              // Refetch the listing to get updated images
              if (listingId) {
                refetchListing();
              }
            }}
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
          className="bg-neutralLight px-8 py-2 rounded disabled:opacity-50"
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
            className="bg-primary hover:bg-hoverColor text-white px-12 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUploading || (!uploadCompleted && ((refetchedListing?.listing?.listingImg || editingListing?.listingImg || []).length + selectedFiles.length) < 5)}
          >
            {uploadCompleted ? 'Next' : isUploading ? 'Uploading...' : 'Upload'}
          </button>
        ) : activeStep === 7 ? (
          <div className="flex gap-3">
            <button
              onClick={() => handleCreateListing(true)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-4 rounded transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              onClick={() => handleCreateListing(false)}
              className="bg-primary hover:bg-hoverColor text-white px-8 py-4 rounded transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? 'Publishing...' : editingListing ? 'Update & Publish' : 'Publish Listing'}
            </button>
          </div>
        ) : (
          <button
            onClick={nextStep}
            className="bg-primary hover:bg-hoverColor text-white px-12 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isCurrentStepValid()}
          >
            Next
          </button>
        )}
      </div>
      {showSuccessModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-sm w-[717px] max-w-full p-6 h-[546px] text-center relative">
      

  {/* Close icon */}
  <img
    src="/other-icons/x_icon.svg"
    alt="Close modal"
    className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
    onClick={() => setShowSuccessModal(false)}
  />

  <div className="flex flex-col items-center justify-center h-[80%] px-4">
    <h2 className="text-[25px] font-bold mb-4">
      Listing Created Successfully
    </h2>

    <p className="text-[16px] max-w-[430px] text-neutral">
      It has been listed! You can now view it on your dashboard or share it with potential renters.
    </p>
  </div>

  <div className="flex justify-center gap-4">
    {/* View Listing button */}
    <button
      onClick={() => {
        setShowSuccessModal(false);
        if (listingId) {
          navigate(`/listing/${listingId}`); // React Router
        } else {
          console.warn("No listingId available for navigation.");
        }
      }}
      className="bg-primary text-white px-6 py-2 rounded hover:bg-hoverColor transition"
    >
      View Listing
    </button>

    {/* Dashboard button */}
    <button
      onClick={() => {
        setShowSuccessModal(false);
        navigate('/'); // 
      }}
      className="bg-neutralLight text-black px-6 py-2 rounded hover:bg-gray-300 transition"
    >
      Go to Dashboard
    </button>
  </div>

</div>

  </div>
)}


    </div>
  );
};

export default RoadmapStepper;
