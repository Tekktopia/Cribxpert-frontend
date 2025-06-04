import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Amenity, amenitiesApi } from './amenitiesService';

// Define the state structure
interface AmenitiesState {
  // Selected amenities for filtering or selecting
  selectedAmenities: string[];
  
  // All amenities from the API
  amenities: Amenity[];
  
  // Loading state for local operations
  isLoading: boolean;
  
  // Error messages
  error: string | null;
}

// Initial state
const initialState: AmenitiesState = {
  selectedAmenities: [],
  amenities: [],
  isLoading: false,
  error: null,
};

// Create the slice
export const amenitiesSlice = createSlice({
  name: 'amenities',
  initialState,
  reducers: {
    // Select or deselect an amenity
    toggleSelectedAmenity: (state, action: PayloadAction<string>) => {
      const amenityId = action.payload;
      const index = state.selectedAmenities.indexOf(amenityId);
      
      if (index === -1) {
        // Add to selected
        state.selectedAmenities.push(amenityId);
      } else {
        // Remove from selected
        state.selectedAmenities.splice(index, 1);
      }
    },
    
    // Select multiple amenities at once (for form initialization)
    setSelectedAmenities: (state, action: PayloadAction<string[]>) => {
      state.selectedAmenities = action.payload;
    },
    
    // Clear all selected amenities
    clearSelectedAmenities: (state) => {
      state.selectedAmenities = [];
    },
    
    // Set error message
    setAmenitiesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading states
      .addMatcher(
        amenitiesApi.endpoints.getAmenities.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      // Handle successful fetch
      .addMatcher(
        amenitiesApi.endpoints.getAmenities.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.amenities = payload;
          state.error = null;
        }
      )
      // Handle fetch errors
      .addMatcher(
        amenitiesApi.endpoints.getAmenities.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Failed to fetch amenities';
        }
      );
  },
});

// Export actions
export const {
  toggleSelectedAmenity,
  setSelectedAmenities,
  clearSelectedAmenities,
  setAmenitiesError,
} = amenitiesSlice.actions;

// Export selectors
export const selectAllAmenities = (state: { amenities: AmenitiesState }) => 
  state.amenities.amenities;

export const selectSelectedAmenities = (state: { amenities: AmenitiesState }) => 
  state.amenities.selectedAmenities;

export const selectAmenitiesLoading = (state: { amenities: AmenitiesState }) => 
  state.amenities.isLoading;

export const selectAmenitiesError = (state: { amenities: AmenitiesState }) => 
  state.amenities.error;

export const selectIsAmenitySelected = (amenityId: string) => 
  (state: { amenities: AmenitiesState }) => 
    state.amenities.selectedAmenities.includes(amenityId);

// Helper selector to get selected amenity objects (not just IDs)
export const selectSelectedAmenityObjects = (state: { amenities: AmenitiesState }) => {
  const { amenities, selectedAmenities } = state.amenities;
  return amenities.filter(amenity => selectedAmenities.includes(amenity._id));
};

// Export the reducer
export default amenitiesSlice.reducer;