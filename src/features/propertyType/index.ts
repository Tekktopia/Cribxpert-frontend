// Import and re-export from propertyTypeService.ts
import {
  propertyTypeApi,
  useGetPropertyTypesQuery,
  useCreatePropertyTypeMutation,
  useUpdatePropertyTypeMutation,
  useDeletePropertyTypeMutation,
  type PropertyType,
  type CreatePropertyTypeRequest,
} from './propertyTypeService';

// Import and re-export from propertyTypeSlice.ts
import propertyReducer, {
  // Actions
  toggleSelectedPropertyType,
  setCurrentPropertyType,
  setSelectedPropertyTypes,
  clearSelectedPropertyTypes,
  setPropertyTypeError,

  // Selectors
  selectAllPropertyTypes,
  selectSelectedPropertyTypeIds,
  selectCurrentPropertyType,
  selectPropertyTypeLoading,
  selectPropertyTypeCreating,
  selectPropertyTypeUpdating,
  selectPropertyTypeError,
  selectIsPropertyTypeSelected,
  selectSelectedPropertyTypeObjects,
} from './propertyTypeSlice';

// Export the slice
export const property = { propertyReducer };

// Export reducer
export { default as propertyReducer } from './propertyTypeSlice';

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
  selectCurrentPropertyType,
  selectPropertyTypeLoading,
  selectPropertyTypeCreating,
  selectPropertyTypeUpdating,
  selectPropertyTypeError,
  selectIsPropertyTypeSelected,
  selectSelectedPropertyTypeObjects,
};

// Export types
export type { PropertyType, CreatePropertyTypeRequest };
