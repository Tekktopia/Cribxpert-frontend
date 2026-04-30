// Import and re-export from propertyTypeService.ts
import {
  propertyTypeApi,
  useGetPropertyTypesQuery,
  useCreatePropertyTypeMutation,
  useUpdatePropertyTypeMutation,
  useDeletePropertyTypeMutation,
  type PropertyType,
} from './propertyTypeService';

// Import and re-export from propertyTypeSlice.ts
import propertyTypeReducer, {
  // Actions
  toggleSelectedPropertyType,
  setCurrentPropertyType,
  setSelectedPropertyTypes,
  clearSelectedPropertyTypes,
  setPropertyTypeError,

  // Selectors
  selectAllPropertyTypes,
  selectSelectedPropertyTypeIds,
  selectPropertyTypeNameById,
  selectCurrentPropertyType,
  selectPropertyTypeLoading,
  selectPropertyTypeCreating,
  selectPropertyTypeUpdating,
  selectPropertyTypeError,
  selectIsPropertyTypeSelected,
  selectSelectedPropertyTypeObjects,
} from './propertyTypeSlice';

// Export the slice
export const property = { propertyTypeReducer };
// Export reducer
export { default as propertyTypeReducer } from './propertyTypeSlice';

// Export API for store configuration
export { propertyTypeApi };

// Export hooks for component usage
export {
  useGetPropertyTypesQuery,
  useCreatePropertyTypeMutation,
  useUpdatePropertyTypeMutation,
  useDeletePropertyTypeMutation,
};

// Export actions
export {
  toggleSelectedPropertyType,
  setCurrentPropertyType,
  setSelectedPropertyTypes,
  clearSelectedPropertyTypes,
  setPropertyTypeError,
};

// Export selectors
export {
  selectAllPropertyTypes,
  selectSelectedPropertyTypeIds,
  selectPropertyTypeNameById,
  selectCurrentPropertyType,
  selectPropertyTypeLoading,
  selectPropertyTypeCreating,
  selectPropertyTypeUpdating,
  selectPropertyTypeError,
  selectIsPropertyTypeSelected,
  selectSelectedPropertyTypeObjects,
};

// Export types
export type { PropertyType };
