import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllListings } from '@/features/properties/listingSlice';
import { selectAllAmenities } from '@/features/amenities/amenitiesSlice';
import { selectAllPropertyTypes } from '@/features/propertyType/propertyTypeSlice';
import { PropertyListing } from '@/types';

interface SearchSuggestion {
  id: string;
  type: 'property' | 'location' | 'amenity' | 'propertyType';
  title: string;
  subtitle?: string;
  listing?: PropertyListing;
}

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  initialValue?: string;
  autoFocus?: boolean;
  showSuggestions?: boolean;
  maxSuggestions?: number;
}

export type { SearchInputProps };

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search properties, locations...',
  className = '',
  onSearch,
  initialValue = '',
  autoFocus = false,
  showSuggestions = true,
  maxSuggestions = 6,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Redux data
  const rawListings = useSelector(selectAllListings);
  const allListings = useMemo(() => rawListings || [], [rawListings]);
  const amenities = useSelector(selectAllAmenities);
  const propertyTypes = useSelector(selectAllPropertyTypes);

  // Safe ID -> Name helpers
  const getAmenityNameById = useCallback(
    (amenityId: string): string => {
      const amenity = amenities.find((a) => a._id === amenityId);
      return amenity?.name ?? '';
    },
    [amenities]
  );

  const getPropertyTypeNameById = useCallback(
    (propertyTypeId: string): string => {
      const propertyType = propertyTypes.find((pt) => pt._id === propertyTypeId);
      return propertyType?.name ?? '';
    },
    [propertyTypes]
  );

  // Suggestions generation
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || !showSuggestions || allListings.length === 0) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    const suggestionMap = new Map<string, SearchSuggestion>();

    allListings.forEach((listing) => {
      if (!listing?.name || !listing?.city || !listing?.state) return;

      // Property name
      if (listing.name.toLowerCase().includes(query)) {
        const id = `property-${listing._id}`;
        if (!suggestionMap.has(id)) {
          suggestionMap.set(id, {
            id,
            type: 'property',
            title: listing.name,
            subtitle: `${listing.city}, ${listing.state}`,
            listing,
          });
        }
      }

      // City
      if (listing.city.toLowerCase().includes(query)) {
        const id = `location-city-${listing.city}`;
        if (!suggestionMap.has(id)) {
          suggestionMap.set(id, {
            id,
            type: 'location',
            title: listing.city,
            subtitle: listing.state,
          });
        }
      }

      // State
      if (listing.state.toLowerCase().includes(query)) {
        const id = `location-state-${listing.state}`;
        if (!suggestionMap.has(id)) {
          suggestionMap.set(id, {
            id,
            type: 'location',
            title: listing.state,
            subtitle: listing.country,
          });
        }
      }

      // Property type
      const propertyTypeId = typeof listing.propertyType === 'string' 
        ? listing.propertyType 
        : (typeof listing.propertyType === 'object' && listing.propertyType !== null && '_id' in listing.propertyType
          ? (listing.propertyType as { _id: string })._id
          : '');
      const propertyTypeName = getPropertyTypeNameById(propertyTypeId);
      if (propertyTypeName.toLowerCase().includes(query)) {
        const id = `type-${propertyTypeId}`;
        if (!suggestionMap.has(id)) {
          suggestionMap.set(id, {
            id,
            type: 'propertyType',
            title: propertyTypeName,
            subtitle: 'Property Type',
          });
        }
      }

      // Amenities
      listing.amenities?.forEach((amenity) => {
        const amenityId = typeof amenity === 'string' 
          ? amenity 
          : (typeof amenity === 'object' && amenity !== null && '_id' in amenity
            ? (amenity as { _id: string })._id
            : '');
        const amenityName = getAmenityNameById(amenityId);
        if (amenityName.toLowerCase().includes(query)) {
          const id = `amenity-${amenityId}`;
          if (!suggestionMap.has(id)) {
            suggestionMap.set(id, {
              id,
              type: 'amenity',
              title: amenityName,
              subtitle: 'Amenity',
            });
          }
        }
      });
    });

    return Array.from(suggestionMap.values()).slice(0, maxSuggestions);
  }, [
    searchQuery,
    allListings,
    showSuggestions,
    maxSuggestions,
    getPropertyTypeNameById,
    getAmenityNameById,
  ]);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSelectedSuggestionIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autofocus
  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  // Create slug for URL
  const createSlug = (name: string) =>
    name.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');

  // Suggestion select
  const handleSuggestionSelect = useCallback(
    (suggestion: SearchSuggestion) => {
      setSearchQuery(suggestion.title);
      setShowDropdown(false);
      setSelectedSuggestionIndex(-1);

      if (suggestion.type === 'property' && suggestion.listing) {
        navigate(`/propertydetail/${createSlug(suggestion.listing.name)}`);
      } else {
        const searchValue = suggestion.title;
        if (onSearch) onSearch(searchValue);
        else navigate(`/discover?search=${encodeURIComponent(searchValue)}`);
      }
    },
    [navigate, onSearch]
  );

  // Submit search
  const handleSearchSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim() || isSearching) return;
      setIsSearching(true);

      try {
        if (onSearch) await onSearch(searchQuery.trim());
        else navigate(`/discover?search=${encodeURIComponent(searchQuery.trim())}`);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    },
    [searchQuery, onSearch, navigate, isSearching]
  );

  // Input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      setSelectedSuggestionIndex(-1);
      setShowDropdown(!!value.trim() && showSuggestions);
    },
    [showSuggestions]
  );

  // Key handling
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showDropdown || suggestions.length === 0) {
        if (e.key === 'Enter') handleSearchSubmit(e);
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedSuggestionIndex >= 0) {
            handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
          } else {
            handleSearchSubmit(e);
          }
          break;
        case 'Escape':
          setShowDropdown(false);
          setSelectedSuggestionIndex(-1);
          break;
      }
    },
    [
      showDropdown,
      suggestions,
      selectedSuggestionIndex,
      handleSearchSubmit,
      handleSuggestionSelect,
    ]
  );

  // Clear input
  const handleClear = useCallback(() => {
    setSearchQuery('');
    setShowDropdown(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  }, []);

  // Icon helper
  const getIconForSuggestionType = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'property':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        );
      case 'location':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case 'propertyType':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-4 4 4" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17l4-4 4 4" />
          </svg>
        );
      case 'amenity':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className={`flex-grow max-w-[500px] relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (searchQuery.trim() && suggestions.length > 0) setShowDropdown(true); }}
          disabled={isSearching}
          className="w-full h-[48px] border border-[#CCCCCC99]/60 rounded-[12px] px-4 pr-16 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1d5c5c]/20 focus:border-[#1d5c5c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={placeholder}
          autoComplete="off"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-[#999999] hover:text-[#1d5c5c] transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          disabled={isSearching || !searchQuery.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-[#999999] hover:text-[#1d5c5c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Search"
        >
          {isSearching ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => handleSuggestionSelect(suggestion)}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${index === selectedSuggestionIndex ? 'bg-[#1d5c5c]/5' : ''}`}
            >
              <div className="text-[#1d5c5c] flex-shrink-0">{getIconForSuggestionType(suggestion.type)}</div>
              <div className="flex-grow min-w-0">
                <div className="font-medium text-gray-900 truncate">{suggestion.title}</div>
                {suggestion.subtitle && <div className="text-sm text-gray-500 truncate">{suggestion.subtitle}</div>}
              </div>
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchInput;
