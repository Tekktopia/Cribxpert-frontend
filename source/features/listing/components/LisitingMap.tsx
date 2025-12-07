import { useState, useEffect, useMemo } from 'react';

interface ListingMapProps {
  onLocationUpdate?: (data: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    longitude?: number;
    latitude?: number;
  }) => void;
  onInputChange?: (value: string) => void;
  // Initial values for editing
  initialStreet?: string;
  initialCity?: string;
  initialState?: string;
  initialPostalCode?: string;
  initialCountry?: string;
  initialLongitude?: number;
  initialLatitude?: number;
  initialAddressInput?: string;
}

const ListingMap: React.FC<ListingMapProps> = ({ 
  onLocationUpdate, 
  onInputChange,
  initialStreet = '',
  initialCity = '',
  initialState = '',
  initialPostalCode = '',
  initialCountry = '',
  initialLongitude = 0,
  initialLatitude = 0,
  initialAddressInput = '',
}) => {
  const [checked, setChecked] = useState(false);
  const [street, setStreet] = useState(initialStreet);
  const [city, setCity] = useState(initialCity);
  const [state, setState] = useState(initialState);
  const [postalCode, setPostalCode] = useState(initialPostalCode);
  const [country, setCountry] = useState(initialCountry);
  const [longitude, setLongitude] = useState<number>(initialLongitude);
  const [latitude, setLatitude] = useState<number>(initialLatitude);
  const [addressInput, setAddressInput] = useState(initialAddressInput);

  // Update state when initial values change (for editing)
  useEffect(() => {
    setStreet(initialStreet);
    setCity(initialCity);
    setState(initialState);
    setPostalCode(initialPostalCode);
    setCountry(initialCountry);
    setLongitude(initialLongitude);
    setLatitude(initialLatitude);
    setAddressInput(initialAddressInput);
  }, [initialStreet, initialCity, initialState, initialPostalCode, initialCountry, initialLongitude, initialLatitude, initialAddressInput]);

  // Update Google Maps iframe URL when address changes
  // Using Google Maps embed without API key - uses the shareable link format
  // Priority: Use coordinates if available, otherwise use address
  const mapUrl = useMemo(() => {
    // If coordinates are provided, use them (more accurate)
    if (latitude !== 0 && longitude !== 0) {
      return `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
    }
    
    // Otherwise, build address from form fields
    const addressParts = [street, city, state, postalCode, country].filter(
      (part) => part && part.trim() !== ''
    );
    const address = addressParts.join(', ');
    
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    }
    
    // Default to Lagos, Nigeria if no address or coordinates
    return `https://www.google.com/maps?q=Lagos,Nigeria&output=embed`;
  }, [street, city, state, postalCode, country, latitude, longitude]);

  // Build full address string for validation
  const buildFullAddress = () => {
    const parts = [street, city, state, postalCode, country].filter(
      (part) => part && part.trim() !== ''
    );
    return parts.join(', ');
  };

  // Update parent component when any field changes
  useEffect(() => {
    const locationData = {
      street: street || undefined,
      city: city || undefined,
      state: state || undefined,
      postalCode: postalCode || undefined,
      country: country || undefined,
      // Only include coordinates if they have valid non-zero values
      longitude: longitude !== 0 ? longitude : undefined,
      latitude: latitude !== 0 ? latitude : undefined,
    };

    if (onLocationUpdate) {
      onLocationUpdate(locationData);
    }

    // Update address input for validation
    const fullAddress = buildFullAddress();
    if (onInputChange) {
      onInputChange(fullAddress);
    }
    setAddressInput(fullAddress);
  }, [street, city, state, postalCode, country, longitude, latitude, onLocationUpdate, onInputChange]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <form action="#" className="w-full">
      <div className="flex flex-col relative w-full max-w-full pb-4">
        {/* Street Address - Full Width */}
        <div className="w-full mb-4">
          <label htmlFor="street" className="mb-2 font-medium text-sm sm:text-base block">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Enter street address"
            className="border border-gray-300 p-2 sm:p-3 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* City and State - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div className="w-full">
            <label htmlFor="city" className="mb-2 font-medium text-sm sm:text-base block">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="border border-gray-300 p-2 sm:p-3 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="w-full">
            <label htmlFor="state" className="mb-2 font-medium text-sm sm:text-base block">
              State/Province
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state or province"
              className="border border-gray-300 p-2 sm:p-3 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Postal Code and Country - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div className="w-full">
            <label htmlFor="postalCode" className="mb-2 font-medium text-sm sm:text-base block">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code"
              className="border border-gray-300 p-2 sm:p-3 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="w-full">
            <label htmlFor="country" className="mb-2 font-medium text-sm sm:text-base block">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
              className="border border-gray-300 p-2 sm:p-3 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Latitude and Longitude - Optional - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div className="w-full">
            <label htmlFor="latitude" className="mb-2 font-medium text-sm sm:text-base block">
              Latitude <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              type="number"
              id="latitude"
              value={latitude || ''}
              onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
              placeholder="Enter latitude (optional)"
              step="any"
              className="border border-gray-300 p-2 sm:p-3 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="w-full">
            <label htmlFor="longitude" className="mb-2 font-medium text-sm sm:text-base block">
              Longitude <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              type="number"
              id="longitude"
              value={longitude || ''}
              onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
              placeholder="Enter longitude (optional)"
              step="any"
              className="border border-gray-300 p-2 sm:p-3 rounded w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-start mb-4 mt-2 sm:mt-4 gap-2 sm:gap-3">
          <input
            type="checkbox"
            id="hide-address"
            checked={checked}
            onChange={handleCheckboxChange}
            className="mt-1 w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
          />
          <label htmlFor="hide-address" className="text-xs sm:text-sm md:text-base leading-snug cursor-pointer">
            Hide exact address until booking confirmation (only neighborhood will be shown)
          </label>
        </div>

        {/* Map Container - Fully Responsive */}
        <div className="relative mt-4 sm:mt-6 w-full mb-4">
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              key={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapUrl}
              className="w-full h-full"
              title="Property Location Map"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ListingMap;
