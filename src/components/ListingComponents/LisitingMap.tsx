import { useState, useEffect } from 'react';

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
}

const ListingMap: React.FC<ListingMapProps> = ({ onLocationUpdate }) => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Mock geocoding function - replace with actual service like Google Maps, OpenStreetMap, etc.
  const geocodeAddress = async (address: string) => {
    if (!address.trim()) return;

    setIsGeocoding(true);
    
    try {
      // This is a mock implementation - you should replace with actual geocoding service
      // Example with Google Maps Geocoding API:
      // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`);
      
      // For now, let's parse the address manually and provide mock coordinates
      const addressParts = address.split(',').map(part => part.trim());
      
      let street = '';
      let city = '';
      let state = '';
      let postalCode = '';
      let country = 'USA'; // default
      let longitude = -74.0060; // default NYC coordinates
      let latitude = 40.7128;

      // Simple parsing logic - you may need to adjust based on your address format
      if (addressParts.length >= 1) {
        street = addressParts[0];
      }
      if (addressParts.length >= 2) {
        city = addressParts[1];
      }
      if (addressParts.length >= 3) {
        // Try to extract state and postal code from the last part
        const lastPart = addressParts[addressParts.length - 1];
        const statePostalRegex = /^([A-Z]{2})\s*(\d{5}(?:-\d{4})?)$/;
        const match = lastPart.match(statePostalRegex);
        
        if (match) {
          state = match[1];
          postalCode = match[2];
        } else {
          state = lastPart;
        }
      }

      // Mock coordinates based on city (you should replace with actual geocoding)
      const cityCoordinates: Record<string, { lat: number; lng: number }> = {
        'new york': { lat: 40.7128, lng: -74.0060 },
        'los angeles': { lat: 34.0522, lng: -118.2437 },
        'chicago': { lat: 41.8781, lng: -87.6298 },
        'houston': { lat: 29.7604, lng: -95.3698 },
        'miami': { lat: 25.7617, lng: -80.1918 },
        'miami beach': { lat: 25.7907, lng: -80.1300 },
      };

      const cityKey = city.toLowerCase();
      if (cityCoordinates[cityKey]) {
        latitude = cityCoordinates[cityKey].lat;
        longitude = cityCoordinates[cityKey].lng;
      }

      const locationData = {
        street,
        city,
        state,
        postalCode,
        country,
        longitude,
        latitude,
      };

      console.log('Parsed location data:', locationData);
      
      // Call the parent component's callback with the location data
      if (onLocationUpdate) {
        onLocationUpdate(locationData);
      }

    } catch (error) {
      console.error('Error geocoding address:', error);
    } finally {
      setIsGeocoding(false);
    }
  };

  // Debounced geocoding - wait for user to stop typing
  useEffect(() => {
    if (!inputValue.trim()) return;

    const timeoutId = setTimeout(() => {
      geocodeAddress(inputValue);
    }, 1000); // Wait 1 second after user stops typing

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const showInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    console.log('Input value:', newValue);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    console.log('Hide address checkbox:', isChecked);
  };

  return (
    <form action="#">
      <div className="flex flex-col">
        <label htmlFor="home-address" className="mb-2 font-medium">
          Home Address
        </label>
        <div className="relative">
          <input
            onChange={showInput}
            value={inputValue}
            id="home-address"
            placeholder="Enter full address (e.g., 123 Main St, New York, NY 10001)"
            type="text"
            className="border p-2 rounded w-full"
          />
          {isGeocoding && (
            <div className="absolute right-2 top-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1D5C5C]"></div>
            </div>
          )}
        </div>
        
        <div className="flex items-center mb-4 mt-4">
          <input
            type="checkbox"
            id="hide-address"
            checked={checked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="hide-address" className="text-sm">
            Hide exact address until booking confirmation (only neighborhood will be shown)
          </label>
        </div>
        
        <div className="relative">
          <img
            className="w-[700px] h-[200px] rounded"
            src="/images/Map_Lagos.png"
            alt="map"
          />
          {isGeocoding && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded">
              <div className="bg-white px-4 py-2 rounded shadow">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1D5C5C] mr-2"></div>
                  <span>Locating address...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {inputValue && (
          <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
            <p><strong>Address entered:</strong> {inputValue}</p>
            <p className="text-gray-600 mt-1">
              Location data will be parsed and sent to the listing form.
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default ListingMap;