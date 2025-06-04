import { JSX } from 'react';

export interface PropertyListingProps {
  id: number;
  image: string;
  rating: number;
  location: string;
  propertyName: string;
  description: string;
  price: number;
  images?: string[];
  bedrooms?: number;
  propertyType?: string;
  minWidth?: string;
}
export interface SavedListContextProps {
  savedList: PropertyListingProps[];

  addList: (property: PropertyListingProps) => void;
  removeList: (property: PropertyListingProps) => void;
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
};

export type FilterParameter = {
  name: string;
  label: string;
  options: FilterOption[];
};
