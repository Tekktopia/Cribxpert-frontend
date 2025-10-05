import { useState, useEffect } from 'react';
import axios from 'axios';

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

const LOCATIONIQ_API_KEY = 'pk.b5239005850c194bd44f5401612f264c'; // Replace this

const ListingMap: React.FC<ListingMapProps> = ({ onLocationUpdate }) => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Optionally store selected coords to update static map dynamically
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) return;
    try {
      const response = await axios.get(
        `https://api.locationiq.com/v1/autocomplete`,
        {
          params: {
            key: LOCATIONIQ_API_KEY,
            q: query,
            limit: 5,
            format: 'json'
          }
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  };

  const handleSelectSuggestion = (suggestion: any) => {
    // Use display_name (fallback if display_place is undefined)
    const address = suggestion.display_place || suggestion.display_name || '';
    setInputValue(address);
    setSuggestions([]);
    geocodeSelectedLocation(suggestion);
  };

  const geocodeSelectedLocation = async (suggestion: any) => {
    setIsGeocoding(true);
    try {
      const {
        address: {
          road,
          city,
          town,
          state,
          postcode,
          country
        } = {},
        lat,
        lon
      } = suggestion;

      const locationData = {
        street: road,
        city: city || town,
        state,
        postalCode: postcode,
        country,
        longitude: parseFloat(lon),
        latitude: parseFloat(lat)
      };

      setCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });

      if (onLocationUpdate) {
        onLocationUpdate(locationData);
      }
    } catch (error) {
      console.error('Error parsing selected location:', error);
    } finally {
      setIsGeocoding(false);
    }
  };

  // Debounce input for suggestions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.trim()) {
        fetchSuggestions(inputValue);
      } else {
        setSuggestions([]);
      }
    }, 400); // Debounce delay

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const showInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  // Helper: Generate static map URL from LocationIQ with marker
  const getStaticMapUrl = (lat: number, lon: number) => {
    // You can adjust zoom, size, marker color, etc.
    return `https://maps.locationiq.com/v3/staticmap?key=${LOCATIONIQ_API_KEY}&center=${lat},${lon}&zoom=14&size=600x400&markers=icon:large-red-cutout|${lat},${lon}`;
  };

  return (
    <form action="#">
      <div className="flex flex-col relative">
        <label htmlFor="home-address" className="mb-2 font-medium text-sm sm:text-base">
          Home Address
        </label>

        <div className="relative">
          <input
            onChange={showInput}
            value={inputValue}
            id="home-address"
            placeholder="Enter full address"
            type="text"
            className="border p-2 rounded w-full text-sm sm:text-base"
            autoComplete="off"
          />
          {isGeocoding && (
            <div className="absolute right-2 top-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1D5C5C]"></div>
            </div>
          )}

          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <ul className="z-50 bg-white border mt-1 w-full rounded shadow max-h-60 overflow-y-auto text-sm sm:text-base">
              {suggestions.map((sugg, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectSuggestion(sugg)}
                >
                  {sugg.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-start mb-4 mt-4 gap-2">
          <input
            type="checkbox"
            id="hide-address"
            checked={checked}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
          <label htmlFor="hide-address" className="text-sm sm:text-base leading-snug">
            Hide exact address until booking confirmation (only neighborhood will be shown)
          </label>
        </div>

        <div className="relative z-0 mt-4">
          {coords ? (
            <img
              className="w-full max-w-full h-40 sm:h-52 md:h-64 rounded object-cover"
              src={getStaticMapUrl(coords.lat, coords.lon)}
              alt="Map showing selected location"
            />
          ) : (
            <img
              className="w-full max-w-full h-40 sm:h-52 md:h-64 rounded object-cover"
              src="/images/Map_Lagos.png"
              alt="map placeholder"
            />
          )}

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
      </div>
    </form>
  );
};

export default ListingMap;
