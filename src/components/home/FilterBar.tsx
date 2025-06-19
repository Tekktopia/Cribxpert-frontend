/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from 'react';
import type { FilterParameter } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  updateFilter,
} from '@/features/listing/listingSlice';
import FilterItem from '@/components/home/FilterItem';
import { useGeolocation } from '@/hooks/useGeolocation';
import { nigerianLocations } from '@/utils/locationUtils';
import { useFilteredListings } from '@/hooks/useFilteredListings';

const FilterBar: React.FC = () => {
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);

  // Use the filtering hook instead of direct API calls
  const { isLoading: isFiltering } = useFilteredListings();

  // Keep geolocation functionality
  const [isGeolocationActive, setIsGeolocationActive] = useState(false);
  const userLocation = useGeolocation(isGeolocationActive);

  const handleFilterChange = (name: string, value: string) => {
    // This will automatically trigger the filtering in the hook
    dispatch(updateFilter({ name, value }));
    
    // Clear dependent filters when parent filter changes
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

  // Load country options
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,currencies,cca2')
      .then((res) => res.json())
      .then(
        (
          data: Array<{
            name: { common: string };
            currencies?: Record<string, unknown>;
          }>
        ) => {
          const countryOption = data
            .map((country) => ({
              value: country.name.common,
              label: country.name.common,
              currency: country.currencies
                ? Object.keys(country.currencies)[0]
                : '',
            }))
            .sort((a, b) => a.label.localeCompare(b.label));

          setFilterParameters((prevParams) =>
            prevParams.map((param) =>
              param.name === 'country'
                ? { ...param, options: countryOption }
                : param
            )
          );
        }
      )
      .catch((error) => console.error('Failed to fetch Countries', error));
  }, []);

  const handleGeoLocation = async () => {
    setIsGeolocationActive(true);
  };

  // Handle geolocation results
  useEffect(() => {
    if (isGeolocationActive && !userLocation.loading) {
      if (userLocation.latitude && userLocation.longitude) {
        const fetchLocationDetails = async () => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${userLocation.latitude}+${userLocation.longitude}&key=${apiKey}`
            );
            const data = await response.json();
            const components = data?.results?.[0]?.components;

            const country = components?.country;
            const state =
              components?.state || components?.province || components?.region;
            const city = components?.city || components?.town || components?.village;

            if (country) {
              dispatch(updateFilter({ name: 'location', value: country }));
            }

            if (state) {
              dispatch(updateFilter({ name: 'stateProvince', value: state }));
            }
            
            if (city) {
              dispatch(updateFilter({ name: 'city', value: city }));
            }
          } catch (error) {
            console.error('Failed to reverse geocode location', error);
            setFallbackLocationOptions();
          } finally {
            setIsGeolocationActive(false);
          }
        };

        fetchLocationDetails();
      } else if (userLocation.error) {
        console.error(
          'Geolocation error after activation:',
          userLocation.error
        );
        setFallbackLocationOptions();
        setIsGeolocationActive(false);
      }
    }
  }, [
    isGeolocationActive,
    userLocation.latitude,
    userLocation.longitude,
    userLocation.error,
    userLocation.loading,
    apiKey,
    dispatch,
  ]);

  const setFallbackLocationOptions = () => {
    setFilterParameters((prevParams) =>
      prevParams.map((param) =>
        param.name === 'location'
          ? {
              ...param,
              options: nigerianLocations
                .slice(0, 10)
                .map((loc) => ({ value: loc.value, label: loc.label })),
            }
          : param
      )
    );
  };

  // Load states when country changes
  useEffect(() => {
    const selectedCountry = activeFilters.country;
    if (selectedCountry) {
      fetch('https://countriesnow.space/api/v0.1/countries/states')
        .then((res) => res.json())
        .then((apiData) => {
          const countryData = apiData?.data?.find(
            (country: any) => country.name === selectedCountry
          );

          let stateOptions: FilterParameter['options'] = [];
          if (countryData && countryData.states) {
            stateOptions = countryData.states.map((state: any) => ({
              label: state.name,
              value: state.name,
            }));
          }

          setFilterParameters((prevParams) =>
            prevParams.map((param) =>
              param.name === 'stateProvince'
                ? { ...param, options: stateOptions }
                : param
            )
          );
        })
        .catch((error) =>
          console.error('Failed to fetch States/Provinces', error)
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
      fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: selectedCountry,
          state: selectedState,
        }),
      })
        .then((res) => res.json())
        .then((apiData) => {
          let cityOptions: FilterParameter['options'] = [];
          
          if (apiData?.data) {
            cityOptions = apiData.data.map((city: string) => ({
              label: city,
              value: city,
            }));
          }

          setFilterParameters((prevParams) =>
            prevParams.map((param) =>
              param.name === 'city'
                ? { ...param, options: cityOptions }
                : param
            )
          );
        })
        .catch((error) => {
          console.error('Failed to fetch Cities', error);
          // Set empty options on error
          setFilterParameters((prevParams) =>
            prevParams.map((param) =>
              param.name === 'city' ? { ...param, options: [] } : param
            )
          );
        });
    } else {
      // Clear city options when no state is selected
      setFilterParameters((prevParams) =>
        prevParams.map((param) =>
          param.name === 'city' ? { ...param, options: [] } : param
        )
      );
    }
  }, [activeFilters.country, activeFilters.stateProvince]);

  // Define base price ranges
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

  // Update price range options with currency when country changes
  useEffect(() => {
    const selectedCountryName = activeFilters.country;
    let selectedCurrency = '';

    const locationParam = filterParameters.find(
      (param) => param.name === 'location'
    );

    if (locationParam && selectedCountryName) {
      const country = locationParam.options.find(
        (option: any) => option.value === selectedCountryName
      );
      if (country && country.currency) {
        selectedCurrency = country.currency;
      }
    }

    const priceRangeOptions = basePriceRanges.map((range) => {
      let formattedLabel = range.label;
      if (selectedCurrency) {
        formattedLabel = `${selectedCurrency} ${range.label}`;
      }
      return {
        value: range.value,
        label: formattedLabel,
      };
    });

    setFilterParameters((prevParams) =>
      prevParams.map((param) =>
        param.name === 'priceRange'
          ? { ...param, options: priceRangeOptions }
          : param
      )
    );
  }, [activeFilters.country, basePriceRanges]);

  const handleSearch = () => {
    // The hook will automatically handle filtering based on active filters
    // Force a refresh of the current filters
    console.log('Current filters:', activeFilters);
  };

  return (
    <div className={`bg-[#1d5c5c] w-full py-4 px-3 md:px-8 hidden lg:block`}>
      <div className="md:hidden mb-2 flex justify-between items-center text-white">
        <span className="font-medium">Filters</span>
      </div>

      <div className="flex flex-col md:flex-row container mx-auto justify-center md:justify-between gap-3 md:gap-6">
        <div className="flex md:flex-wrap overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-3">
          {filterParameters.map((param, index) => (
            <FilterItem
              key={index}
              param={param}
              value={activeFilters[param.name] || ''}
              handleFilterChange={handleFilterChange}
            />
          ))}
        </div>

        <button
          onClick={handleGeoLocation}
          className="bg-[#2e7777] text-white h-[36px] px-4 py-2 rounded-md whitespace-nowrap text-sm md:text-base mt-0 md:mt-auto md:ml-2 md:min-w-[100px] md:self-end"
        >
          Use My Location
        </button>

        <button
          onClick={handleSearch}
          disabled={isFiltering}
          className={`bg-black text-white h-[36px] px-4 py-2 rounded-md text-sm md:text-base mt-0 md:mt-auto md:ml-2 md:min-w-[100px] md:self-end ${
            isFiltering ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isFiltering ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Filtering...
            </span>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;