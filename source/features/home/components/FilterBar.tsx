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
  const { isLoading: isFiltering, refetch } = useFilteredListings();

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

  const handleSearch = () => {
    refetch();
  };

  const [filterParameters, setFilterParameters] = useState<FilterParameter[]>([
    { name: 'country', label: 'Country', options: [] },
    { name: 'stateProvince', label: 'State/Province', options: [] },
    { name: 'city', label: 'City', options: [] },
    { name: 'priceRange', label: 'Price Range', options: [] },
  ]);

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
            await new Promise((resolve) => setTimeout(resolve, 800));
            if (stateName) {
              dispatch(updateFilter({ name: 'stateProvince', value: stateName }));
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
    <div className="w-full py-8 bg-primary text-white border-b border-white/10 px-[2%]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-12 w-full lg:w-auto">
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

          <div className="flex items-center gap-6 w-full lg:w-auto justify-center lg:justify-end">
            <button
              onClick={handleGeoLocation}
              disabled={userLocation.loading}
              className={`premium-transition h-[48px] px-8 rounded-full border border-white/30 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-primary flex items-center justify-center ${
                userLocation.loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {userLocation.loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
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
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Locating...
                </>
              ) : (
                'Use My Location'
              )}
            </button>

            <button
              onClick={handleSearch}
              disabled={isFiltering}
              className={`premium-transition h-[48px] px-10 rounded-full bg-white text-primary text-[10px] uppercase tracking-[0.2em] font-bold shadow-premium hover:shadow-premium-hover hover:scale-105 ${
                isFiltering ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isFiltering ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
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
                  Searching...
                </span>
              ) : (
                'Search Spaces'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;