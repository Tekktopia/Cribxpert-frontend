import React, { useEffect, useState } from 'react';
import type { FilterParameter } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveFilters,
  setCurrentListings,
  updateFilter,
} from '@/features/listing/listingSlice';
import FilterItem from '@/components/home/FilterItem';
import { useGeolocation } from '@/hooks/useGeolocation';
import {nigerianLocations } from '@/utils/locationUtils';
import { useGetListingsQuery } from '@/features/listing';



const FilterBar: React.FC = () => {
     const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);


  // State to track if we should trigger a search
  const [searchTrigger, setSearchTrigger] = useState(0);
  // Current filter parameters for the API call
  const [apiFilters, setApiFilters] = useState({});

   const [isGeolocationActive, setIsGeolocationActive] = useState(false);
    const userLocation = useGeolocation(isGeolocationActive); // Pass control stat
  // Use RTK Query's hook with skip option to control when it fires
  const {
    data: listings,
    isLoading,
    isFetching,
  } = useGetListingsQuery(apiFilters, {
    skip: searchTrigger === 0, // Skip the initial query
    refetchOnMountOrArgChange: true,
  });

  // Update Redux store when new listings are fetched
  useEffect(() => {
    // Only update if we've triggered a search and have results
    if (searchTrigger > 0) {
      // Update listings when data is available
      if (listings && !isLoading && !isFetching) {
        dispatch(setCurrentListings(listings));
      }
    }
  }, [listings, isLoading, isFetching, dispatch, searchTrigger]);

  // Handler for filter changes using Redux
  const handleFilterChange = (name: string, value: string) => {
    dispatch(updateFilter({ name, value }));
  };



  // State for filter parameters (with initial default values)
  const [filterParameters, setFilterParameters] = useState<FilterParameter[]>([
    {
      name: 'location',
      label: 'Country',
      options: [],
    },
    
    {
        name: 'stateProvince', // New dropdown for State/Province
        label: 'State/Province',
        options: [],
    },
    
    {
      name: 'priceRange',
      label: 'Price Range',
      options: [],
       
    },
   

  ]);

//Fetch Country Lidt from REST API
useEffect(()=> {
  fetch("https://restcountries.com/v3.1/all?fields=name,currencies,cca2").then((res)=>res.json()).then((data)=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countryOption = data.map((country: any) => ({
                    value: country.name.common,
                    label: country.name.common,
                    currency: country.currencies ? Object.keys(country.currencies)[0] : "",
                }));


    setFilterParameters((prevParams)=>
      prevParams.map((param)=>param.name==="location" ? {...param,options:countryOption} : param))}).catch((error)=>console.error("Failed to fetch Countries",error))
  },[]);

  
 const handleGeoLocation=async()=>{
  setIsGeolocationActive(true) //trigger the useGeolocation hook
 }
 

    // --- Effect to handle Geolocation result and update Country Filter ---
    useEffect(() => {
        if (isGeolocationActive && !userLocation.loading) {
            if (userLocation.latitude && userLocation.longitude) {
                // Perform reverse geocoding only when location data is available
                const fetchCountryFromCoords = async () => {
                    try {
                        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${userLocation.latitude}+${userLocation.longitude}&key=${apiKey}`);
                        const data = await response.json();
                        const reversedLocation = data?.results?.[0]?.components?.country;
                        if (reversedLocation) {
                            dispatch(updateFilter({ name: "location", value: reversedLocation }));
                        }
                    } catch (error) {
                        console.error("Failed to reverse geocode location", error);
                        // Fallback if reverse geocoding fails after button click
                        setFilterParameters((prevParams) =>
                            prevParams.map((param) =>
                                param.name === 'location'
                                    ? {
                                        ...param,
                                        options: nigerianLocations.slice(0, 10).map((loc) => ({ value: loc.value, label: loc.label })),
                                    }
                                    : param
                            )
                        );
                    }
                };
                fetchCountryFromCoords();
            } else if (userLocation.error) {
                // Handle geolocation error after button click (e.g., user denied)
                console.error("Geolocation error after activation:", userLocation.error);
                // Fallback (e.g., revert to full list or show specific message)
                setFilterParameters((prevParams) =>
                    prevParams.map((param) =>
                        param.name === 'location'
                            ? {
                                ...param,
                                options: nigerianLocations.slice(0, 10).map((loc) => ({ value: loc.value, label: loc.label })),
                            }
                            : param
                    )
                );
            }
            // Reset isGeolocationActive after attempting to get location
            // This prevents continuous re-attempts if the hook doesn't provide data immediately
            setIsGeolocationActive(false);
        }
    }, [isGeolocationActive, userLocation.latitude, userLocation.longitude, userLocation.error, userLocation.loading, apiKey, dispatch]);
 

 //Listen to Country Changes to update State/Province

 useEffect(() => {
        const selectedCountry = activeFilters.location;
        if (selectedCountry) {
            // Updated API call for states/provinces to correctly parse the data
            fetch('https://countriesnow.space/api/v0.1/countries/states')
                .then((res) => res.json())
                .then((apiData) => { 
                    // Find the specific country object within the returned data array
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const countryData = apiData?.data?.find((country: any) => country.name === selectedCountry);

                    let stateOptions: FilterParameter['options'] = [];
                    if (countryData && countryData.states) {
                        
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        stateOptions = countryData.states.map((state: any) => ({
                            label: state.name,
                            value: state.name,
                        }));
                    }

                    setFilterParameters((prevParams) =>
                        prevParams.map((param) =>
                            param.name === "stateProvince" ? { ...param, options: stateOptions } : param
                        )
                    );
                })
                .catch((error) => console.error("Failed to fetch States/Provinces", error));

        } else {
            // If no country is selected, clear state/province options
            setFilterParameters((prevParams) => prevParams.map((param) => param.name === "stateProvince" ? { ...param, options: [] } : param))
        }
    }, [activeFilters.location]); // Dependency on activeFilters.location


  
 const basePriceRanges = [
    { value: '0-1000', label: '0 - 1,000' },
    { value: '1001-5000', label: '1,001 - 5,000' },
    { value: '5001-10000', label: '5,001 - 10,000' },
    { value: '10001-20000', label: '10,001 - 20,000' },
    { value: '20001-50000', label: '20,001 - 50,000' },
    { value: '50001-plus', label: '50,000+' },
];

useEffect(() => {
    const selectedCountryName = activeFilters.location;
    let selectedCurrency = '';

    // Find the currency for the selected country
    // need to access the options of the 'location' parameter directly from filterParameters state
    const locationParam = filterParameters.find(param => param.name === 'location');
    if (locationParam && selectedCountryName) {
        const country = locationParam.options.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            param.name === 'priceRange' ? { ...param, options: priceRangeOptions } : param
        )
    );
}, [activeFilters.location, filterParameters]); // Dependency on selected country and filterParameters for currency lookup

  
const handleSearch = () => {
        const apiFilters = {
            location: activeFilters.location,
            state: activeFilters.stateProvince,
            propertyType: activeFilters.propertyType,
            ...(activeFilters.priceRange && (() => {
                const rangeValue = activeFilters.priceRange;
                let min, max;
                if (rangeValue === '50001-plus') {
                    min = 50001;
                    max = undefined;
                } else {
                    [min, max] = rangeValue.split('-').map(Number);
                }
                return {
                    priceMin: min,
                    priceMax: max
                };
            })()),
        };

        console.log('Searching with API filters:', apiFilters);
        setApiFilters(apiFilters);
        setSearchTrigger((prev) => prev + 1);
    };


  return (
    <div className={`bg-[#1d5c5c] w-full py-4 px-3 md:px-8 hidden lg:block`}>
      {/* Mobile View: Collapsible Filter */}
      <div className="md:hidden mb-2 flex justify-between items-center text-white">
        <span className="font-medium">Filters</span>
      </div>

      <div className="flex flex-col md:flex-row container mx-auto justify-center md:justify-between gap-3 md:gap-6">
        {/* Mobile Scrollable Container */}
        <div className="flex md:flex-wrap overflow-x-auto pb-2 md:pb-0 scrollbar-hide gap-3">
          {filterParameters.map((param, index) => (
            <FilterItem
              key={index}
              param={param}
              handleFilterChange={handleFilterChange}
            />
          ))}
        </div>

{/* Location Button */}
          <button onClick={handleGeoLocation}
         className="bg-[#2e7777]  text-white h-[36px] px-4 py-2 rounded-md whitespace-nowrap text-sm md:text-base mt-0 md:mt-auto md:ml-2 md:min-w-[100px] md:self-end"
        >
         Use My Location
       </button>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isLoading || isFetching}
          className={`bg-black text-white h-[36px] px-4 py-2 rounded-md text-sm md:text-base mt-0 md:mt-auto md:ml-2 md:min-w-[100px] md:self-end ${
            isLoading || isFetching ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading || isFetching ? (
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
              Searching...
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
