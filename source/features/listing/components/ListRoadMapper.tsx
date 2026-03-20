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
  const [toiletNo, setToiletNo] = useState(0);
  const [bedroomNo, setBedroomNo] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [_hideStatus, setHideStatus] = useState(false); // false = published, true = draft (used in useEffect)

  const [savingAction, setSavingAction] = useState<'draft' | 'publish' | null>(null);

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
      setToiletNo((editingListing as { toiletNo?: number }).toiletNo ?? 0);
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

      case 1: // Property Details (guests, bedrooms, bathrooms, toilet, size)
        return guestNo > 0 && (bedroomNo > 0 || bathroomNo > 0 || toiletNo > 0 || size > 0);

      case 2: // Location — only street is required
        return street.trim().length > 0;

      case 3: // Amenities - must select at least one
        return Object.values(checkedAmenities).some(checked => checked === true);

      case 4: // Photos - minimum 1, maximum 5 (existing + new)
        const existingCount = (refetchedListing?.listing?.listingImg || editingListing?.listingImg || []).length;
        const totalPhotos = existingCount + selectedFiles.length;
        return totalPhotos >= 1 && totalPhotos <= 5;

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
    // Triggers the hidden button in ListingPropertyPage
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

  const [createOrUpdateListing] =
    useCreateOrUpdateListingMutation();

  const handleCreateListing = async (saveAsDraft: boolean = false) => {
    setSavingAction(saveAsDraft ? 'draft' : 'publish');
    try {
      // Run final validation check before submission, using the same logic
      if (!validateCurrentStep()) {
        return;
      }

      // Existing validation checks (for good measure before API call)
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

      // Default dates when empty so backend always receives valid ISO dates
      const fromDate = availableFrom?.trim() || new Date().toISOString().split('T')[0];
      const untilDate =
        availableUntil?.trim() ||
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Build the listing data object
      const listingData: ListingData & { id?: string; hideStatus?: boolean } = {
        userId: currentUser._id,
        name: title,
        description: description?.trim() || '',
        amenities: validAmenities,
        propertyType: selectedPropertyType,
        street: street?.trim() || '',
        city: city?.trim() || '',
        state: stateAddr?.trim() || '',
        postalCode: postalCode?.trim() || '',
        country: country?.trim() || '',
        longitude: Number(longitude) || 0,
        latitude: Number(latitude) || 0,
        basePrice: Number(basePrice) || 0,
        securityDeposit: Number(securityDeposit) || 0,
        cleaningFee: Number(cleaningFee) || 0,
        avaliableFrom: fromDate, // Note: typo matches backend
        avaliableUntil: untilDate,
        guestNo: Math.max(1, Number(guestNo) || 1),
        size: Math.max(0, Number(size) || 0),
        bathroomNo: Math.max(0, Number(bathroomNo) || 0),
        bedroomNo: Math.max(0, Number(bedroomNo) || 0),
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
        listingData.files = selectedFiles.slice(0, 5);
      }

      console.log('Sending listing data:', listingData);

      const response = await createOrUpdateListing(listingData).unwrap();
      console.log('Listing saved successfully:', response);
      // Save the listing ID if creating new
      if (!listingId && response?.listing?._id) {
        setListingId(response?.listing?._id);
      }
      if (activeStep === 7) {
        if (editingListing) {
          if (onListingSaved) {
            onListingSaved();
          }
        } else {
          setShowSuccessModal(true);
          if (onListingSaved) {
            onListingSaved();
          }
        }
      } else {
        nextStep();
      }
    } catch (error: unknown) {
      // RTK Query unwrap() throws { status, data } on 4xx/5xx
      const err = error as {
        status?: number;
        data?: { message?: string; error?: string; msg?: string; errors?: string[] | { message?: string }[] };
      };
      const d = err?.data;
      let serverMessage: string | undefined;
      if (typeof d === 'string') serverMessage = d;
      else if (d && typeof d === 'object') {
        serverMessage =
          d.message ||
          d.error ||
          d.msg ||
          (Array.isArray(d.errors)
            ? d.errors.map((e) => (typeof e === 'string' ? e : e?.message)).filter(Boolean).join('. ')
            : undefined);
      }
      const fallback =
        err?.status === 400
          ? 'Invalid data. Please check all required fields and try again.'
          : 'Failed to save listing. Please try again.';
      const messageToShow = serverMessage?.trim() || fallback;
      console.error('Listing save error:', err?.status, err?.data ?? error);
      alert(messageToShow);
    }
    finally {
      setSavingAction(null);
    }
  };

  const {
    data: propertyTypeData,
    isLoading: isLoadingPropertyTypes,
    error,
  } = useGetPropertyTypesQuery();

  const { data: amenitiesData, isLoading: isLoadingAmenities, error: amenitiesError } = useGetAmenitiesQuery();
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
    <div className="w-full p-4 sm:p-6 min-w-0 overflow-x-hidden">
      {/* Step Indicators */}
      <div className="relative flex items-center justify-between mb-6 sm:mb-10 gap-0">
        <div className="absolute left-0 right-0 top-[18px] sm:top-5 h-0.5 sm:h-1 bg-neutralLight z-0" />
        <div
          className="absolute top-[18px] sm:top-5 h-0.5 sm:h-1 bg-primary z-10 transition-all duration-300"
          style={{ width: `${(activeStep / (stepData.length - 1)) * 100}%` }}
        />
        {stepData.map((_, index) => (
          <div key={index} className="flex flex-col items-center relative z-20 flex-shrink-0">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-base ${index <= activeStep
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
        <div className="max-w-[760px] mx-auto pb-24 sm:pb-28">
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
              } else if (titleLower.includes('bathroom')) {
                currentValue = bathroomNo;
              } else if (titleLower.includes('toilet')) {
                currentValue = toiletNo;
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
                    } else if (titleLower.includes('bathroom')) {
                      setBathroomNo(newCount);
                    } else if (titleLower.includes('toilet')) {
                      setToiletNo(newCount);
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
            existingImages={((refetchedListing?.listing?.listingImg || editingListing?.listingImg || []) as Array<{ _id: string; fileUrl: string; fileName?: string } | string>).map((img) => ({
              _id: typeof img === 'object' && '_id' in img ? img._id : String(img),
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
        <div className="max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-3 sm:px-6 py-4 w-full min-w-0 overflow-x-hidden">
          <HouseRulesPage
            selectedRules={houseRules}
            onChange={handleHouseRulesChange}
          />
        </div>
      )}
      {/* Navigation Buttons - extra top margin so they never overlap step content */}
      <div className="flex flex-wrap justify-between items-center gap-3 mt-8 sm:mt-10 max-w-[70rem] mx-auto w-full px-3 sm:px-4 pt-2">
        <button
          onClick={prevStep}
          disabled={activeStep === 0}
          className="bg-neutralLight px-4 sm:px-8 py-2.5 sm:py-2 rounded disabled:opacity-50 text-sm sm:text-base min-w-0 shrink-0"
        >
          Previous
        </button>

        {activeStep === 4 ? (
          (() => {
            const existingCount = (refetchedListing?.listing?.listingImg || editingListing?.listingImg || []).length;
            const canProceed = uploadCompleted || (selectedFiles.length === 0 && existingCount >= 1);

            return (
              <button
                onClick={() => {
                  if (canProceed) {
                    nextStep();
                  } else {
                    handleUploadTrigger();
                  }
                }}
                className="bg-primary hover:bg-hoverColor text-white px-6 sm:px-12 py-2.5 sm:py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-w-0"
                disabled={isUploading || (() => {
                  const total = existingCount + selectedFiles.length;
                  return total < 1 || total > 5;
                })()}
              >
                {isUploading ? 'Uploading...' : canProceed ? 'Next' : 'Upload'}
              </button>
            );
          })()
        ) : activeStep === 7 ? (
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-end flex-1 min-w-0">
            <button
              onClick={() => handleCreateListing(true)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded transition disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap min-w-0"
              disabled={savingAction !== null}
            >
              {savingAction === 'draft' ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              onClick={() => handleCreateListing(false)}
              className="bg-primary hover:bg-hoverColor text-white px-4 sm:px-8 py-3 sm:py-4 rounded transition disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap min-w-0"
              disabled={savingAction !== null}
            >
              {savingAction === 'publish' ? 'Publishing...' : editingListing ? 'Update & Publish' : 'Publish Listing'}
            </button>
          </div>
        ) : (
          <button
            onClick={nextStep}
            className="bg-primary hover:bg-hoverColor text-white px-6 sm:px-12 py-2.5 sm:py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-w-0"
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