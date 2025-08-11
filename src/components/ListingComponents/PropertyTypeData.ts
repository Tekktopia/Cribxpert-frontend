
export interface PropertyTypeItem {
  type: string;
  description: string;
  image: string;
}

// Property type data
export const propertyTypeData: PropertyTypeItem[] = [
  { type: "Apartment", description: "Apartment", image: "/icons/house.png" },
  { type: "House", description: "House", image: "/images/property-type/house.png" },
  { type: "Studio", description: "Studio", image: "/images/property-type/studio.png" },
  { type: "Villa", description: "Villa", image: "/images/property-type/villa.png" },
  { type: "Cottage", description: "Cottage", image: "/images/property-type/cottage.png" },
  { type: "Entire Unit", description: "Entire Unit", image: "/images/property-type/duplex.png" },
  { type: "Shared Room", description: "Shared Room", image: "/icons/house.png" },
  { type: "Cabin", description: "Cabin", image: "/icons/house.png" },
  { type: "Condominium", description: "Condominium", image: "/images/property-type/bungalow.png" }
];
