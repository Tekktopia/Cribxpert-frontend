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
