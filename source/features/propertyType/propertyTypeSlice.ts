import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyType, propertyTypeApi } from './propertyTypeService';

// Define the state structure
interface PropertyTypeState {
  // All property types from the API
  propertyTypes: PropertyType[];

  // Selected property type IDs (for filtering or form selection)
  selectedPropertyTypeIds: string[];

  // Current property type being viewed or edited
  currentPropertyType: PropertyType | null;

  // UI states
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;

  // Error messages
  error: string | null;
}

// Initial state
const initialState: PropertyTypeState = {
  propertyTypes: [],
  selectedPropertyTypeIds: [],
  currentPropertyType: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  error: null,
};

// Create the slice
export const propertySlice = createSlice({
  name: 'propertyType',
  initialState,
  reducers: {
    // Select/deselect a property type
    toggleSelectedPropertyType: (state, action: PayloadAction<string>) => {
      const propertyTypeId = action.payload;
      const index = state.selectedPropertyTypeIds.indexOf(propertyTypeId);

      if (index === -1) {
        // Add to selected
        state.selectedPropertyTypeIds.push(propertyTypeId);
      } else {
        // Remove from selected
        state.selectedPropertyTypeIds.splice(index, 1);
      }
    },

    // Set the current property type being viewed/edited
    setCurrentPropertyType: (
      state,
      action: PayloadAction<PropertyType | null>
    ) => {
      state.currentPropertyType = action.payload;
    },

    // Select multiple property types at once (for form initialization)
    setSelectedPropertyTypes: (state, action: PayloadAction<string[]>) => {
      state.selectedPropertyTypeIds = action.payload;
    },

    // Clear all selected property types
    clearSelectedPropertyTypes: (state) => {
      state.selectedPropertyTypeIds = [];
    },

    // Set error message
    setPropertyTypeError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getPropertyTypes query
      .addMatcher(
        propertyTypeApi.endpoints.getPropertyTypes.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        propertyTypeApi.endpoints.getPropertyTypes.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.propertyTypes = payload.data;
          state.error = null;
        }
      )
      .addMatcher(
        propertyTypeApi.endpoints.getPropertyTypes.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error = error.message || 'Failed to fetch property types';
        }
      )

      // Handle getPropertyTypeById query
      .addMatcher(
        propertyTypeApi.endpoints.getPropertyTypeById.matchPending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        propertyTypeApi.endpoints.getPropertyTypeById.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.currentPropertyType = payload;
          state.error = null;
        }
      )
      .addMatcher(
        propertyTypeApi.endpoints.getPropertyTypeById.matchRejected,
        (state, { error }) => {
          state.isLoading = false;
          state.error =
            error.message || 'Failed to fetch property type details';
        }
      )

      // Handle createPropertyType mutation
      .addMatcher(
        propertyTypeApi.endpoints.createPropertyType.matchPending,
        (state) => {
          state.isCreating = true;
          state.error = null;
        }
      )
      .addMatcher(
        propertyTypeApi.endpoints.createPropertyType.matchFulfilled,
        (state) => {
          state.isCreating = false;
          state.error = null;
        }
      )
      .addMatcher(
        propertyTypeApi.endpoints.createPropertyType.matchRejected,
        (state, { error }) => {
          state.isCreating = false;
          state.error = error.message || 'Failed to create property type';
        }
      )

      // Handle updatePropertyType mutation
      .addMatcher(
        propertyTypeApi.endpoints.updatePropertyType.matchPending,
        (state) => {
          state.isUpdating = true;
          state.error = null;
        }
      )
      .addMatcher(
        propertyTypeApi.endpoints.updatePropertyType.matchFulfilled,
        (state, { payload }) => {
          state.isUpdating = false;
          state.currentPropertyType = payload;
          state.error = null;
        }
      )
      .addMatcher(
        propertyTypeApi.endpoints.updatePropertyType.matchRejected,
        (state, { error }) => {
          state.isUpdating = false;
          state.error = error.message || 'Failed to update property type';
        }
      );
  },
});

// Export actions
export const {
  toggleSelectedPropertyType,
  setCurrentPropertyType,
  setSelectedPropertyTypes,
  clearSelectedPropertyTypes,
  setPropertyTypeError,
} = propertySlice.actions;

// Export selectors
export const selectAllPropertyTypes = (state: {
  propertyType: PropertyTypeState;
}) => state.propertyType?.propertyTypes;

export const selectSelectedPropertyTypeIds = (state: {
  propertyType: PropertyTypeState;
}) => state.propertyType.selectedPropertyTypeIds;

// Add this new selector after your existing selectors
export const selectPropertyTypeNameById = 
  (propertyTypeId: string | null | undefined) => 
  (state: { propertyType: PropertyTypeState }) => {
    if (!propertyTypeId) return '';
    
    const propertyType = state.propertyType.propertyTypes.find(
      type => type._id === propertyTypeId
    );
    
    return propertyType?.name || 'Unknown Property Type';
  };

export const selectCurrentPropertyType = (state: {
  propertyType: PropertyTypeState;
}) => state.propertyType.currentPropertyType;

export const selectPropertyTypeLoading = (state: {
  propertyType: PropertyTypeState;
}) => state.propertyType.isLoading;

export const selectPropertyTypeCreating = (state: {
  propertyType: PropertyTypeState;
}) => state.propertyType.isCreating;

export const selectPropertyTypeUpdating = (state: {
  propertyType: PropertyTypeState;
}) => state.propertyType.isUpdating;

export const selectPropertyTypeError = (state: {
  propertyType: PropertyTypeState;
}) => state.propertyType.error;

// Helper selector to check if a property type is selected
export const selectIsPropertyTypeSelected =
  (propertyTypeId: string) => (state: { propertyType: PropertyTypeState }) =>
    state.propertyType.selectedPropertyTypeIds.includes(propertyTypeId);

// Helper selector to get selected property type objects (not just IDs)
export const selectSelectedPropertyTypeObjects = (state: {
  propertyType: PropertyTypeState;
}) => {
  const { propertyTypes, selectedPropertyTypeIds } = state.propertyType;
  return propertyTypes.filter((type) =>
    selectedPropertyTypeIds.includes(type._id)
  );
};

// Export reducer
export default propertySlice.reducer;
