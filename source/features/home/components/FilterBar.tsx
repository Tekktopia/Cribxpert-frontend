import React, { useEffect, useState, useMemo } from 'react';
import type { FilterParameter } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  updateFilter,
} from '@/features/properties/listingSlice';
import FilterItem from './FilterItem';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useFilteredListings } from '@/hooks/useFilteredListings';
import { Country, State, City } from 'country-state-city';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  useFilteredListings();

  const [isGeolocationActive, setIsGeolocationActive] = useState(false);
  const userLocation = useGeolocation(isGeolocationActive);

  const handleFilterChange = (name: string, value: string) => {
    dispatch(updateFilter({ name, value }));
    if (name === 'country') {
      dispatch(updateFilter({ name: 'stateProvince', value: '' }));
      dispatch(updateFilter({ name: 'city', value: '' }));
    } else if (name === 'stateProvince') {
      dispatch(updateFilter({ name: 'city', value: '' }));
    }
  };

  const [filterParameters, setFilterParameters] = useState<FilterParameter[]>([
    { name: 'country', label: 'Country', options: [] },
    { name: 'stateProvince', label: 'State/Province', options: [] },
    { name: 'city', label: 'City', options: [] },
    { name: 'priceRange', label: 'Price Range', options: [] },
  ]);

  // Load all countries on mount
  useEffect(() => {
    const countryOptions = Country.getAllCountries().map((c) => ({
      value: c.name,
      label: c.name,
      currency: c.currency || '',
    }));
    setFilterParameters((prevParams) =>
      prevParams.map((param) =>
        param.name === 'country' ? { ...param, options: countryOptions } : param
      )
    );
  }, []);

  // Load states when country changes
  useEffect(() => {
    const selectedCountry = activeFilters.country;
    if (selectedCountry) {
      const countryObj = Country.getAllCountries().find(
        (c) => c.name === selectedCountry
      );
      const stateOptions = countryObj
        ? State.getStatesOfCountry(countryObj.isoCode).map((s) => ({
            label: s.name,
            value: s.name,
          }))
        : [];
      setFilterParameters((prevParams) =>
        prevParams.map((param) =>
          param.name === 'stateProvince' ? { ...param, options: stateOptions } : param
        )
      );
    } else {
      setFilterParameters((prevParams) =>
        prevParams.map((param) =>
          param.name === 'stateProvince' ? { ...param, options: [] } : param
        )
      );
    }
  }, [activeFilters.country]);

  // Load cities when state changes
  useEffect(() => {
    const selectedCountry = activeFilters.country;
    const selectedState = activeFilters.stateProvince;
    if (selectedCountry && selectedState) {
      const countryObj = Country.getAllCountries().find(
        (c) => c.name === selectedCountry
      );
      const stateObj = countryObj
        ? State.getStatesOfCountry(countryObj.isoCode).find(
            (s) => s.name === selectedState
          )
        : null;
      const cityOptions =
        countryObj && stateObj
          ? City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode).map((city) => ({
              label: city.name,
              value: city.name,
            }))
          : [];
      setFilterParameters((prevParams) =>
        prevParams.map((param) =>
          param.name === 'city' ? { ...param, options: cityOptions } : param
        )
      );
    } else {
      setFilterParameters((prevParams) =>
        prevParams.map((param) =>
          param.name === 'city' ? { ...param, options: [] } : param
        )
      );
    }
  }, [activeFilters.country, activeFilters.stateProvince]);

  // Price ranges
  const basePriceRanges = useMemo(
    () => [
      { value: '0-1000', label: '0 - 1,000' },
      { value: '1001-5000', label: '1,001 - 5,000' },
      { value: '5001-10000', label: '5,001 - 10,000' },
      { value: '10001-20000', label: '10,001 - 20,000' },
      { value: '20001-50000', label: '20,001 - 50,000' },
      { value: '50001-plus', label: '50,000+' },
    ],
    []
  );

  useEffect(() => {
    const priceRangeOptions = basePriceRanges.map((range) => ({
      value: range.value,
      label: range.label,
    }));
    setFilterParameters((prevParams) =>
      prevParams.map((param) =>
        param.name === 'priceRange' ? { ...param, options: priceRangeOptions } : param
      )
    );
  }, [basePriceRanges]);

  // Geolocation handler
  const handleGeoLocation = () => {
    setIsGeolocationActive(true);
  };

  useEffect(() => {
    if (!isGeolocationActive || userLocation.loading) return;

    if (userLocation.latitude && userLocation.longitude) {
      const fetchLocationDetails = async () => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&localityLanguage=en`
          );
          const data = await response.json();

          const countryName = data?.countryName;
          const stateName = data?.principalSubdivision
            ?.replace(/\s+State$/i, '')
            .trim();
          const cityName = data?.city || data?.locality;

          if (countryName) {
            dispatch(updateFilter({ name: 'country', value: countryName }));

            // Wait for states to load
            await new Promise((resolve) => setTimeout(resolve, 800));

            if (stateName) {
              dispatch(updateFilter({ name: 'stateProvince', value: stateName }));

              // Wait for cities to load
              await new Promise((resolve) => setTimeout(resolve, 800));

              if (cityName) {
                dispatch(updateFilter({ name: 'city', value: cityName.trim() }));
              }
            }
          }
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
        } finally {
          setIsGeolocationActive(false);
        }
      };
      fetchLocationDetails();
    } else if (userLocation.error) {
      console.error('Geolocation error:', userLocation.error);
      setIsGeolocationActive(false);
    }
  }, [isGeolocationActive, userLocation, dispatch]);

  return (
    <div className="bg-primary w-full py-4 px-3 md:px-8 hidden lg:block">
      <div className="flex flex-row container mx-auto justify-center md:justify-between items-center gap-3 md:gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {filterParameters.map((param, index) => (
            <FilterItem
              key={index}
              param={param}
              value={
                (activeFilters[param.name as keyof typeof activeFilters] as string) || ''
              }
              handleFilterChange={handleFilterChange}
            />
          ))}

          {/* Use My Location Button */}
          <button
            onClick={handleGeoLocation}
            disabled={userLocation.loading || isGeolocationActive}
            title="Auto-fill Country, State and City from your current location"
            className={`
              group h-[42px] px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-300 ease-in-out
              flex items-center justify-center gap-2
              whitespace-nowrap flex-shrink-0 shadow-sm
              ${
                userLocation.loading || isGeolocationActive
                  ? 'bg-gray-400 cursor-not-allowed opacity-70 text-white'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white'
              }
            `}
          >
            {userLocation.loading || isGeolocationActive ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>Locating...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
                <span>Use My Location</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;