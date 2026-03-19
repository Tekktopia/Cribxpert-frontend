import { JSX } from 'react';

export interface PropertyListing {
  _id: string;
  userId?: string | { _id: string; fullName?: string; email?: string };
  name: string;
  description: string;
  amenities: string[] | Array<{ _id: string; name: string; icon?: { fileUrl: string } }>; // Array of amenity IDs or full objects
  propertyType: string | { _id: string; name: string; [key: string]: unknown }; // Property type ID or full object
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  longitude?: number;
  latitude?: number;
  hideStatus: boolean;
  /** API status: pending | approved | rejected | flagged (when backend supports it) */
  status?: string;
  basePrice: number;
  securityDeposit: number;
  cleaningFee: number;
  avaliableFrom: string; // ISO date string
  avaliableUntil: string; // ISO date string
  houseRules: string[];
  additionalRules: string;
  guestNo: number;
  size: number;
  bathroomNo: number;
  bedroomNo: number;
  listingImg: {
    _id: string;
    fileUrl: string;
    fileName?: string;
  }[];
  rating: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface PropertyListingCardProps {
  id: string;
  name: string;
  price: number;
  cleaningFee?: number;   // add this
  rating: number;
  description: string;
  location: string;
  image: string;
  images: string[];
  bedrooms: number;
  propertyType: string;
  minWidth?: string;
  createdAt?: string;
}

export interface SavedListContextProps {
  savedList: PropertyListingCardProps[];

  addList: (property: PropertyListingCardProps) => void;
  removeList: (property: PropertyListingCardProps) => void;
}
export enum ActiveProfile {
  Profile = 'profile',
  PasswordManagement = 'password-management',
  ManagePayment = 'manage-payment',
  Preferences = 'preferences',
}
export enum ActiveBooking {
  All = 'all-bookings',
  Upcoming = 'upcoming-bookings',
  Past = 'past-bookings',
  Cancelled = 'cancelled-bookings',
}
export enum ActiveNotification {
  All = 'all',
  Bookings = 'bookings',
  Payments = 'payments',
  Reviews = 'reviews',
  Listings = 'listings',
  Financials = 'financials',
}

export type ProfileFormProps = {
  initialFirstName: string;
  initialLastName: string;
  initialEmail: string;
  initialPhone: string;
  initialProfileImage?: string;
};

// export type PasswordProps = {
//   intitialOldPassword: string;
//   intitiaNewPassword: string;
//   intitialConfirmPassword: string;
// };

export type PreferencesProps = {
  initialNotifications: boolean;
  initialUpdates: boolean;
  initialMessages: boolean;
  initialDiscounts: boolean;
  initialAuthentication: boolean;
  initialLanguage: string;
  initialCurrency: string;
};
export type SupportType = {
  icon: JSX.Element;
  iconList: JSX.Element;
  title: string;
  list1: string;
  list2: string;
  list3: string;
  list4: string;
  list5: string;
};
export type BookingsType = {
  id: string;
  image: string;
  name: string;
  checkin: string;
  checkout: string;
  // status: JSX.Element;
  status: string; // Changed to string for simplicity
  description?: string;
};
export type ContactInfo = {
  icon: JSX.Element;
  title: string;
};

export type FilterOption = {
  value: string;
  label: string;
  currency?: string;
};

export type FilterParameter = {
  name: string;
  label: string;
  options: FilterOption[];
};

export interface BookingData {
  userId: string;
  propertyId: string;
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
  totalPrice: number;
  propertyName: string;
  propertyImages?: string[];
  maxGuests?: number;
  // Add these:
  basePrice?: number;
  cleaningFee?: number;
  securityDeposit?: number;
}