// Import and re-export from amenitiesService.ts
import {
  amenitiesApi,
  useGetAmenitiesQuery,
  useCreateAmenityMutation,
  useDeleteAmenityMutation,
  type Amenity,
} from './amenitiesService';

// Import and re-export from amenitiesSlice.ts
import amenitiesReducer, {
  // Actions
  toggleSelectedAmenity,
  setSelectedAmenities,
  clearSelectedAmenities,
  setAmenitiesError,

  // Selectors
  selectAllAmenities,
  selectSelectedAmenities,
  selectAmenitiesLoading,
  selectAmenitiesError,
  selectIsAmenitySelected,
  selectSelectedAmenityObjects,

  // Types
} from './amenitiesSlice';

// Export the API for store configuration
export { amenitiesApi };

// Export the reducer as default
export default amenitiesReducer;

// Export hooks for component usage
export {
  useGetAmenitiesQuery,
  useCreateAmenityMutation,
  useDeleteAmenityMutation,
};

// Export actions
export {
  toggleSelectedAmenity,
  setSelectedAmenities,
  clearSelectedAmenities,
  setAmenitiesError,
};

// Export selectors
export {
  selectAllAmenities,
  selectSelectedAmenities,
  selectAmenitiesLoading,
  selectAmenitiesError,
  selectIsAmenitySelected,
  selectSelectedAmenityObjects,
};

// Export types
// Export types
export type { Amenity };
