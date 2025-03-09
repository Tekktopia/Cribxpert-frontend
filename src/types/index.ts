import { JSX } from 'react';

export interface PropertyListingProps {
  image: string;
  rating: number;
  location: string;
  propertyName: string;
  description: string;
  price: number;
}
export enum Active {
  Profile = 'profile',
  PasswordManagement = 'password-management',
  ManagePayment = 'manage-payment',
  Preferences = 'preferences',
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
