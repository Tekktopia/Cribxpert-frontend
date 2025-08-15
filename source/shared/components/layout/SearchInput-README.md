# Enhanced SearchInput with Autocomplete

The SearchInput component now includes intelligent autocomplete suggestions based on your available listings.

## Features Added

### 🔍 **Smart Suggestions**

- **Property Names**: Direct suggestions from listing names
- **Locations**: City and state suggestions from available properties
- **Property Types**: Apartment, House, Villa, etc.
- **Amenities**: WiFi, Pool, Parking, etc.

### ⌨️ **Keyboard Navigation**

- `↑/↓` Arrow keys to navigate suggestions
- `Enter` to select highlighted suggestion
- `Escape` to close dropdown
- `Tab` to close and continue

### 🎯 **Smart Actions**

- **Property suggestions**: Navigate directly to property detail page
- **Location/amenity suggestions**: Perform search on discover page
- **Duplicate prevention**: No duplicate suggestions shown

## Usage Examples

### Basic Usage (with autocomplete)

```tsx
<SearchInput />
```

### Custom Search Handler

```tsx
<SearchInput
  onSearch={(query) => {
    // Custom search logic
    console.log('Searching for:', query);
    // Could dispatch Redux action, API call, etc.
  }}
/>
```

### Customized Configuration

```tsx
<SearchInput
  placeholder="Find your perfect stay..."
  maxSuggestions={8}
  showSuggestions={true}
  autoFocus={true}
  className="my-custom-search"
/>
```

### Disable Suggestions

```tsx
<SearchInput
  showSuggestions={false}
  placeholder="Basic search without suggestions"
/>
```

## Props Reference

| Prop              | Type                      | Default                             | Description                 |
| ----------------- | ------------------------- | ----------------------------------- | --------------------------- |
| `placeholder`     | `string`                  | `"Search properties, locations..."` | Input placeholder text      |
| `className`       | `string`                  | `""`                                | Additional CSS classes      |
| `onSearch`        | `(query: string) => void` | `undefined`                         | Custom search handler       |
| `initialValue`    | `string`                  | `""`                                | Initial search value        |
| `autoFocus`       | `boolean`                 | `false`                             | Auto-focus input on mount   |
| `showSuggestions` | `boolean`                 | `true`                              | Enable/disable autocomplete |
| `maxSuggestions`  | `number`                  | `6`                                 | Maximum suggestions to show |

## Suggestion Types

### 🏠 Property Suggestions

- Shows property name and location
- Clicking navigates to property detail page
- Icon: Building icon

### 📍 Location Suggestions

- Shows city/state information
- Clicking searches for properties in that location
- Icon: Location pin icon

### 🏷️ Amenity/Type Suggestions

- Shows amenities and property types
- Clicking filters properties by that criteria
- Icon: Tag icon

## Redux Integration

The component automatically connects to your Redux store:

```typescript
// Reads from multiple Redux slices
const allListings = useSelector(selectAllListings);
const amenities = useSelector(selectAllAmenities);
const propertyTypes = useSelector(selectAllPropertyTypes);

// Generates suggestions from:
// - listing.name
// - listing.city, listing.state
// - listing.propertyType (resolved to name using propertyTypes)
// - listing.amenities[] (resolved to names using amenities)
```

### Data Resolution

The component intelligently resolves IDs to human-readable names:

- **Property Types**: Listings store `propertyType` as an ID, but suggestions show the actual property type name (e.g., "Apartment", "Villa") by looking up the ID in the `propertyTypes` Redux slice.
- **Amenities**: Listings store `amenities` as an array of IDs, but suggestions show the actual amenity names (e.g., "WiFi", "Pool") by looking up each ID in the `amenities` Redux slice.
- **Fallback Handling**: If an ID cannot be resolved to a name, the component gracefully falls back to showing the ID itself.

## Styling

The dropdown uses Tailwind classes and matches your design system:

- Consistent with input styling
- Hover states and keyboard navigation highlighting
- Responsive design
- Proper z-index layering
- Smooth animations

## Performance Optimizations

- **Memoized suggestions**: Only recalculated when search query or listings change
- **Debounced rendering**: Efficient suggestion filtering
- **Duplicate prevention**: Uses Map for O(1) duplicate checking
- **Limited results**: Caps at `maxSuggestions` for performance

## Accessibility

- Full keyboard navigation support
- Proper ARIA labels
- Focus management
- Screen reader friendly
- Semantic HTML structure
